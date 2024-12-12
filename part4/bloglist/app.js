const config = require('./utils/config')
const cors = require('cors')
const express = require('express')
require('express-async-errors')
const app = express()
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

mongoose.set('strictQuery', false)

logger.info(`Connecting to ${config.MONGODB_URI}`)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info(`Connected to ${config.MONGODB_URI}`)
  })
  .catch(error => {
    logger.error(`error connecting to MongDB ${error.message}`)
  })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/users', usersRouter)
app.use('/api/blogs/', middleware.userExtractor, blogsRouter)
app.use('/api/login/', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
