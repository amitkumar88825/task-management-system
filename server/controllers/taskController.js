const Task = require('../Modals/Task'); // 
const User = require('../Modals/User'); 

const addTask = async (req, res) => {
    try {
        const { title, description, dueDate, priority, status, assignedUser } = req.body;
        
        if (assignedUser) {
            const userExists = await User.findById(assignedUser); 
            if (!userExists) {
                return res.status(400).json({
                    error: 'Assigned user does not exist',
                });
            }
        }

        const task = new Task({
            title,
            description,
            dueDate,
            priority,
            status,
            assignedUser,  
        });

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
                assignedUser: savedTask.assignedUser,
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

const getTasks = async (req, res) => {
    try {
        const { userType, userId } = req.query;        
        let tasks;
        if (['MNG', 'ADM'].includes(userType)) {
            tasks = await Task.find();
        } else if (userType === 'EMP' && userId) {
            tasks = await Task.find({ assignedUser: userId });
        } else {
            return res.status(400).json({ error: 'Invalid userType or userId' });
        }

        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};


const getTaskById = async (req, res) => {
    try {
        const taskId = req.params.id;

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch task', details: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        
        const taskId = req.params.id;
        const updatedData = req.body;
        const task = await Task.findByIdAndUpdate(taskId, updatedData, {
            new: true,
            runValidators: true,
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

const updateTaskStatus = async (req, res) => {
    try {
        const taskId = req.params.id;
        const { status } = req.body;

        if (status !== "Pending" && status !== "In Progress") {
            return res.status(400).json({ error: 'Invalid status value' });
        }

        const updatedTask = await Task.findByIdAndUpdate(taskId, { status }, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update task', details: error.message });
    }
};


const completeTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        const task = await Task.findByIdAndUpdate(
            taskId,
            { isCompleted: true }, 
            { new: true, runValidators: true } 
        );

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json({ message: 'Task marked as completed successfully', task });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to mark task as completed', details: error.message });
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
    completeTask,
    getTaskById,
    updateTaskStatus
};
