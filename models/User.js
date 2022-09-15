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
  studySets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'StudySet'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash // ensure passwordHash is not revealed
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User