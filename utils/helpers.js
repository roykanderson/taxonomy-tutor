const axios = require('axios')

const isValidTaxonIds = async (taxonIds) => {
  const baseUrl = 'https://api.inaturalist.org/v1/taxa?'
  
  for (id of taxonIds) {
    const res = await axios.get(`${baseUrl}id=${id}`)
    if (res.data.total_results !== 1) return false
  }

  return true
}

const firstLettersToUppercase = async (results) => {
  results.forEach(result => {
    if (result.hasOwnProperty('preferred_common_name')) {
      result.preferred_common_name = result.preferred_common_name.toLowerCase()
        .split(' ')
        .map(s => `${s.charAt(0).toUpperCase()}${s.substring(1)}`)
        .join(' ')
    }
  })
}

module.exports = {
  isValidTaxonIds,
  firstLettersToUppercase
}