import mongoose, { Schema, Document } from 'mongoose';

export interface IJob extends Document {
  title: string;
  organization: string;
  location: string; // e.g., "New York, NY"
  description: string;
  salaryRange: string; // e.g., "$75,000 - $95,000"
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Temporary';
  postedAt: Date;
  postedBy: string; // User ID of the person who posted the job
}

const JobSchema: Schema = new Schema<IJob>({
  title: { type: String, required: true },
  organization: { type: String, required: true }, // e.g., "Mount Sinai Hospital"
  location: { type: String, required: true }, // e.g., "Los Angeles, CA"
  description: { type: String, required: true },
  salaryRange: { type: String, required: true }, // Can be enhanced to number range
  postedBy: { type: String, required: true }, // User email of the person who posted the job
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract',  'Temporary'],
    required: true,
  },
  postedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IJob>('Job', JobSchema);
