import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  date: Date;
  time: string;
  location: string;
  category: string;
  description: string;
  tags: string[];
  speaker: {
    name: string;
    designation: string;
  };
  zoomLink?: string;
  postedAt: Date;
  postedBy: string;
}

const EventSchema: Schema = new Schema<IEvent>({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true }, // Example: "09:00"
  location: { type: String, required: true }, // Example: "Online"
  category: { type: String, required: true }, // Example: "Training", "Workshop"
  description: { type: String, required: true },
  tags: [{ type: String }], // Example: ["CPD", "Emergency"]
  speaker: {
    name: { type: String, required: true },
    designation: { type: String, required: true },
  },
  zoomLink: { type: String }, // Optional
  postedAt: { type: Date, default: Date.now },
  postedBy: { type: String, required: true }, // User ID of the person who posted the event
});

export default mongoose.model<IEvent>('Event', EventSchema);
