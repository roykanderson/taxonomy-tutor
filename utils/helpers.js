const axios = require('axios')

const isValidTaxonIds = async (taxonIds) => {
  const baseUrl = 'https://api.inaturalist.org/v1/taxa?'
  
  for (id of taxonIds) {
    const res = await axios.get(`${baseUrl}id=${id}`)
    if (res.data.total_results !== 1) return false
  }

  return true
}

module.exports = { isValidTaxonIds }