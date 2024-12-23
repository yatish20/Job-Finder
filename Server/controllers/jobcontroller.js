const db = require("../models/db");

// Get all job listings
const getJobs = (req, res) => {
    db.query("SELECT * FROM jobs", (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }
        res.json(result);
    });
};

// Create a new job
const createJob = (req, res) => {
    const { title, description, location, salary, contact_email } = req.body;

    if (!title || !description || !location || !salary || !contact_email) {
        return res.status(400).json({ message: "All fields are required" });
    }

    db.query(
        "INSERT INTO jobs (title, description, location, salary, contact_email) VALUES (?, ?, ?, ?, ?)",
        [title, description, location, salary, contact_email],
        (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Database error", error: err });
            }
            res.status(201).json({ message: "Job created successfully", jobId: result.insertId });
        }
    );
};

// Apply for a job


// Apply for a job
const applyJob = (req, res) => {
    console.log("Request payload:", req.body);
    const { job_id, candidate_name, contact } = req.body;

    if (!job_id || !candidate_name || !contact) {
        console.error("Missing fields:", { job_id, candidate_name, contact });
        return res.status(400).json({ message: "All fields are required" });
    }

    db.query(
        "INSERT INTO applications (job_id, candidate_name, contact) VALUES (?, ?, ?)",
        [job_id, candidate_name, contact],
        (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: "Database error", error: err });
            }
            res.status(201).json({ message: "Application submitted successfully" });
        }
    );
};


module.exports = { applyJob };


// Export the controller functions
module.exports = { getJobs, createJob, applyJob };
