import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import AddUser from "./AddUser";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isAddUser, setIsAddUser] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/`);
      setUsers(response.data); 
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users. Please try again later.");
    }
  };

  const handleAddUser = () => {
    console.log("Add User button clicked!");
    setIsAddUser(true);
  };

  return (
    <div className="container mt-5">
      {/* User Table */}
      {users.length > 0 && !isAddUser && (
        <div>
          <h2 className="mb-4">Users</h2>
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Add User Button */}
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-primary" onClick={handleAddUser}>
              Add User
            </button>
          </div>

          {users.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>User Type</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.userType}</td>
                      <td>{new Date(user.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="alert alert-info">No users found.</div>
          )}
        </div>
      )}

      {/* Add User Component */}
      {isAddUser && <AddUser setUsers={setUsers} users={users} setIsAddUser={setIsAddUser} />}
    </div>
  );
};

export default Users;
