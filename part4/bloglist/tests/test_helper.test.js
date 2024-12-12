const Blog = require('../models/blog')

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

const nonExistingId = async () => {
  const newBlog = new Blog({
    title: "Career Edit",
    author: "anonymous",
    url: "https://thecareeredit.co/",
    likes: 20
  })
  await newBlog.save()
  await newBlog.deleteOne()
  return newBlog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  nonExistingId, blogsInDb, initialBlogs
}