const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  sets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Set'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash // ensure passwordHash is not revealed
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User