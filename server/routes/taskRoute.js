const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController.js');

router.post('/', taskController.addTask);

router.get('/', taskController.getTasks);

router.get('/:id', taskController.getTaskById);

router.put('/:id', taskController.updateTask);

router.put('/:id/status', taskController.updateTaskStatus);

router.put('/:id/complete', taskController.completeTask);

router.delete('/:id', taskController.removeTask);

module.exports = router;
