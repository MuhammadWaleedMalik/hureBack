import { Request, Response } from 'express';
import JobApplication from '../models/JobApplication';

// Apply for a job
export const applyForJob = async (req: Request, res: Response) => {
  try {
    const { jobId, fullName, email, phoneNumber, coverLetter, resumeUrl } = req.body;

    const newApplication = await JobApplication.create({
      jobId,
      fullName,
      email,
      phoneNumber,
      coverLetter,
      resumeUrl,
    });

    res.status(201).json({ success: true, data: newApplication });
  } catch (err) {
    res.status(400).json({ success: false, error: (err as Error).message });
  }
};

// Get all job applications
export const getAllApplications = async (_req: Request, res: Response) => {
  try {
    const applications = await JobApplication.find()
      .populate('jobId', 'title type location')
      .sort({ appliedAt: -1 });

    res.status(200).json({ success: true, data: applications });
  } catch (err) {
    res.status(500).json({ success: false, error: (err as Error).message });
  }
};

// Delete an application by ID
export const deleteApplication = async (req: Request, res: Response) => {
  try {
    const deleted = await JobApplication.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    res.status(200).json({ success: true, message: 'Application deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: (err as Error).message });
  }
};
