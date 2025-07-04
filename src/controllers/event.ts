import { Request, Response } from 'express';
import Event from '../models/Event'; // adjust path as needed

// @desc Create a new event
export const addEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json({ success: true, data: event });
  } catch (err) {
    res.status(400).json({ success: false, error: (err as Error).message });
  }
};

// @desc Get all events
export const getEvents = async (_req: Request, res: Response) => {
  try {
    const events = await Event.find().sort({ postedAt: -1 });
    res.status(200).json({ success: true, data: events });
  } catch (err) {
    res.status(500).json({ success: false, error: (err as Error).message });
  }
};

// @desc Delete an event by ID
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.status(200).json({ success: true, message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: (err as Error).message });
  }
};
