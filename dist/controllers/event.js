"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.getEvents = exports.addEvent = void 0;
const Event_1 = __importDefault(require("../models/Event"));
const addEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield Event_1.default.create(req.body);
        res.status(201).json({ success: true, data: event });
    }
    catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});
exports.addEvent = addEvent;
const getEvents = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield Event_1.default.find().sort({ postedAt: -1 });
        res.status(200).json({ success: true, data: events });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
exports.getEvents = getEvents;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield Event_1.default.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        res.status(200).json({ success: true, message: 'Event deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
exports.deleteEvent = deleteEvent;
