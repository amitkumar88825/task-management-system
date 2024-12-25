import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import axios from 'axios';

const AddUser = ({ setUsers, users, setIsAddUser }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        userType: "EMP",
        confirmPassword: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const { password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (Object.values(formData).some((field) => field === "")) {
            setError("All fields are required.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/user/', formData);
            if (response.status === 200) {
                setUsers([...users, response.data.user])
                alert("User Added");
                handleCancel();
            } else {
                setError("User addition failed. Please try again.");
            }
        } catch (err) {
            console.error("User addition failed", err);
            setError("User addition failed. Please try again.");
        }
    };

    const handleCancel = () => {
        setIsAddUser(false);
        setFormData({
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            userType: "EMP",
            confirmPassword: "",
        });
    };

    return (
        <div className="signup-container">
            <div className="card p-4">
                <h3 className="text-center mb-4">Add User</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Enter your first name"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Enter your last name"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="userType" className="form-label">User Type</label>
                        <select
                            className="form-control"
                            id="userType"
                            name="userType"
                            value={formData.userType}
                            onChange={handleChange}
                            required
                        >
                            <option value="EMP">Employee</option>
                            <option value="MNG">Manager</option>
                            <option value="ADM">Admin</option>
                        </select>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                        <button 
                            type="submit" 
                            className="btn btn-primary w-45"
                        >
                            Submit
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-secondary w-45"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUser;
