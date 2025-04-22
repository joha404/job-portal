import express from "express";
import AdminRole from "../middleware/AdminRole.js";
import {
  createJob,
  deleteJob,
  fetchJobs,
  showJob,
  updateJob,
} from "../controllers/jobController.js";

const jobRoute = express.Router();

// Public route to fetch all jobs
jobRoute.get("/all", fetchJobs);

// Admin-only route to create a job
jobRoute.post("/create", AdminRole, createJob);

// Public route to view a job by ID
jobRoute.get("/:id", showJob);

// Admin-only route to update a job
jobRoute.put("/update/:id", AdminRole, updateJob);

// Admin-only route to delete a job
jobRoute.delete("/delete/:id", AdminRole, deleteJob);

export default jobRoute;
