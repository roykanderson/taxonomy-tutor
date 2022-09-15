const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const usersRouter = require('express').Router()
const User = require('../models/User')
const StudySet = require('../models/StudySet')

usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({})
    .populate('studySets', { name: 1, dateCreated: 1, numberOfTaxa: 1, taxonIds: 1 })

    res.status(200).json(users)
})

usersRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  
  // Ensure username is unique
  const exisitingUser = await User.findOne({ username })
  if (exisitingUser) {
    return res.status(400).json({ error: 'username must be unique' })
  }

  // Ensure password is valid
  if (password.length < 8) {
    return res.status(400).json({ error: 'password must be at least 8 characters' })
  }

  // Encrypt password
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  // Create new User object
  const user = new User({ username, passwordHash })

  // Save new User to DB
  const savedUser = await user.save()

  // Respond with status 201 created and new User
  res.status(201).json(savedUser)
})

usersRouter.delete('/:id', async (req, res) => {
  console.log(req.user)
  // Require valid token to delete user
  if (req.user && req.user.id !== req.params.id) {
    return res.status(401).json({ error: 'must be logged in to delete user' })
  }

  await User.findByIdAndRemove(req.params.id)
})

module.exports = usersRouter