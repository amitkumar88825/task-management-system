import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";

const AddTask = ({ setIsAddTask, taskId, setTaskId }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: '',
    status: '',
    assignedUser: '' // added assignedUser to task state
  });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (taskId) {
      fetchTask(); // If taskId is present, fetch the task details for updating
    }
    fetchUsers();
  }, [taskId]);

  // Fetch users from the API to assign a user to the task
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user/');
      setUsers(response.data);
    } catch (err) {
      setError('Error fetching users');
    }
  };

  // Fetch task data for editing
  const fetchTask = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/task/${taskId}`);
      setNewTask(response.data);
    } catch (err) {
      setError('Error fetching task details');
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  // Create or Update task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (taskId) {
        // Update task if taskId is present
        if (!newTask.status.length) newTask.status = 'Pending'; // Ensure default status is Pending
        const response = await axios.put(`http://localhost:5000/api/task/${taskId}`, newTask);
        if (response.status === 200) {
          alert('Task updated successfully!');
        }
      } else {
        // Create new task if no taskId
        const response = await axios.post('http://localhost:5000/api/task/', newTask);
        if (response.status === 200) {
          alert('Task created successfully!');
        }
      }
      setNewTask({ title: '', description: '', dueDate: '', priority: '', status: '', assignedUser: '' });
      setIsAddTask(false);
      setTaskId('');
    } catch (err) {
      setError('Error creating or updating task');
    }
  };

  // Reset form fields
  const resetForm = () => {
    setNewTask({ title: '', description: '', dueDate: '', priority: '', status: '', assignedUser: '' });
    setError('');
    setTaskId('');
  };

  // Handle cancel
  const handleCancel = () => {
    resetForm();
    setIsAddTask(false);
    setTaskId('');
  };

  console.log(93 , users)

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">{taskId ? 'Edit Task' : 'Create New Task'}</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
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
          {
            taskId &&
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
          }

          {/* Assign User Dropdown */}
          <div className="mb-3">
            <label htmlFor="assignedUser" className="form-label">Assign User</label>
            <select
              name="assignedUser"
              value={newTask.assignedUser}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select User</option>
              {users && users.map(user => (
                <option key={user._id} value={user._id}>
                  {`${user.firstName} ${user.lastName}`} {/* Assuming the user object has a name field */}
                </option>
              ))}
            </select>
          </div>

          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            <button type="button" className="btn btn-warning" onClick={resetForm}>Reset</button>
            <button type="submit" className="btn btn-primary">{taskId ? 'Update Task' : 'Create Task'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
