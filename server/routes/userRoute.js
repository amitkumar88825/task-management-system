const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController.js')

router.get('/', userController.getUser);

router.get('/:id', userController.getUserById);

router.post('/', userController.addUser);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.removeUser);

module.exports = router;
