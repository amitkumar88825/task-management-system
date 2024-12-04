import React, { useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../App.css'
import {AuthContext} from "../../authentication/AuthContext";

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    return (
        <header className="bg-primary text-white py-3">
            <div className="container d-flex justify-content-between align-items-center">
                <h1 className="mb-0">My Website</h1>
                <nav>
                    {
                        <ul className="nav">
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/">Dashboard</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/profile">Profile</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/task">Tasks</a>
                            </li>
                        </ul>
                    }
                    <ul className="nav">
                        {
                            user ?
                                <li className="nav-item">
                                    <a className="nav-link text-white" href="/">Logout</a>
                                </li> : <li className="nav-item">
                                    <a className="nav-link text-white" href="/profile">Login</a>
                                </li>
                        }
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
