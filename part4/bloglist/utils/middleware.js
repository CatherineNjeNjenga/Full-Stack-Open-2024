const logger = require('./logger')
const User = require('../models/user')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.startsWith('Bearer ')) {t
    // const token = authorization.replace('Bearer ', '')
    request.token = authorization.replace('Bearer ', '')
  }
  request.token = null

  next()
}

const userExtractor = async (request, response, next) => {
  const { username } = request.body
  const user = await User.findOne({ username })
  if (user) {
    request.user = user
  }
  request.user = null

  next()
}

const requestLogger = (request, response, next) => {
  logger.info('Method', request.method)
  logger.info('Path', request.path)
  logger.info('Body', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted id'})
  } else if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  }

  next(error)
}

module.exports = {
  requestLogger,
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler
}