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
        // Include the token in the Authorization header
        const response = await axios.get(
          `http://localhost:5000/api/user/${user.id}`, {
            headers: {
              Authorization: `Bearer ${user.authToken}`,
            },
          }
        );

        setUserInfo(response.data);
      } catch (err) {
        setError("Failed to fetch user data. Please try again.");
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  if (!userInfo) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  const userTypes = [
    { type: 'ADM', value: 'Admin' },
    { type: 'EMP', value: "Employee" },
    { type: 'MNG', value: "Manager" }
  ];

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
              <li className="list-group-item d-flex justify-content-between">
                <strong>First Name:</strong> <span>{userInfo.firstName}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>Last Name:</strong> <span>{userInfo.lastName}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>Username:</strong> <span>{userInfo.username}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>Email:</strong> <span>{userInfo.email}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>User Type:</strong> <span>{userTypes.find((userType) => userType.type === userInfo.userType)?.value}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
