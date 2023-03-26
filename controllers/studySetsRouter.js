const studySetsRouter = require('express').Router()
const { response } = require('express')
const StudySet = require('../models/StudySet')
const User = require('../models/User')
const helpers = require('../utils/helpers')
const jwt = require('jsonwebtoken')

studySetsRouter.get('/', async (req, res) => {
  // Only allow StudySets to be retrieved with valid jwt
  const token = helpers.getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ message: 'token missing or invalid'})
  }
  const user = await User
    .findById(decodedToken.id)
    .populate('studySets', { name: 1, dateCreated: 1, dateLastUpdated: 1, numberOfTaxa: 1, taxonIds: 1 })

  res.status(200).json(user.studySets)
})

studySetsRouter.get('/:id', async (req, res) => {
  // Only allow Study to be retrieved with valid jwt
  const token = helpers.getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const setId = req.params.id

  const set = await StudySet.findById(setId)

  // Return error if set was not found
  if (!set) {
    return res.status(401).json({ error: 'set could not be found' })
  }

  console.log(set)

  res.status(200).json(set)
})

studySetsRouter.post('/', async (req, res) => {
  // Only allow StudySet to be created with valid jwt
  const token = helpers.getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid'})
  }
  const user = await User.findById(decodedToken.id)

  const { name, taxonIds } = req.body

  // Ensure taxon IDs are valid
  const isValidTaxonIds = await helpers.isValidTaxonIds(taxonIds)
  if (!isValidTaxonIds) {
    return res.status(400).json({ error: 'invalid taxon id(s)' })
  }

  // Ensure StudySet has a title
  if (!name) {
    return res.status(400).json({ error: 'title missing'})
  }
  
  const studySet = new StudySet({
    user: user._id,
    name: name,
    dateCreated: new Date(),
    dateLastUpdated: new Date(),
    numberOfTaxa: taxonIds.length,
    taxonIds: taxonIds
  })

  const savedStudySet = await studySet.save()
  user.studySets = user.studySets.concat(savedStudySet)
  await user.save()

  res.status(201).json(savedStudySet)
})

studySetsRouter.delete('/:id', async (req, res) => {
  // Only allow StudySet to be deleted with valid jwt
  const token = helpers.getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid'})
  }

  const studySetToDelete = await StudySet.findById(req.params.id)

  // If set was already deleted, return status code 204
  if (!studySetToDelete) {
    return res.status(204).end()
  }

  // Only allow creator to delete the set
  if (studySetToDelete.user && studySetToDelete.user.toString() !== req.user.id) {
    return res.status(401).json({ error: 'only the creator can delete a study set' })
  }

  // Delete StudySet
  await StudySet.findByIdAndRemove(req.params.id)

  // Remove the StudySet's reference in User document
  await User.findByIdAndUpdate(req.user.id, {
      $pull: {
        'studySets': req.params.id
      }
  })
  
  res.status(204).end()
})

studySetsRouter.put('/:id', async (req, res) => {
  // Only allow StudySet to be updated with valid jwt
  const token = helpers.getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid'})
  }

  const studySetToUpdate = await StudySet.findById(req.params.id)
  
  // Only allow creator to update the StudySet
  if (studySetToUpdate.user && studySetToUpdate.user.toString() !== req.user.id) {
    return res.status(401).json({ error: 'only the creator can update a set' })
  }

  // Only allow unique iNaturalist taxonIds in StudySet
  const taxonIds = new Set(req.body.taxonIds)
  if (taxonIds.size !== req.body.taxonIds.length) {
    return res.status(401).json({ error: 'taxonIds not all unique'})
  }

  // Only allow valid iNaturalist taxonIds in StudySet
  if (!helpers.isValidTaxonIds(taxonIds)) {
    return res.status(401).json({ error: 'invalid taxon id(s)' })
  }

  // Update existing StudySet
  const studySet = {
    name: req.body.name,
    dateLastUpdated: new Date(),
    numberOfTaxa: Array.from(taxonIds).length,
    taxonIds: Array.from(taxonIds)
  }
  const updatedStudySet = await StudySet.findByIdAndUpdate(
    req.params.id,
    studySet,
    { new: true, runValidators: true, context: 'query' }
  )

  res.json(updatedStudySet)
})

module.exports = studySetsRouter