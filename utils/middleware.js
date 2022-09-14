const logger = require('./logger')

const reqLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')

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
  unknownEndpoint,
  errorHandler
}