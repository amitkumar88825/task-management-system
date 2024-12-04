import React, { useState } from 'react';
import TaskList from './TaskList';
import AddTask from './AddTask';
import 'bootstrap/dist/css/bootstrap.min.css';

const Task = () => {
  const [isAddTask, setIsAddTask] = useState(false);

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Task Management</h3>

      <div className="card-body">
        {isAddTask ? (
          <AddTask setIsAddTask={setIsAddTask} />
        ) : (
          <TaskList />
        )}
      </div>

      <div className="text-center">
        <button
          className="btn btn-primary btn-lg"
          onClick={() => setIsAddTask(!isAddTask)}
        >
          {isAddTask ? 'View Task List' : 'Add Task'}
        </button>
      </div>
    </div>
  );
};

export default Task;
