import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from './components/common/footer/Footer';
import Header from './components/common/header/Header';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Singup';
import Task from "./components/task/Task";
import Profile from "./components/profile/UserProfile"

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
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;


