import React, { useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../App.css'
import {AuthContext} from "../../authentication/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const logoutUser = () => {
        logout()
        navigate("/login"); 
    }

    return (
        <header className="bg-primary text-white py-3">
            <div className="container d-flex justify-content-between align-items-center">
                <h1 className="mb-0">My Website</h1>
                <nav>
                    { user && 
                        <ul className="nav">
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/profile">Profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/task">Tasks</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/users">Users</Link>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link text-white" onClick={logoutUser}>Logout</button>
                            </li>
                        </ul>
                    }                        
                </nav>
            </div>
        </header>
    );
};

export default Header;
