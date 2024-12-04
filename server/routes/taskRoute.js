const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController.js');

// Create a task
router.post('/', taskController.addTask);

// Get all tasks
router.get('/', taskController.getTasks);

// Update a task
router.put('/:id', taskController.updateTask);

// Delete a task
router.delete('/:id', taskController.removeTask);

module.exports = router;
