import express from 'express';
import {
  addDiscussion,
  addReply,
  getAllDiscussions
} from '../controllers/discussion';

const router = express.Router();

// Create a new discussion
router.post('/add', addDiscussion);

// Add a reply to a discussion
router.post('/:discussionId/reply', addReply);

// Get all discussions
router.get('/get', getAllDiscussions);

export default router;
