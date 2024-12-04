import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import AddTask from './AddTask';

const Task = () => {
  const [isAddTask, setIsAddTask] = useState(false);

  return (
    <div>
        <h3>Task Management</h3>
        <div>
            <button onClick={() => setIsAddTask(!isAddTask)}>Add Task</button>
            {isAddTask ? <AddTask/> : <TaskList/>}
        </div>
    </div>
  );
};

export default Task;
