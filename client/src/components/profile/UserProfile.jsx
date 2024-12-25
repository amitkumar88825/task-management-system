import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../../App.css";
import {AuthContext} from "../authentication/AuthContext";


const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState("");

  const {user} = useContext(AuthContext)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${user.id}`);
        setUserInfo(response.data);
      } catch (err) {
        setError("Failed to fetch user data. Please try again.");
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!userInfo) {
    return <div className="loading-message">Loading...</div>;
  }

  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <h1>User Profile</h1>
      </div>
      <div className="profile-details">
        <p><strong>First Name:</strong> {userInfo.firstName}</p>
        <p><strong>Last Name:</strong> {userInfo.lastName}</p>
        <p><strong>Username:</strong> {userInfo.username}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>User Type:</strong> {userInfo.userType}</p>
      </div>
    </div>
  );
};

export default UserProfile;
