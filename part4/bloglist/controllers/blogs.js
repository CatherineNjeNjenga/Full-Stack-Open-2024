const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const { error } = require('../utils/logger')

const blogsRouter = require('express').Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  console.log(request.token)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = request.user
  console.log(user)

  if (!user) {
    return response.status(400).json({ error: 'user invalid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedNote = await blog.save()
  user.blogs = user.blogs.concat(savedNote._id)
  await user.save()
  
  response.json(savedNote)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blog =await Blog.findById(decodedToken.id)

  const user = request.user
  if (!user) {
    return response.status(400).json({ error: 'user invalid' })
  }

  if (blog.user._id.toString() === user.id.toString()) {
    const deletedNote = await Blog.findByIdAndDelete(request.params.id)
    return response.status(204).end()
  }

  return response.status(401).json({ error: 'invalid user' })
})

blogsRouter.put('./:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter