import axios from 'axios'

// Base url for fetching iNat observations
const BASE_URL = 'https://www.inaturalist.org/observations.json'

const fetchObservations = async (taxon) => {
  const url = `${BASE_URL}?taxon_name=${taxon}&quality_grade=research&has[]=photos`
  const res = await axios.get(url)

  // Filter to ensure all observations have a common name
  return res.data.filter((observation) => observation.taxon.common_name)
}

const observationsService = {
  fetchObservations
}

export default observationsService