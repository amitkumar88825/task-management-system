import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from './components/header/Header';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Singup';
import Task from "./components/task/Tasks";
import Profile from "./components/profile/UserProfile";
import Users from "./components/users/Users"

function App() {
  return (
    <div id="root">
      <Header />
      <main className="content">
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/task" element={<Task />} />
            <Route path="/users" element={<Users />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;


