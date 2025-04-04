const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { tokenExtractor, userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.find({_id: request.params.id }).populate('user')
  if(blog) {
    response.json(blog)
  }else{
    response.status(404).end()
  }
})

blogsRouter.post('/', tokenExtractor, userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user
    if(!user){
      return response.status(401).json({error: "token missing or invalid"})
    }
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes ? body.likes : 0,
      user: user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
    response.status(201).json(savedBlog)
  })

blogsRouter.delete('/:id', tokenExtractor, userExtractor, async (request, response) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)
    if(blog.user.toString() === request.user.id){
      await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    }else{
      return response.status(401).json({ error: 'Unauthorized to delete the blog' })
    }
})

blogsRouter.put('/:id', async (request, response) => {
	const body = request.body
  
	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes ? body.likes : 0
	}
  
	await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
	response.json(blog)
  })
module.exports = blogsRouter