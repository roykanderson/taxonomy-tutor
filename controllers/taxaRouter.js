const axios = require('axios')

const taxaRouter = require('express').Router()

const BASE_URL = 'https://api.inaturalist.org/v1/taxa'

taxaRouter.get('/', async (req, res) => {
  const apiResponse = await axios.get(`${BASE_URL}?q=${req.query.q}`)

  const maxRankLevel = Math.max(...apiResponse.data.results.map(taxon => taxon.rank_level))
  const taxon = apiResponse.data.results.find(taxon => taxon.rank_level === maxRankLevel)
  
  return res.status(200).json(taxon)
})

taxaRouter.get('/descendants', async (req, res) => {
  const apiResponse = await axios.get(`${BASE_URL}?per_page=24&rank=species&taxon_id=${req.query.id}&page=${req.query.page}`)
  return res.status(200).json(apiResponse.data.results)
})

module.exports = taxaRouter