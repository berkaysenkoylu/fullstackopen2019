const Blog = require('../models/blog');

const User = require('../models/user');

// Get all the blog entries
exports.getAllBlogEntries = async (req, res, next) => {
    const blogs = await Blog.find().populate({path: 'user', model: 'User', select: {  username: 1, name: 1 }});

    return res.status(200).json({
        message: "Successfully fetched blog entries",
        blogs: blogs
    });
        
}

// Add a new blog entry
exports.addNewBlogEntry = async (req, res, next) => {
    // if( (req.body.title === '' || !req.body.title || req.body.title === undefined) ||
    //     (req.body.author === '' || !req.body.author || req.body.author === undefined) ||
    //     (req.body.url === '' || !req.body.url || req.body.url === undefined) ||
    //     (req.body.likes === '' || !req.body.likes || req.body.likes === undefined) ) {
    //     }

    const userData = req.userData;

    const newEntry = new Blog({
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes,
        user: userData.userId
    });

    const user = await User.findById({ _id: userData.userId });

    if(req.body.likes === '' || !req.body.likes || req.body.likes === undefined) {
        newEntry.likes = 0
    }

    try {
        const savedEntry = await newEntry.save();

        user.blogs = user.blogs.concat(savedEntry._id);

        await user.save();

        res.status(200).json({
            message: "Successfully created a new blog entry",
            data: newEntry
        });
    }
    catch(exception) {

        if(Object.keys(exception.errors).length > 0) {
            await res.status(400).json({
                message: "The following fields are problematic: " + Object.keys(exception.errors).join(' - ')
            })
        }
        
        next(exception);
    }
}

// Deleting a post with a given id
exports.deleteBlogPost = async (req, res, next) => {

    // Get the user data from the request (We are intercepting it by using checkAuthentication middleware)
    const userData = req.userData;

    try {
        // Fetch the blog post to delete
        const blogPostToDelete = await Blog.findById({ _id: req.params.id });

        // Compare the userId we got from request to the one residing in blog post
        // If they don't match, return 401 unauthorized status code
        if(blogPostToDelete.user.toString() !== userData.userId) {
            return res.status(401).json({
                message: "You are not authorized!"
            });
        }

        // If they do match, it is business as usual

        const result = await Blog.deleteOne({ _id: req.params.id });
        if(result.n !== 0) {
            return res.status(200).json({
                message: "Successfully deleted the blog post"
            });
        }
        else {
            return res.status(500).json({
                message: "Failed to delete the blog post. Given id might be wrong!"
            });
        }
    }
    catch(exception) {
        res.status(404).json({
            message: "Failed to delete"
        });
        next(exception);
    }
}

// Updating a post with a given id
exports.editBlogPost = async (req, res, next) => {

    // Get the user data from the request (We are intercepting it by using checkAuthentication middleware)
    const userData = req.userData;

    const newBlogPost = new Blog({
        _id: req.params.id,
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes
    });

    try {
        // Fetch the blog post to edit
        const blogPostToEdit = await Blog.findById({ _id: req.params.id });

        // Compare the userId we got from request to the one residing in blog post
        // If they don't match, return 401 unauthorized status code
        if(blogPostToEdit.user.toString() !== userData.userId) {
            return res.status(401).json({
                message: "You are not authorized!"
            });
        }

        // If they do match, it is business as usual

        const result = await Blog.updateOne({ _id: req.params.id }, newBlogPost);

        if(result.n !== 0) {
            res.status(200).json({
                message: "Blog post has been successfully updated",
                data: newBlogPost
            });
        }
        else {
            res.status(500).json({
                message: "Failed to update blog post"
            });
        }
    }
    catch(exception) {
        res.status(404).json({
            message: "Failed to edit"
        });
        next(exception);
    }
}