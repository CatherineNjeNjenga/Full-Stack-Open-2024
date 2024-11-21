const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const initialBlogs = [
  {
    title: "Money Diary",
    author: "The Luxe Strategist",
    url: "http://www.theluxestrategist.com/",
    likes: 100
  },
  {
    title: "Money Diaries",
    author: "Refinery29",
    url: "https://www.refinery29.com/en-us/money-diary",
    likes: 200
  }
]

beforeEach(async () => {
  await Blog.deleteMany()
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.new()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

after(async () => {
  await mongoose.connection.close()
})