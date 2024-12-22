const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");

// Route to get all job listings
router.get("/jobs", jobController.getJobs);

// Route to create a new job listing
router.post("/jobs", jobController.createJob);

// Route to apply for a job
router.post("/apply", jobController.applyJob);

module.exports = router;
