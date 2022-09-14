const bcrypt = require('bcrypt')

const usersRouter = require('express').Router()
const User = require('../models/User')
const Set = require('../models/Set')

usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({})
    .populate('sets', { name: 1, dateCreated: 1, numberOfTaxa: 1, taxonIds: 1})

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

module.exports = usersRouter