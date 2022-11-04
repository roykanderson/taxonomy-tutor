import axios from 'axios'

// Base url for fetching iNat observations
const BASE_URL = 'http://localhost:3001/api/taxa'

const searchForTaxon = async (query) => {
  const url = `${BASE_URL}?q=${query}`
  const res = await axios.get(url)
  return res.data
}

const searchForDescendants = async (id, page) => {
  const url = `${BASE_URL}/descendants?id=${id}&page=${page}`
  const res = await axios.get(url)
  return res.data
}

searchForTaxon('sharks')
searchForDescendants('47273', 1)

const observationsService = {
  searchForTaxon,
  searchForDescendants
}

export default observationsService