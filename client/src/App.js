import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from './components/common/footer/Footer';
import Header from './components/common/header/Header';
import Login from './components/authentication/Login';

function App() {
  return (
    <div id="root">
      <Header />
      <main className="content">
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;


