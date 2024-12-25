const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController.js')

router.put('/:id', userController.updateUser);

router.get('/', userController.getUsers);

router.get('/:id', userController.getUserById);

router.post('/', userController.addUser);

router.delete('/:id', userController.removeUser);

module.exports = router;
