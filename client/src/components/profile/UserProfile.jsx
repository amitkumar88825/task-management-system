import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import { AuthContext } from "../authentication/AuthContext";
import { FaUserCircle } from "react-icons/fa"; 

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState("");

  const { user } = useContext(AuthContext);

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
  }, [user.id]);

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  if (!userInfo) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center">My Profile</h3>
    <div className="d-flex justify-content-center align-items-center vh-10">
      <div className="card shadow-lg" style={{ maxWidth: "600px", width: "100%" }}>
        <div className="card-body text-center">
          <div className="mb-4">
            {/* Profile Image or Icon */}
            {userInfo.profileImage ? (
              <img
                src={userInfo.profileImage}
                alt="User Profile"
                className="rounded-circle img-fluid"
                style={{ width: "150px", height: "150px", objectFit: "cover", border: "3px solid #ddd" }}
              />
            ) : (
              <FaUserCircle className="text-secondary" style={{ fontSize: "150px" }} />
            )}
          </div>
          <ul className="list-group list-group-flush text-start">
            <li className="list-group-item">
              <strong>First Name:</strong> {userInfo.firstName}
            </li>
            <li className="list-group-item">
              <strong>Last Name:</strong> {userInfo.lastName}
            </li>
            <li className="list-group-item">
              <strong>Username:</strong> {userInfo.username}
            </li>
            <li className="list-group-item">
              <strong>Email:</strong> {userInfo.email}
            </li>
            <li className="list-group-item">
              <strong>User Type:</strong> {userInfo.userType}
            </li>
          </ul>
        </div>
      </div>
    </div>      
    </div>
  );
};

export default UserProfile;
