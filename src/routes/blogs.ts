import express from 'express';

import { addBlog,deleteBlog,updateBlog,getBlogs } from '../controllers/Blogs';

const router = express.Router();

// Route to add a new blog
router.post('/add', addBlog);
// Route to update a blog
router.put('/update/:id', updateBlog);
// Route to delete a blog
router.delete('/delete/:id', deleteBlog);
// Route to get all blogs
router.get('/get', getBlogs);


export default router


