const bcrypt = require('bcrypt');
const User = require('../Modals/User.js');  

const createInitialUsers = async () => {
    try {
        const users = [
            // Admin user
            {
                firstName: 'Admin',
                lastName: 'User',
                username: 'admin_user',
                phoneNumber: '1234567890',
                email: 'admin@example.com',
                password: 'Admin@123',
                userType: 'ADM',
                dob: '1990-01-01',
                address: 'Admin Address'
            },
            // Manager users
            {
                firstName: 'Manager',
                lastName: 'One',
                username: 'manager_one',
                phoneNumber: '1234567891',
                email: 'manager1@example.com',
                password: 'Manager@123',
                userType: 'MNG',
                dob: '1992-01-01',
                address: 'Manager One Address'
            },
            {
                firstName: 'Manager',
                lastName: 'Two',
                username: 'manager_two',
                phoneNumber: '1234567892',
                email: 'manager2@example.com',
                password: 'Manager@123',
                userType: 'MNG',
                dob: '1993-01-01',
                address: 'Manager Two Address'
            },
            // Employee users
            ...Array(5).fill().map((_, i) => ({
                firstName: `Employee${i + 1}`,
                lastName: `User${i + 1}`,
                username: `employee${i + 1}`,
                phoneNumber: `12345678${93 + i}`,
                email: `employee${i + 1}@example.com`,
                password: 'Employee@123',
                userType: 'EMP',
                dob: '1995-01-01',
                address: `Employee ${i + 1} Address`
            }))
        ];

        // Create users individually with hashed password
        for (let user of users) {
            const hashedPassword = await bcrypt.hash(user.password, 10); // Hash with salt rounds = 10
            const newUser = new User({ ...user, password: hashedPassword });
            await newUser.save(); // Save the user to the database
        }

        console.log('Users created successfully.');
    } catch (error) {
        console.error('Error creating initial users:', error.message);
    }
};

createInitialUsers();
