const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController.js');

// Create a task
router.post('/', taskController.addTask);

// Get all tasks
router.get('/', taskController.getTasks);

// Get task By id
router.get('/:id', taskController.getTaskById);

// Update a task
router.put('/:id', taskController.updateTask);

// Update a task
router.put('/:id/status', taskController.updateTaskStatus);

// Update a task completed
router.put('/:id/complete', taskController.completeTask);

// Delete a task
router.delete('/:id', taskController.removeTask);

module.exports = router;
