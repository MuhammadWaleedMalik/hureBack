"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const event_1 = require("../controllers/event");
const router = express_1.default.Router();
router.post('/add', event_1.addEvent);
router.get('/get', event_1.getEvents);
router.delete('/delete/:id', event_1.deleteEvent);
exports.default = router;
