import mongoose, { Schema, Document } from 'mongoose';

export interface IJobApplication extends Document {
  jobId: mongoose.Types.ObjectId;
  fullName: string;
  email: string;
  phoneNumber: string;
  coverLetter?: string;
  resumeUrl: string;
  appliedAt: Date;
}

const JobApplicationSchema: Schema = new Schema<IJobApplication>({
  jobId: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  coverLetter: {
    type: String,
    default: '',
  },
  resumeUrl: {
    type: String,
    required: true, // Store cloud/file path
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IJobApplication>('JobApplication', JobApplicationSchema);
