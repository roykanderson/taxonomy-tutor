const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  // Check if username already exists and that password is correct
  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  // Return error if username or password is incorrect
  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      message: 'Invalid username or password.'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  res.status(200).json({ token, username: user.username })
})

module.exports = loginRouter