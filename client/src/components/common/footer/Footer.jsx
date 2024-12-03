import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../App.css'

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-4 mt-auto">
            <div className="container text-center">
                <p>&copy; 2024 My Website. All rights reserved.</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="text-white mx-2">Privacy Policy</a>
                    <a href="#" className="text-white mx-2">Terms of Service</a>
                </div>
                <div className="mt-2">
                    <a href="#" className="text-white mx-2"><i className="fab fa-facebook"></i></a>
                    <a href="#" className="text-white mx-2"><i className="fab fa-twitter"></i></a>
                    <a href="#" className="text-white mx-2"><i className="fab fa-instagram"></i></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
