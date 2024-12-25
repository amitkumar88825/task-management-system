const User = require("../Modals/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const UserAccess = require('../Modals/UserAccess');


const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = "1h";

const loginUser = async (req, res) => {
    try {
        const { identifier, password } = req.body; 

        const user = await User.findOne({
            $or: [{ email: identifier }, { username: identifier }]
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log(`Failed login attempt for ${identifier} at ${new Date()}`);
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRY }
        );

        user.lastLogin = new Date();
        await user.save();

        const access = await UserAccess.findOne({userType: user.userType}).lean();

        console.log(`User ${identifier} logged in at ${user.lastLogin}`);

        sendConfirmationEmail(user.email, user.name);

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email,
                access: access.access,
                name: `${user.firstName} ${user.lastName}`,
                userType: user.userType
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const sendConfirmationEmail = async (email, name) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASSWORD, // Your email password
            },
        });

        const mailOptions = {
            from: '"Your App" <noreply@yourapp.com>',
            to: email,
            subject: "Welcome to Your App!",
            text: `Hi ${name},\n\nThank you for registering on our platform!\n\nRegards,\nYour App Team`,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Confirmation email sent to ${email}`);
    } catch (error) {
        console.error("Error sending confirmation email:", error);
    }
};

module.exports = {
    loginUser,
};
