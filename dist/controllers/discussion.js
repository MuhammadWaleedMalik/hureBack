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
exports.getAllDiscussions = exports.addReply = exports.addDiscussion = void 0;
const Discussion_1 = __importDefault(require("../models/Discussion"));
const addDiscussion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, createdBy, category, visible } = req.body;
        const discussion = yield Discussion_1.default.create({
            title,
            content,
            createdBy,
            category,
            visible,
            replies: []
        });
        res.status(201).json({ success: true, data: discussion });
    }
    catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});
exports.addDiscussion = addDiscussion;
const addReply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { discussionId } = req.params;
        const { userId, message } = req.body;
        const discussion = yield Discussion_1.default.findById(discussionId);
        if (!discussion) {
            return res.status(404).json({ success: false, message: 'Discussion not found' });
        }
        discussion.replies.push({ userId, message, repliedAt: new Date() });
        yield discussion.save();
        res.status(200).json({ success: true, data: discussion });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
exports.addReply = addReply;
const getAllDiscussions = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const discussions = yield Discussion_1.default.find()
            .populate('createdBy', 'name email')
            .populate('replies.userId', 'name email')
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: discussions });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
exports.getAllDiscussions = getAllDiscussions;
