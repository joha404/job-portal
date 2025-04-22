import express from "express";
import {
  createJob,
  deleteJob,
  fetchJobs,
  showJob,
  updateJob,
} from "../controllers/jobController.js";

const jobRote = express.Router();

jobRote.get("/all", fetchJobs);
jobRote.post("/create", createJob);
jobRote.get("/:id", showJob);
jobRote.put("/update/:id", updateJob);
jobRote.delete("/delete/:id", deleteJob);

export default jobRote;
