import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ userRole, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <h1>Job Portal</h1>
            <div className="navbar-links">
                <Link to="/">Home</Link>
                {userRole === "admin" && <Link to="/admin">Admin Portal</Link>}
                {userRole === "candidate" && <Link to="/candidate">Candidate Portal</Link>}
                {!userRole ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/registration">Register</Link>
                    </>
                ) : (
                    <button onClick={handleLogout}>Logout</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
