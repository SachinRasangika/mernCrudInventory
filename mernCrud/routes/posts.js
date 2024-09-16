const express = require('express');
const router = express.Router();
const Posts = require('../models/posts'); // Ensure this path is correct

// Create: Save item
router.post('/post/save', async (req, res) => {
    try {
        const newPost = new Posts(req.body);
        await newPost.save();
        return res.status(200).json({
            success: "Item saved successfully"
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

// Read: Get all items
router.get('/posts', async (req, res) => {
    try {
        const posts = await Posts.find();
        return res.status(200).json(posts);
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

// Read: Get a single item by ID
router.get('/post/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                error: "Post not found"
            });
        }
        return res.status(200).json(post);
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

// Update: Update an item by ID
router.put('/post/update/:id', async (req, res) => {
    try {
        const updatedPost = await Posts.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPost) {
            return res.status(404).json({
                error: "Post not found"
            });
        }
        return res.status(200).json({
            success: "Item updated successfully",
            updatedPost
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

// Delete: Delete an item by ID
router.delete('/post/delete/:id', async (req, res) => {
    try {
        const deletedPost = await Posts.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({
                error: "Post not found"
            });
        }
        return res.status(200).json({
            success: "Item deleted successfully"
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

module.exports = router;
