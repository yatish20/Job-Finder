import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css";

const Admin = () => {
    const [jobs, setJobs] = useState([]);
    const [newJob, setNewJob] = useState({
        title: "",
        description: "",
        location: "",
        salary: "",
        contactEmail: "",
    });

    // Fetch jobs from the backend
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/jobs");
                setJobs(response.data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };
        fetchJobs();
    }, []);

    const handleInputChange = (e) => {
        setNewJob({ ...newJob, [e.target.name]: e.target.value });
    };

    const addJob = async () => {
        if (Object.values(newJob).some((field) => !field)) {
            alert("All fields are required.");
            return;
        }
        try {
            const response = await axios.post("http://localhost:5000/api/jobs", newJob);
            setJobs([...jobs, response.data]);
            setNewJob({ title: "", description: "", location: "", salary: "", contactEmail: "" });
        } catch (error) {
            console.error("Error adding job:", error);
            alert("Failed to add job.");
        }
    };

    const deleteJob = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/jobs/${id}`);
            setJobs(jobs.filter((job) => job.id !== id));
        } catch (error) {
            console.error("Error deleting job:", error);
            alert("Failed to delete job.");
        }
    };

    return (
        <div className="admin-container">
            <h1>Admin Panel</h1>
            <div className="job-form">
                <input
                    type="text"
                    name="title"
                    placeholder="Job Title"
                    value={newJob.title}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={newJob.description}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={newJob.location}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="salary"
                    placeholder="Salary"
                    value={newJob.salary}
                    onChange={handleInputChange}
                />
                <input
                    type="email"
                    name="contactEmail"
                    placeholder="Contact Email"
                    value={newJob.contactEmail}
                    onChange={handleInputChange}
                />
                <button onClick={addJob}>Add Job</button>
            </div>

            <div className="job-listings">
                <h2>Job Listings</h2>
                {jobs.length === 0 ? (
                    <p>No jobs listed yet.</p>
                ) : (
                    <ul>
                        {jobs.map((job) => (
                            <li key={job.id}>
                                <h3>{job.title}</h3>
                                <p>{job.description}</p>
                                <p><strong>Location:</strong> {job.location}</p>
                                <p><strong>Salary:</strong> ${job.salary}</p>
                                <p><strong>Contact:</strong> {job.contactEmail}</p>
                                <button onClick={() => deleteJob(job.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Admin;