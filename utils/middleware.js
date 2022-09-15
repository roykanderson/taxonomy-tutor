const jwt = require('jsonwebtoken')

const logger = require('./logger')
const User = require('../models/User')

const reqLogger = (req, res, next) => {
  logger.info('---')
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')

  next()
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  }

  next()
}

const userExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const decodedToken = jwt.verify(authorization.substring(7), process.env.SECRET)
    if (decodedToken) {
      req.user = await User.findById(decodedToken.id)
    }
  }

  next()
}

const unknownEndpoint = (req, res, next) => {
  res.status(404).send({ error: 'unknown endpoint' })

  next()
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  next(error)
}

module.exports = {
  reqLogger,
  userExtractor,
  unknownEndpoint,
  errorHandler
}