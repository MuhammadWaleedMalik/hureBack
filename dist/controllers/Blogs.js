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
exports.getBlogs = exports.deleteBlog = exports.updateBlog = exports.addBlog = void 0;
const Blogs_1 = __importDefault(require("../models/Blogs"));
const addBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, data } = req.body;
        const blog = new Blogs_1.default({ name, data });
        yield blog.save();
        res.status(201).json(blog);
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding blog', error });
    }
});
exports.addBlog = addBlog;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, data } = req.body;
        const blog = yield Blogs_1.default.findByIdAndUpdate(id, { name, data }, { new: true });
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating blog', error });
    }
});
exports.updateBlog = updateBlog;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const blog = yield Blogs_1.default.findByIdAndDelete(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json({ message: 'Blog deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting blog', error });
    }
});
exports.deleteBlog = deleteBlog;
const getBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield Blogs_1.default.find();
        res.json(blogs);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching blogs', error });
    }
});
exports.getBlogs = getBlogs;
