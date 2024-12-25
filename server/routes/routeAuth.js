const jwt = require('jsonwebtoken');

const validate = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided. Please log in.' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid or expired token. Please log in again.' });
            }

            req.user = decoded; 
            next(); 
        });
    } catch (error) {
        console.error('User validation error:', error);
        res.status(500).json({ message: 'Server error during validation.' });
    }
};

module.exports = validate;
