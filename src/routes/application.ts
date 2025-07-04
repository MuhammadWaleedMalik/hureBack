import express from 'express';
import {
  applyForJob,
  getAllApplications,
  deleteApplication
} from '../controllers/application';

const router = express.Router();

// Apply for a job
router.post('/apply', applyForJob);

// Get all applications
router.get('/get', getAllApplications);

// Delete application by ID
router.delete('/delete/:id', deleteApplication);

export default router;
