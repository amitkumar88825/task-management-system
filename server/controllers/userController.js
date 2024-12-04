const bcrypt = require('bcrypt');
const User = require('../Modals/User'); 

// Add a new user
const addUser = async (req, res) => {
    try {
        // Destructure request body
        const { firstName, lastName, username, email, password, userType } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const user = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
            userType
        });

        // Save the user to the database
        const savedUser = await user.save();

        console.log(35 , savedUser);

        res.status(200).json({
            message: 'User created successfully',
            user: {
                id: savedUser._id,
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                username: savedUser.username,
                email: savedUser.email,
                userType: savedUser.userType
            },
        });
    } catch (error) {
        console.error('Error while adding user:', error);
        res.status(500).json({
            error: 'Failed to create user',
            details: error.message,
        });
    }
};

// Fetch all users
const getUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

// Update an existing user
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedData = req.body;
        const user = await User.findByIdAndUpdate(userId, updatedData, {
            new: true, // Returns the updated document
            runValidators: true, // Ensures validation rules are applied
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to update user', details: error.message });
    }
};

// Delete a user
const removeUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully', user });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to delete user', details: error.message });
    }
};

module.exports = {
    getUser,
    addUser,
    updateUser,
    removeUser,
};
