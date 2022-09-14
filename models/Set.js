const mongoose = require('mongoose')

const setSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  dateCreated: {
    type: Date,
    required: true
  },
  numberOfTaxa: {
    type: Number,
    required: true
  },
  taxonIds: [
    {
      type: String,
      required: true,
      unique: true
    }
  ]
})

setSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Set = mongoose.model('Set', setSchema)

module.exports = Set