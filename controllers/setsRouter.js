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
  // Only allow set to be created with valid jwt
  if (!req.user) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = req.user
  const { name, taxonIds } = req.body

  // Ensure taxon IDs are valid
  const isValidTaxonIds = await helpers.isValidTaxonIds(taxonIds)
  if (!isValidTaxonIds) {
    return res.status(400).json({ error: 'invalid taxon id' })
  }
  
  const set = new Set({
    user: user.id,
    name: name,
    dateCreated: new Date(),
    numberOfTaxa: taxonIds.length,
    taxonIds: taxonIds
  })

  const savedSet = await set.save()

  user.sets = user.sets.concat(savedSet)
  await user.save()

  res.status(201).json(savedSet)
})

setsRouter.delete('/:id', async (req, res) => {
  const setToDelete = await Set.findById(req.params.id)

  // If set was already deleted, return status code 204
  if (!setToDelete) {
    return res.status(204).end()
  }

  // Only allow creator to delete a set
  if (setToDelete.user && setToDelete.user.toString() !== req.user.id) {
    return res.status(401).json({ error: 'only the creator can delete a set' })
  }

  await Set.findByIdAndRemove(req.params.id)
  
  res.status(204).end()
})

module.exports = setsRouter