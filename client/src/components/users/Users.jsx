import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import AddUser from "./AddUser";
import { AuthContext } from "../authentication/AuthContext";

const Users = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    userType: "EMP",
    confirmPassword: "",
  });
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [isAddUser, setIsAddUser] = useState(false);
  const [isEditUser, setIsEditUser] = useState(false);
  const [userId, setUserId] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/`, {
        headers: {
          Authorization: `Bearer ${user.authToken}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users. Please try again later.");
    }
  };

  const handleAddUser = () => {
    setIsAddUser(true);
  };

  const editUser = async (userId) => {
    const response = await axios.get(
      `http://localhost:5000/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${user.authToken}`,
        },
      }
    );
    setUserId(userId);
    setFormData({
      firstName: response.data.firstName,
      lastName: response.data.lastName,
      username: response.data.username,
      email: response.data.email,
      userType: response.data.userType,
    });
    setIsEditUser(true);
  };

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${user.authToken}`,
          },
        }
      );
      if (response.status === 200) {
        alert(response.data.message);
        setUsers(users.filter((user) => user._id !== userId));
      }
    } catch (err) {
      console.error("Error deleting User:", err);
      setError("Failed to delete User");
    }
  };

  const userTypes = [
    { type: "ADM", value: "Admin" },
    { type: "EMP", value: "Employee" },
    { type: "MNG", value: "Manager" },
  ];

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center">Users</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* User Table */}
      {!isAddUser && !isEditUser && (
        <div>
          {/* Add User Button */}
          {user?.access?.includes("addUser") && (
            <div className="d-flex justify-content-end mb-3">
              <button className="btn btn-primary" onClick={handleAddUser}>
                Add User
              </button>
            </div>
          )}

          {users?.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th> scope="col"Email</th>
                    <th scope="col">User Type</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((userInfo, index) => (
                    <tr key={userInfo._id}>
                      <td>{index + 1}</td>
                      <td>{userInfo.username}</td>
                      <td>{userInfo.email}</td>
                      <td>
                        {
                          userTypes.find(
                            (userType) => userType.type === userInfo.userType
                          )?.value
                        }
                      </td>
                      <td>{new Date(userInfo.createdAt).toLocaleString()}</td>
                      <td>
                        {user?.access?.includes("updateUser") && (
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => editUser(userInfo._id)}
                          >
                            Modify
                          </button>
                        )}

                        {user?.access?.includes("removeUser") && (
                          <button
                            className="btn btn-danger btn-sm me-2"
                            onClick={() => deleteUser(userInfo._id)}
                          >
                            Delete
                          </button>
                        )}
                      </td>
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
      {(isAddUser || isEditUser) && (
        <AddUser
          setUsers={setUsers}
          users={users}
          formData={formData}
          setFormData={setFormData}
          setIsAddUser={setIsAddUser}
          userId={userId}
          setUserId={setUserId}
          setIsEditUser={setIsEditUser}
          isEditUser={isEditUser}
        />
      )}
    </div>
  );
};

export default Users;
