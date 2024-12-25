const bcrypt = require('bcrypt');
const User = require('../Modals/User'); 

const addUser = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password, userType } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
            userType
        });

        const savedUser = await user.save();

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

const getUsers = async (req, res) => {
    try {
        const users = await User.find({ userType: { $ne: 'ADM' } });
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params; 
        const user = await User.findById(id); 
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};


const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedData = req.body;
        const user = await User.findByIdAndUpdate(userId, updatedData, {
            new: true, 
            runValidators: true, 
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
    getUsers,
    addUser,
    updateUser,
    removeUser,
    getUserById
};
