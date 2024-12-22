import React, { useState } from "react";
import axios from "axios";
import "./Registration.css";

const Registration = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        role: "",
        email: "",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");


        if (!formData.role) {
            setError("Please select a role.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", {
                username: formData.username,
                password: formData.password,
                role: formData.role,
                email: formData.email,
            });

            setMessage(response.data.message || "Registration successful!");
            setFormData({
                username: "",
                password: "",
                role: "",
                email: "",
            });
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed.");
        }
    };

    return (
        <div className="registration-container">
            <h1>User Registration</h1>
            <form className="registration-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />

                <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                >
                    <option value="" disabled>
                        Select Role
                    </option>
                    <option value="admin">Admin</option>
                    <option value="candidate">Candidate</option>
                </select>
                <button type="submit">Register</button>
            </form>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Registration;
