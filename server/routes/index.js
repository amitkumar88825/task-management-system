const express = require('express');
const userRoutes = require('./userRoute.js'); 
const uthenticationRoute = require('./authenticationRoute.js');
const taskRoute = require('./taskRoute.js');

const routes = () => {
    const router = express.Router();
    try {
        router.use('/user', userRoutes); 
        router.use('/login', uthenticationRoute);
        router.use('/task', taskRoute)
    } catch (error) {
        console.error('Error setting up routes:', error);
    }
    return router;
};

module.exports = routes;
