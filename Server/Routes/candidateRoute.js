const express = require("express");
const { addJob, getAllJobs, deleteJob } = require("./controllers/jobController");
const router = express.Router();

router.post("/add", addJob);
router.get("/all", getAllJobs);
router.delete("/delete/:id", deleteJob);

module.exports = router;
