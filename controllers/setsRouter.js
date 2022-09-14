const setsRouter = require('express').Router()
const Set = require('../models/Set')
const User = require('../models/User')
const helpers = require('../utils/helpers')

setsRouter.get('/', async (req, res) => {
  const sets = await Set
    .find({})
    .populate('user', { username: 1 })

    res.status(200).json(sets)
})

setsRouter.post('/', async (req, res) => {
  const { name, taxonIds } = req.body

  // TODO: CHANGE WITH USER EXTRACTOR MIDDLEWARE
  const { _id } = await User.find({ username: 'testUser' })

  // Ensure taxon IDs are valid
  const isValidTaxonIds = await helpers.isValidTaxonIds(taxonIds)
  if (!isValidTaxonIds) {
    return res.status(400).json({ error: 'invalid taxon id' })
  }
  
  const set = new Set({
    user: _id,
    name: name,
    dateCreated: new Date(),
    numberOfTaxa: taxonIds.length,
    taxonIds: taxonIds
  })

  const savedSet = await set.save()

  res.status(201).json(savedSet)
})

module.exports = setsRouter