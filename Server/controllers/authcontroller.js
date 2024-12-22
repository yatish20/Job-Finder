const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/db");

// User Login
const login = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        // Fetch user from the database
        const [rows] = await db.promise().query("SELECT * FROM users WHERE username = ?", [username]);

        if (rows.length === 0) {
            return res.status(401).json({ message: "Invalid username or password." });
        }

        const user = rows[0];

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password." });
        }

        // Normalize role before comparison
        if (role.toLowerCase() !== user.role.toLowerCase()) {
            return res.status(401).json({ message: "Selected role does not match the user role." });
        }

        // Generate token (mock example)
        const token = "mockToken"; // Replace with your token generation logic.

        // Send response
        res.json({ token, role: user.role.toLowerCase() });
    } catch (err) {
        console.error("Error in login:", err); // Log detailed error to the backend console
        res.status(500).json({ message: "Server error.", error: err.message });
    }
};


// User Registration
const register = async (req, res) => {
    const { username, password, role, email } = req.body;

    // Check for missing fields
    if (!username || !password || !role || !email) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if the user already exists
        const [existingUser] = await db.promise().query("SELECT * FROM users WHERE username = ?", [username]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Check if the email already exists
        const [existingEmail] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);
        if (existingEmail.length > 0) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        await db.promise().query("INSERT INTO users (username, password, role, email) VALUES (?, ?, ?, ?)", [username, hashedPassword, role, email]);

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Error in register:", err); // Log the error for debugging
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports = { login, register };
