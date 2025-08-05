import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
    name: string;
    data: string;
}

const BlogSchema: Schema = new Schema({
    name: { type: String, required: true },
    data: { type: String, required: true }
});

export default mongoose.model<IBlog>('Blog', BlogSchema);