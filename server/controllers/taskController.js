const Task = require('../Modals/Task'); // Import the Task model

// Add a new task
const addTask = async (req, res) => {
    try {
        // Destructure request body
        const { title, description, dueDate, priority, status } = req.body;

        // Create a new task
        const task = new Task({
            title,
            description,
            dueDate,
            priority,
            status,
        });

        // Save the task to the database
        const savedTask = await task.save();

        res.status(200).json({
            message: 'Task created successfully',
            task: {
                id: savedTask._id,
                title: savedTask.title,
                description: savedTask.description,
                dueDate: savedTask.dueDate,
                priority: savedTask.priority,
                status: savedTask.status,
            },
        });
    } catch (error) {
        console.error('Error while adding task:', error);
        res.status(500).json({
            error: 'Failed to create task',
            details: error.message,
        });
    }
};

// Fetch all tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};

// Update an existing task
const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const updatedData = req.body;
        const task = await Task.findByIdAndUpdate(taskId, updatedData, {
            new: true, // Returns the updated document
            runValidators: true, // Ensures validation rules are applied
        });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ message: 'Task updated successfully', task });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to update task', details: error.message });
    }
};

// Delete a task
const removeTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findByIdAndDelete(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully', task });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to delete task', details: error.message });
    }
};

module.exports = {
    addTask,
    getTasks,
    updateTask,
    removeTask,
};
