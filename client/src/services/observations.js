import axios from 'axios'

// Base url for fetching iNat observations
const BASE_URL = 'https://api.inaturalist.org/v1/observations?order=desc&order_by=created_at&quality_grade=research&photos=true&photo_license=cc0&per_page=100'

const fetchObservations = async (taxon) => {
  const url = `${BASE_URL}&q=${taxon}`
  const res = await axios.get(url)

  // Filter to ensure all observations have a common name
  console.log(res.data.results.filter(obs => obs.taxon.preferred_common_name))
  return res.data.results.filter(obs => obs.taxon.preferred_common_name)
}

const observationsService = {
  fetchObservations
}

export default observationsService