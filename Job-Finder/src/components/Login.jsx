import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

const Login = ({ setUserRole }) => {
    const [role, setRole] = useState(""); // 'admin' or 'candidate'
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();


    const handleLogin = async () => {
        if (!role) {
            setErrorMessage("Please select a role to log in.");
            return;
        }

        try {
            // Make a POST request to the backend
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                username,
                password,
                role: role.toLowerCase(), // Normalize role before sending
            });

            // Extract data from the response
            const { token, role: backendRole } = response.data;

            // Ensure the role matches the selected role (case-insensitive comparison)
            if (role.toLowerCase() !== backendRole.toLowerCase()) {
                setErrorMessage("Selected role does not match the user role.");
                return;
            }

            // Store token and user details in localStorage
            localStorage.setItem("authToken", token);
            localStorage.setItem("userRole", backendRole.toLowerCase()); // Normalize role for consistency
            localStorage.setItem("username", username);

            setUserRole(backendRole.toLowerCase()); // Update user role state

            // Redirect to the appropriate portal
            navigate(backendRole.toLowerCase() === "admin" ? "/admin" : "/candidate");
        } catch (error) {
            // Handle errors from the backend
            if (error.response) {
                setErrorMessage(error.response.data.message || "Login failed.");
            } else {
                setErrorMessage("Server error. Please try again later.");
            }
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="login-inputs">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="login-role">
                <label>
                    <input
                        type="radio"
                        value="admin"
                        checked={role === "admin"}
                        onChange={(e) => setRole(e.target.value)}
                    />
                    Admin
                </label>
                <label>
                    <input
                        type="radio"
                        value="candidate"
                        checked={role === "candidate"}
                        onChange={(e) => setRole(e.target.value)}
                    />
                    Candidate
                </label>
            </div>
            <button className="login-button" onClick={handleLogin}>
                Login
            </button>
        </div>
    );
};

export default Login;
