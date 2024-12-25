const mongoose = require('mongoose');

// Define the Task schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending',
  },
  isCompleted: {
    type: Boolean,
    required: true,
    default: false, // By default, tasks are not completed
  },
  assignedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to User model
    default: null, // Task can be created without an assigned user
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Add a method to update the updatedAt field before saving
taskSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create the model from the schema
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
