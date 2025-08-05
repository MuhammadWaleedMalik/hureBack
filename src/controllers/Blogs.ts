import { Request, Response } from 'express';
import Blog, { IBlog } from '../models/Blogs';

// Add a new blog
export const addBlog = async (req: Request, res: Response) => {
    try {
        const { name, data } = req.body;
        const blog = new Blog({ name, data });
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Error adding blog', error });
    }
};

// Update a blog
export const updateBlog = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, data } = req.body;
        const blog = await Blog.findByIdAndUpdate(
            id,
            { name, data },
            { new: true }
        );
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Error updating blog', error });
    }
};

// Delete a blog
export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting blog', error });
    }
};
export const getBlogs = async (req: Request, res: Response) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blogs', error });
    }
};