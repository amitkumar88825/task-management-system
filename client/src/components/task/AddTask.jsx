import React, { useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";

const AddTask = () => {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: '',
    status: ''
  });
  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  // Create task
  const createTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://your-api-url.com/tasks', newTask);
      setNewTask({ title: '', description: '', dueDate: '', priority: '', status: '' });
      alert("Task created successfully!");
    } catch (err) {
      setError('Error creating task');
    }
  };

  // Reset form fields
  const resetForm = () => {
    setNewTask({ title: '', description: '', dueDate: '', priority: '', status: '' });
    setError('');
  };

  // Handle cancel (optional: navigate to another page or reset form)
  const handleCancel = () => {
    resetForm();
    // Redirect to task list or another page if needed
    // navigate('/tasks'); // Uncomment if you're using `react-router-dom`
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Create New Task</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={createTask}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Task Title</label>
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleChange}
              className="form-control"
              id="title"
              placeholder="Enter task title"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleChange}
              className="form-control"
              id="description"
              rows="3"
              placeholder="Enter task description"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dueDate" className="form-label">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={newTask.dueDate}
              onChange={handleChange}
              className="form-control"
              id="dueDate"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="priority" className="form-label">Priority</label>
            <select
              name="priority"
              value={newTask.priority}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">Status</label>
            <select
              name="status"
              value={newTask.status}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            <button type="button" className="btn btn-warning" onClick={resetForm}>Reset</button>
            <button type="submit" className="btn btn-primary">Create Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
