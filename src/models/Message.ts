import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  discussionId: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema = new Schema<IMessage>({
  discussionId: {
    type: Schema.Types.ObjectId,
    ref: 'Discussion',
    required: true
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IMessage>('Message', MessageSchema);
