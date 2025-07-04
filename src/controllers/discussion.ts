import { Request, Response } from 'express';
import Discussion from '../models/Discussion';

// @desc Create a new discussion
export const addDiscussion = async (req: Request, res: Response) => {
  try {
    const { title, content, createdBy, category, visible } = req.body;

    const discussion = await Discussion.create({
      title,
      content,
      createdBy,
      category,
      visible,
      replies: []
    });

    res.status(201).json({ success: true, data: discussion });
  } catch (err) {
    res.status(400).json({ success: false, error: (err as Error).message });
  }
};

// @desc Add a reply to an existing discussion
export const addReply = async (req: Request, res: Response) => {
  try {
    const { discussionId } = req.params;
    const { userId, message } = req.body;

    const discussion = await Discussion.findById(discussionId);
    if (!discussion) {
      return res.status(404).json({ success: false, message: 'Discussion not found' });
    }

    discussion.replies.push({ userId, message, repliedAt: new Date() });
    await discussion.save();

    res.status(200).json({ success: true, data: discussion });
  } catch (err) {
    res.status(500).json({ success: false, error: (err as Error).message });
  }
};

// @desc Get all discussions
export const getAllDiscussions = async (_req: Request, res: Response) => {
  try {
    const discussions = await Discussion.find()
      .populate('createdBy', 'name email') // Optional: populate user details
      .populate('replies.userId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: discussions });
  } catch (err) {
    res.status(500).json({ success: false, error: (err as Error).message });
  }
};
