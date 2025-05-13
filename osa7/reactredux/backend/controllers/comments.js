const commentsRouter = require("express").Router()
const Comment = require("../models/comments")
const Blog = require("../models/blog")

commentsRouter.get("/:id/comments", async (request, response) => {
    const comments = await Comment.find({ blogs: request.params.id });
    response.json(comments);
  });

commentsRouter.post("/:id/comments", async (request, response) => {
    const { content } = request.body;

    if (!content) {
        return response.status(400).json({ error: 'content missing' });
    }

    const blog = await Blog.findById(request.params.id);
    if (!blog) {
        return response.status(404).json({ error: 'blog not found' });
    }

    const comment = new Comment({
        content,
        blogs: blog._id
    });

    const savedComment = await comment.save();

    blog.comments = blog.comments.concat(savedComment._id);
    await blog.save();

    response.status(201).json(savedComment);
});




module.exports = commentsRouter
