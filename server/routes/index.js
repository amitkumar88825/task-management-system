const express = require('express');
const userRoutes = require('./userRoute.js'); 
const uthenticationRoute = require('./authenticationRoute.js');

const routes = () => {
    const router = express.Router();
    try {
        router.use('/user', userRoutes); 
        router.use('/login', uthenticationRoute)
    } catch (error) {
        console.error('Error setting up routes:', error);
    }
    return router;
};

module.exports = routes;
