"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const discussion_1 = require("../controllers/discussion");
const router = express_1.default.Router();
router.post('/add', discussion_1.addDiscussion);
router.post('/:discussionId/reply', discussion_1.addReply);
router.get('/get', discussion_1.getAllDiscussions);
exports.default = router;
