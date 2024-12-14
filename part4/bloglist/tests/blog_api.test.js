const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper.test')

const Blog = require('../models/blog')
const User = require('../models/user')

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
  
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${process.env.TOKEN}`)

    const title = response.body.map(blog => blog.title)
  
    assert(title.includes("Money Diaries"))
  })

  describe('viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()
    
      const blogToView = blogsAtStart[0]
    
      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .set('Authorization', `Bearer ${process.env.TOKEN}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
      assert.deepStrictEqual(resultBlog.body, blogToView)
    }) 
  
    test('fails with status code 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()
      await api
        .get(`/api/blogs/${validNonexistingId}`)
        .set('Authorization', `Bearer ${process.env.TOKEN}`)
        .expect(404)
    })
  
    test('fails with status code 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'
  
      await api
        .get(`/api/blogs/${invalidId}`)
        .set('Authorization', `Bearer ${process.env.TOKEN}`)
        .expect(400)
    })
  })
  
  describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
      const newBlog = new Blog ({
        title: "PhD in Clothes",
        author: "Rebecca",
        url: "https://phdinclothes.com/",
        likes: 50
      })

      const result = await api
        .post('/api/blogs/')
        // .set({'username': 'hellas', 'name': 'Arto Hellas', 'password': 'arto'})\
        .set('Authorization', `Bearer ${process.env.TOKEN}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      console.log(newBlog)
      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    
      const title = blogsAtEnd.map(blog => blog.title)
      assert(title.includes('PhD in Clothes'))
    })
  
    test('fails with status code 400 if data invalid', async () => {
      const newBlog = {
        author: "Rebecca Moore",
        url: "https://phdinclothes.com/",
        likes: 20
      }
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${process.env.TOKEN}`)
        .send(newBlog)
        .expect(400)
    
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('blog unique identifier is named id', async () => {
      const newBlog = {
        title: "PhD in Clothes",
        author: "Rebecca Moore",
        url: "https://phdinclothes.com/",
        likes: 40,
      }
    
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${process.env.TOKEN}`)
        .send(newBlog)
    
      const response = await api
        .get('/api/blogs')
        .set('Authorization', `Bearer ${process.env.TOKEN}`)

      const targetBlog = response.body.filter(blog => blog.title === "PhD in Clothes")
      assert(Object.keys(targetBlog[0]).includes('id'))
    })

    test('blog likes property default to 0', async () => {
      const newBlog = {
        title: "PhD in Clothes",
        author: "Rebecca Moore",
        url: "https://phdinclothes.com/",
      }
    
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${process.env.TOKEN}`)
        .send(newBlog)
    
      const response = await api
        .get('/api/blogs')
        .set('Authorization', `Bearer ${process.env.TOKEN}`)

      const targetBlog = response.body.filter(blog => blog.title === "PhD in Clothes")
      assert.strictEqual(targetBlog[0].likes, 0)
    })
  })
  
  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
    
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${process.env.TOKEN}`)
        .expect(204)
    
      const blogsAtEnd = await helper.blogsInDb()
      const contents = blogsAtEnd.map(blog => blog.title)
    
      assert(!contents.includes(blogToDelete.title))
    
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })
  })

  describe('updating of a blog', () => {
    test('succeeds if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      const updated = {...blogToUpdate, likes: 75}
      const returned = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .set('Authorization', `Bearer ${process.env.TOKEN}`)
        .send(updated)
      const blogsAtEnd = await helper.blogsInDb()
      const contents = blogsAtEnd.filter(blog => blog.title === updated.title)
      assert.strictEqual(contents[0].likes, updated.likes)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})