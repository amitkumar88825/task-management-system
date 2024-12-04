const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController.js');

// Create a task
router.post('/tasks', taskController.addTask);

// Get all tasks
router.get('/tasks', taskController.getTasks);

// Update a task
router.put('/tasks/:id', taskController.updateTask);

// Delete a task
router.delete('/tasks/:id', taskController.removeTask);

module.exports = router;
