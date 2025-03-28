const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response,next) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })

blogsRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)
    blog
      .save()
      .then(result => {
        response.json(result)
      }).catch(error => next(error))
  })

blogsRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndDelete(request.params.id)
      .then(() => {
        response.status(204).end()
      })
      .catch(error => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
    const {author, title, url, likes} = request.body
    Blog.findById(request.params.id).then(blog => {
    if(!blog){
        response.status(404).end()
    }
    note.author = author
    note.title = title
    note.url = url
    note.likes = likes

    return blog.save().then(updatedBlog => {
        response.json(updatedBlog)
        })
    }).catch(error => next(error))
})

module.exports = blogsRouter