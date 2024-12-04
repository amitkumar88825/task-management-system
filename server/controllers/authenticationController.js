const User = require("../Modals/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Set up JWT secret and expiry
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = "1h";

// Login user
const loginUser = async (req, res) => {
    try {
        const { identifier, password } = req.body; 

        // Find user by email or username
        const user = await User.findOne({
            $or: [{ email: identifier }, { username: identifier }]
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // Log failed login attempt
            console.log(`Failed login attempt for ${identifier} at ${new Date()}`);
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRY }
        );

        // Update user's last login time
        user.lastLogin = new Date();
        await user.save();

        // Log successful login
        console.log(`User ${identifier} logged in at ${user.lastLogin}`);

        // Optionally send confirmation email on successful login
        sendConfirmationEmail(user.email, user.name);

        // Send response with token
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email,
                name: `${user.firstName} ${user.lastName}`,
                userType: user.userTypefirstName
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Send confirmation email
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
