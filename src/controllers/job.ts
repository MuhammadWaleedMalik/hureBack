import { Request, Response } from 'express';
import Job from '../models/Job'; // adjust if your path differs

// Add a new job
export const addJob = async (req: Request, res: Response) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json({ success: true, data: job });
  } catch (err) {
    res.status(400).json({ success: false, error: (err as Error).message });
  }
};

// Get all jobs
export const getJobs = async (_req: Request, res: Response) => {
  try {
    const jobs = await Job.find().sort({ postedAt: -1 });
    res.status(200).json({ success: true, data: jobs });
  } catch (err) {
    res.status(500).json({ success: false, error: (err as Error).message });
  }
};


// Get jobs with optional filters: title, type, location
export const getFilteredJobs = async (req: Request, res: Response) => {
  try {
    const { title, type, location } = req.query;

    const filter: any = {};
    if (title) filter.title = { $regex: title, $options: 'i' };
    if (type) filter.type = type;
    if (location) filter.location = { $regex: location, $options: 'i' };

    const jobs = await Job.find(filter).sort({ postedAt: -1 });
    res.status(200).json({ success: true, data: jobs });
  } catch (err) {
    res.status(500).json({ success: false, error: (err as Error).message });
  }
};


// Delete a job by ID
export const deleteJob = async (req: Request, res: Response) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });

    res.status(200).json({ success: true, message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: (err as Error).message });
  }
};
