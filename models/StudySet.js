const mongoose = require('mongoose')

const studySetSchema = new mongoose.Schema({
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
      required: true
    }
  ]
})

studySetSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const StudySet = mongoose.model('StudySet', studySetSchema)

module.exports = StudySet