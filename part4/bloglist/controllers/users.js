const bcrypt = require('bcrypt')
const User = require('../models/user')
const usersRouter = require('express').Router()

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
  if (user) {
    response.json(user)
  } else {
    response.status(404).end()
  }
})

usersRouter.post('/', async (request, response) => {
  const { username, password, name } = request.body

  if (password.length < 3) {
    return response
      .status(401)
      .json({ error: 'invalid length, credentials should be a minimum of three letters'})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

usersRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

usersRouter.put('/:id', async (request, response) => {
  const {username, password, name } = request.body

  const user = {
    password
  }

  const updatedBlog = await User.findByIdAndUpdate(request.params.id, user, { new: true })
  response.json(updatedBlog)
})

module.exports = usersRouter