const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../App')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})


describe('get tests', () => {
  test('there are three blogs', async () => {
      const response = await api.get('/api/blogs')
    
      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })
    
  test('the first blog is about HTTP methods', async () => {
      const response = await api.get('/api/blogs')
    
      const authors = response.body.map(e => e.author)
      assert(authors.includes('Michael Chan'))
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('blog should have id instead of _id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    blogs.forEach(blog => {
      assert(blog.id, 'Blog should have id field')
      assert.strictEqual(blog._id, undefined, '_id field should not be present')
    })
  })
})


describe('adding a blog', () => {
  test('a valid blog can be added ', async () => {
      const newBlog = {
          title: 'React patterns',
          author: 'Michael Chan',
          url: 'https://reactpatterns.com/123',
          likes: 9,
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
      const response = await api.get('/api/blogs')
    
      const authors = response.body.map(r => r.author)
    
      assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
    
      assert(authors.includes('Michael Chan'))
    })
  test('blog without title or url is not added', async () => {
      const newBlog = {
        author: 'Roger Freedman'
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
      
      const response = await api.get('/api/blogs')
    
      assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })
  test('blog without likecount should return 0', async () => {
    const newBlog = {
      title: 'University Physics with Modern Physics',
      author: 'Roger Freedman',
      url: 'https://www.suomalainen.com/products/university-physics-with-modern-physics-global-edition?srsltid=AfmBOoqg6we2YHs346JiY_-98V-M-GFxasPz4wlCKT1-XreOAl2eTprB'
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
    const response = await api.get('/api/blogs')
    const addedBlog = response.body.find(blog => blog.title === 'University Physics with Modern Physics')
    assert.strictEqual(addedBlog.likes, 0)
  })
})  


describe('deletion of a note', () => {
  test('a specific blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length -1)
    const titles = blogsAtEnd.map(r => r.title)
    assert(!titles.includes(blogToDelete.title))
  })
})

describe('editing a blog', () => {
  test('a specific blog can be edited', async () => {
    const newBlog = {
      id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 10
    }
    const blogsInDb = await helper.blogsInDb()
    const matchingBlog = blogsInDb.find(r => r.title === newBlog.title)
    await api
          .put(`/api/blogs/${matchingBlog.id}`)
          .send(newBlog)
          .expect(200)


    const blogsAtEnd = await helper.blogsInDb()
    const blogAtEnd = blogsAtEnd.find(r => r.title === newBlog.title)
    assert.strictEqual(blogAtEnd.likes, newBlog.likes)
  })
})


after(async () => {
  await mongoose.connection.close()
})