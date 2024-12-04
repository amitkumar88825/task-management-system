import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  // Fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://your-api-url.com/tasks');
      setTasks(response.data);
    } catch (err) {
      setError('Error fetching tasks');
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://your-api-url.com/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id)); // Remove the deleted task from the list
    } catch (err) {
      setError('Error deleting task');
    }
  };

  // Edit task
  const editTask = (id) => {
    // This can be expanded to show an edit form or navigate to an edit page
    console.log('Editing task with ID:', id);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h3>Task List</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul>
        {tasks.length === 0 ? (
          <li>No tasks available.</li>
        ) : (
          tasks.map((task) => (
            <li key={task._id}>
              <h5>{task.title}</h5>
              <p>{task.description}</p>
              <p>Due Date: {task.dueDate}</p>
              <p>Priority: {task.priority}</p>
              <p>Status: {task.status}</p>
              <button onClick={() => editTask(task._id)}>Edit</button>
              <button onClick={() => deleteTask(task._id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TaskList;
