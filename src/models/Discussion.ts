import mongoose, { Schema, Document } from 'mongoose';

export interface IDiscussion extends Document {
  title: string;
  content: string;
  createdBy: mongoose.Types.ObjectId;
  category?: string; // Optional field for category
  replies: {
    userId: mongoose.Types.ObjectId;
    message: string;
    repliedAt: Date;
  }[];
  visible:[string];
  createdAt: Date;
  updatedAt: Date;
}

const DiscussionSchema: Schema = new Schema<IDiscussion>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
    visible: {
        type: [String],
        enum: ['Public to all Hure users', 'Clinic Internal(private)', 'Role-Based'], // Define visibility options
        default: ['public'], // Default visibility is public
    },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
    category: {
        type: String,
        default: '', // Optional field for category
    },
  replies: [
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      message: { type: String, required: true },
      repliedAt: { type: Date, default: Date.now },
    }
  ]
}, {
  timestamps: true
});

export default mongoose.model<IDiscussion>('Discussion', DiscussionSchema);
