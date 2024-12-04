import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch user data (replace with your actual API endpoint)
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/user-profile"); // Replace with your API route
        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch user data. Please try again.");
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!user) {
    return <div className="loading-message">Loading...</div>;
  }

  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <h1>User Profile</h1>
      </div>
      <div className="profile-details">
        <p><strong>First Name:</strong> {user.firstName}</p>
        <p><strong>Last Name:</strong> {user.lastName}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User Type:</strong> {user.userType}</p>
      </div>
    </div>
  );
};

export default UserProfile;
