import express from 'express';
import { addJob, getJobs, getFilteredJobs, deleteJob } from '../controllers/job';

const router = express.Router();

// Create a new job
router.post('/add', addJob);

// Get all jobs
router.get('/get', getJobs);

// Get jobs with filters (e.g. /api/jobs/search?title=nurse&type=part-time)
router.get('/search', getFilteredJobs);

// Delete a job by ID
router.delete('/delete/:id', deleteJob);

export default router;
