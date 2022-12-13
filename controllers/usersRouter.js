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
  const { username, password, confirmPassword } = req.body

  // Ensure passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({message: 'Passwords do not match.'})
  }
  
  // Ensure username is unique
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return res.status(400).json({ message: 'Username already taken.' })
  }

  // Ensure password is valid
  /*
  if (password.length < 8) {
    console.log('password length')
    return res.status(400).json({ error: 'password must be at least 8 characters' })
  }
  */

  // Encrypt password
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  // Create new User object
  const user = new User({ username, passwordHash })

  // Save new User to DB
  const savedUser = await user.save()

  const userForToken = {
    username: savedUser.username,
    id: savedUser.id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  // Respond with status 201 created and new User
  res.status(201).json({token, username: savedUser.username })
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