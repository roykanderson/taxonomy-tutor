const axios = require('axios')
const helpers = require('../utils/helpers')
const taxaRouter = require('express').Router()

const BASE_URL = 'https://api.inaturalist.org/v1/taxa'

taxaRouter.get('/', async (req, res) => {
  const apiResponse = await axios.get(`${BASE_URL}?q=${req.query.q}`)

  const maxRankLevel = Math.max(...apiResponse.data.results.map(taxon => taxon.rank_level))
  const taxon = apiResponse.data.results.find(taxon => taxon.rank_level === maxRankLevel)
  
  return res.status(200).json(taxon)
})

taxaRouter.get('/descendants', async (req, res) => {
  const perPage = 48
  const rank = 'species'

  const apiResponse = await axios.get(`${BASE_URL}?per_page=${perPage}&rank=${rank}&taxon_id=${req.query.id}&page=${req.query.page}`)

  helpers.firstLettersToUppercase(apiResponse.data.results)

  return res.status(200).json(apiResponse.data)
})

module.exports = taxaRouter