import axios from 'axios'

const BASE_URL = 'https://api.inaturalist.org/v1/taxa/autocomplete'

const fetchTaxaSuggestions = async (search) => {
  const res = await axios.get(`${BASE_URL}?q=${search}`)
  return res.data.results.filter(taxon => taxon.preferred_common_name)
}

const taxaService = { fetchTaxaSuggestions }

export default taxaService