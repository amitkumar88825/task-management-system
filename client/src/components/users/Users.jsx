import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    // Fetch Users from Backend
    const fetchUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/user/`);
            console.log("Fetched Users:", response.data);
            setUsers(response.data); // Assuming response.data is an array
        } catch (error) {
            console.error("Error fetching users:", error);
            setError("Failed to fetch users. Please try again later.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">User List</h2>
            {error && <div className="alert alert-danger">{error}</div>}

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
    );
};

export default Users;
