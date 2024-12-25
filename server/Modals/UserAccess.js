const mongoose = require('mongoose');

const userAccessSchema = new mongoose.Schema({
    userType: {
        type: String,
        required: true,
        enum: ['ADM', 'MNG', 'EMP'], // Restrict userType to specific values
        unique: true
    },
    access: {
        type: [String], // Array of strings to store access permissions
        required: true,
        validate: {
            validator: function (access) {
                return access.length > 0;
            },
            message: 'Access array must have at least one permission.'
        }
    }
});

// Export the model
const UserAccess = mongoose.model('UserAccess', userAccessSchema);

module.exports = UserAccess;
