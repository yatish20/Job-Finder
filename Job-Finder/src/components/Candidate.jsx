import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Candidate.css";

const Candidate = () => {
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedJob, setSelectedJob] = useState(null);
    const [application, setApplication] = useState({ name: "", contact: "" });

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

    const filteredJobs = jobs.filter(
        (job) =>
            job.title.toLowerCase().includes(search.toLowerCase()) ||
            job.location.toLowerCase().includes(search.toLowerCase())
    );

    const applyForJob = (job) => {
        setSelectedJob(job);
    };

    const submitApplication = async () => {
        if (!application.name || !application.contact) {
            alert("Please fill out all fields.");
            return;
        }
        try {
            await axios.post("http://localhost:5000/api/applications", {
                job_id: selectedJob.id,
                candidate_name: application.name,
                contact: application.contact,
            });
            alert(`Application submitted for ${selectedJob.title}!`);
            setSelectedJob(null);
            setApplication({ name: "", contact: "" });
        } catch (error) {
            console.error("Error submitting application:", error);
            alert("Failed to submit application.");
        }
    };

    return (
        <div className="candidate-container">
            <h1>Find Your Dream Job</h1>
            <input
                type="text"
                placeholder="Search by title or location"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="job-listings">
                {filteredJobs.length === 0 ? (
                    <p>No jobs found.</p>
                ) : (
                    filteredJobs.map((job) => (
                        <div key={job.id} className="job-card">
                            <h3>{job.title}</h3>
                            <p>{job.description}</p>
                            <p><strong>Location:</strong> {job.location}</p>
                            <p><strong>Salary:</strong> ${job.salary}</p>
                            <button onClick={() => applyForJob(job)}>Apply</button>
                        </div>
                    ))
                )}
            </div>

            {selectedJob && (
                <div className="application-form">
                    <h2>Apply for {selectedJob.title}</h2>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={application.name}
                        onChange={(e) => setApplication({ ...application, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Your Contact"
                        value={application.contact}
                        onChange={(e) => setApplication({ ...application, contact: e.target.value })}
                    />
                    <button onClick={submitApplication}>Submit</button>
                    <button onClick={() => setSelectedJob(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default Candidate;
