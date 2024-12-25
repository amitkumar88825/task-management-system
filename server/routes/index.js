const express = require('express');
const userRoutes = require('./userRoute.js'); 
const uthenticationRoute = require('./authenticationRoute.js');
const taskRoute = require('./taskRoute.js');
const validate = require('./routeAuth.js')

const routes = () => {
    const router = express.Router();
    try {
        router.use('/auth', uthenticationRoute);
        router.use('/user', validate, userRoutes); 
        router.use('/task', validate, taskRoute)
    } catch (error) {
        console.error('Error setting up routes:', error);
    }
    return router;
};

module.exports = routes;
