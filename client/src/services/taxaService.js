import axios from 'axios'

// Base url for fetching iNat observations
const TAXA_URL = 'http://localhost:3001/api/taxa'
const SUGGESTION_URL = 'https://api.inaturalist.org/v1/taxa/autocomplete'

const searchForTaxon = async (query) => {
  const url = `${TAXA_URL}?q=${query}`
  const res = await axios.get(url)
  return res.data
}

const searchForDescendants = async (id, page) => {
  const url = `${TAXA_URL}/descendants?id=${id}&page=${page}`
  const res = await axios.get(url)
  return res.data
}

const fetchTaxaById = async (id) => {
  const url = `https://api.inaturalist.org/v1/taxa/${id}`
  const res = await axios.get(url)
  return res.data.results[0]
}

const fetchTaxaSuggestions = async (search) => {
  const res = await axios.get(`${SUGGESTION_URL}?q=${search}`)
  return res.data.results.filter(taxon => taxon.preferred_common_name)
}

const taxaService = {
  searchForTaxon,
  searchForDescendants,
  fetchTaxaById,
  fetchTaxaSuggestions
}

export default taxaService