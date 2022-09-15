const studySetsRouter = require('express').Router()
const StudySet = require('../models/StudySet')
const User = require('../models/User')
const helpers = require('../utils/helpers')

studySetsRouter.get('/', async (req, res) => {
  const studySets = await StudySet.find({})

    res.status(200).json(studySets)
})

studySetsRouter.post('/', async (req, res) => {
  // Only allow StudySet to be created with valid jwt
  if (!req.user) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = req.user
  const { name, taxonIds } = req.body

  // Ensure taxon IDs are valid
  const isValidTaxonIds = await helpers.isValidTaxonIds(taxonIds)
  if (!isValidTaxonIds) {
    return res.status(400).json({ error: 'invalid taxon id(s)' })
  }
  
  const studySet = new StudySet({
    user: user.id,
    name: name,
    dateCreated: new Date(),
    numberOfTaxa: taxonIds.length,
    taxonIds: taxonIds
  })

  const savedStudySet = await studySet.save()

  user.studySets = user.studySets.concat(savedStudySet)
  await user.save()

  res.status(201).json(savedStudySet)
})

studySetsRouter.delete('/:id', async (req, res) => {
  const studySetToDelete = await StudySet.findById(req.params.id)

  // If set was already deleted, return status code 204
  if (!studySetToDelete) {
    return res.status(204).end()
  }

  // Only allow creator to delete the set
  if (studySetToDelete.user && studySetToDelete.user.toString() !== req.user.id) {
    return res.status(401).json({ error: 'only the creator can delete a study set' })
  }

  await StudySet.findByIdAndRemove(req.params.id)
  
  res.status(204).end()
})

studySetsRouter.put('/:id', async (req, res) => {
  const studySetToUpdate = await StudySet.findById(req.params.id)
  console.log(studySetToUpdate)
  // Only allow creator to update the StudySet
  if (studySetToUpdate.user && studySetToUpdate.user.toString() !== req.user.id) {
    return res.status(401).json({ error: 'only the creator can update a set' })
  }

  // Only allow unique and valid iNaturalist taxonIds in StudySet
  const taxonIds = new Set(req.body.taxonIds)
  if (!helpers.isValidTaxonIds(taxonIds)) {
    return res.status(401).json({ error: 'invalid taxon id(s)' })
  }

  // Update existing StudySet
  const studySet = { name: req.body.name, taxonIds: Array.from(taxonIds) }
  const updatedStudySet = await StudySet.findByIdAndUpdate(
    req.params.id,
    studySet,
    { new: true, runValidators: true, context: 'query' }
  )

  res.json(updatedStudySet)
})

module.exports = studySetsRouter