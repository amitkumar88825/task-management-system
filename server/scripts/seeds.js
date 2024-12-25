const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../Modals/User');
const UserAccess = require('../Modals/UserAccess');

mongoose.connect("mongodb://localhost:27017/task-management-system", {})

const defaultAccess = [
    { userType: 'ADM', access: ['profile', 'users', 'addUser', 'updateUser', 'removeUser', 'tasks', 'addTask', 'updateTask', 'deleteTask', 'assignTask', 'submitTask'] },
    { userType: 'MNG', access: ['profile', 'users', 'addUser', 'updateUser', 'addTask', 'tasks', 'updateTask', 'assignTask', 'submitTask'] },
    { userType: 'EMP', access: ['profile', 'tasks', , 'submitTask'] }
];

const adminData = {
    firstName: 'admin',
    lastName: '',
    username: 'admin',
    email: 'admin@gg.cc',
    password: 'Admin@123',
    userType: 'ADM'
};

const seedsData = async () => {
    try {
        await UserAccess.insertMany(defaultAccess);
        console.log('UserAccess data seeded successfully.');

        const existingAdmin = await User.findOne({ email: adminData.email });
        if (existingAdmin) {
            console.log('Admin user already exists. Skipping admin creation.');
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(adminData.password, salt);

            adminData.password = hashedPassword;

            await User.create(adminData);
            console.log('Admin user created successfully.');
        }
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        mongoose.connection.close();
        console.log('MongoDB connection closed.');
    }
};

seedsData();
