import axios from 'axios'

// Base url for fetching iNat observations
const TAXA_URL = '/api/taxa'
const SUGGESTION_URL = 'https://api.inaturalist.org/v1/taxa/autocomplete'
const WIKI_URL = 'https://en.wikipedia.org/w/api.php'

const searchForTaxon = async (query) => {
  if (query.match(/[^a-zA-Z\s]/)) {
    return null
  }

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
  if (search.match(/[^a-zA-Z\s]/)) {
    return null
  }

  const res = await axios.get(`${SUGGESTION_URL}?q=${search}`)
  return res.data.results.filter(taxon => taxon.preferred_common_name)
}

const getWikiSummary = async (url) => {
  if (url) {
    const title = url.substring(url.lastIndexOf('/') + 1)
    const link = `${WIKI_URL}?format=json&action=query&prop=extracts&explaintext=1&titles=${title}&origin=*`
    const response = await axios.get(link)
    const extract = Object.values(response.data.query.pages)[0].extract
    const [rawSummary] = extract.match(/^.*/)
    const cleanSummary = rawSummary
      .replace(/\(\)/g, '')
      .replace(/\.\w/g, (match) => {
        return match
          .split('.')
          .join ('. ')
      })

    return cleanSummary
  }
}

const taxaService = {
  searchForTaxon,
  searchForDescendants,
  fetchTaxaById,
  fetchTaxaSuggestions,
  getWikiSummary
}

export default taxaService