const express = require("express");
const router = express.Router();
const { getJobs, createJob, applyJob } = require("../controllers/jobController");

// Define routes
router.get("/jobs", getJobs); // GET /api/jobs
router.post("/jobs", createJob); // POST /api/jobs
router.post("/applications", applyJob); // POST /api/jobs/apply

module.exports = router;
