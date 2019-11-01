const express = require("express");

const checkAuthentication = require('../middlewares/checkAuthentication');
const blogController = require("../controllers/blog");

const router = express.Router();

// Get all blog entries
router.get('', blogController.getAllBlogEntries);

// Create a new blog entry
router.post('', checkAuthentication, blogController.addNewBlogEntry);

// Delete the blog post with an id
router.delete('/:id', checkAuthentication, blogController.deleteBlogPost);

// Edit the blog post with an id
router.put('/:id', checkAuthentication, blogController.editBlogPost);

// LIke the blog post with an id
router.patch('/:id', blogController.likeBlogPost);

module.exports = router;