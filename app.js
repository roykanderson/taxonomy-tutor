const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')

// Local modules
const config = require('./utils/config')
const { reqLogger, userExtractor, unknownEndpoint, errorHandler } = require('./utils/middleware')
const logger = require('./utils/logger')
const loginRouter = require('./controllers/loginRouter')
const usersRouter = require('./controllers/usersRouter')
const studySetsRouter = require('./controllers/studySetsRouter')
const taxaRouter = require('./controllers/taxaRouter')

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
app.use(reqLogger)
app.use(express.static('build'))
app.use('/api/login', loginRouter)
app.use('/api/users', userExtractor, usersRouter)
app.use('/api/sets', userExtractor, studySetsRouter)
app.use('/api/taxa', taxaRouter)
app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app