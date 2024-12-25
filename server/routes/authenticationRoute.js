const express = require('express');
const router = express.Router();

const authenticationController = require('../controllers/authenticationController.js')

router.post('/login', authenticationController.loginUser);
router.post('/signup', authenticationController.signupUser);

module.exports = router;
