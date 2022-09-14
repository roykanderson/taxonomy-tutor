const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')

// Local modules
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const usersRouter = require('./controllers/usersRouter')
const setsRouter = require('./controllers/setsRouter')

const app = express()

// Establish MongoDB connection
logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(() => {
    logger.error('error connecting to MongoDB')
  })

// Take middleware into use
app.use(cors())
app.use(express.json())
app.use(middleware.reqLogger)
app.use('/api/users', usersRouter)
app.use('/api/sets', setsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app