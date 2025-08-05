"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Blogs_1 = require("../controllers/Blogs");
const router = express_1.default.Router();
router.post('/add', Blogs_1.addBlog);
router.put('/update/:id', Blogs_1.updateBlog);
router.delete('/delete/:id', Blogs_1.deleteBlog);
router.get('/get', Blogs_1.getBlogs);
exports.default = router;
