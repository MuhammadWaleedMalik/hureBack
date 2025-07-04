import express from 'express';
import { addEvent, getEvents,deleteEvent } from '../controllers/event';

const router = express.Router();

// POST /api/events
router.post('/add', addEvent);

// GET /api/events
router.get('/get', getEvents);
router.delete('/delete/:id', deleteEvent);


export default router;
