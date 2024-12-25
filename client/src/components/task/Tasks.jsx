import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import AddTask from "./AddTask";

const Tasks = () => {
  const [isAddTask, setIsAddTask] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/task/");
      setTasks(response.data);
    } catch (err) {
      setError("Error fetching tasks");
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/task/${taskId}/status`,
        { status }
      );
      if (response.status === 200) {
        // Update the task list with the updated task status
        setTasks(
          tasks.map((task) =>
            task._id === taskId
              ? { ...task, status: response.data.task.status }
              : task
          )
        );
      }
    } catch (err) {
      console.error("Error updating task status:", err);
      setError("Failed to update task status");
    }
  };

  const completeTask = async (taskId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/task/${taskId}/complete`
      );
      if (response.status === 200) {
        alert(response.data.message);

        setTasks(
          tasks.map((task) =>
            task._id === taskId
              ? { ...task, isCompleted: true, status: "Completed" }
              : task
          )
        );
      }
    } catch (err) {
      console.error("Error marking task as completed:", err);
      setError("Failed to complete task");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/task/${taskId}`
      );
      if (response.status === 200) {
        alert(response.data.message);
        setTasks(tasks.filter((task) => task._id !== taskId));
      }
    } catch (err) {
      console.error("Error deleting task:", err);
      setError("Failed to delete task");
    }
  };

  const editTask = (taskId) => {
    setTaskId(taskId);
    setIsAddTask(true);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center">Tasks</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {/* Add Task Button */}
        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-primary"
            onClick={() => setIsAddTask(!isAddTask)}
          >
            Add Task
          </button>
        </div>

        {/* Task List */}
        {!isAddTask && (
          <div className="col-12">
            {tasks.length === 0 ? (
              <div className="alert alert-info text-center">
                No tasks available.
              </div>
            ) : (
              <table className="table table-striped">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">Priority</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, index) => (
                    <tr key={task._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{task.title}</td>
                      <td>{task.description}</td>
                      <td>{task.dueDate}</td>
                      <td>{task.priority}</td>
                      <td>
                        {task.isCompleted ? (
                          "Completed"
                        ) : (
                          <select
                            value={task.status}
                            onChange={(e) =>
                              updateTaskStatus(task._id, e.target.value)
                            }
                            className="form-select form-select-sm"
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                          </select>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => editTask(task._id)}
                        >
                          Modify
                        </button>
                        <button
                          className="btn btn-danger btn-sm me-2"
                          onClick={() => deleteTask(task._id)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => completeTask(task._id)}
                          disabled={task.isCompleted}
                        >
                          Done
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Add Task Form */}
        {isAddTask && (
          <div className="col-12">
            <AddTask
              setIsAddTask={setIsAddTask}
              taskId={taskId}
              setTasks={setTasks}
              tasks={tasks}
              setTaskId={setTaskId}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
