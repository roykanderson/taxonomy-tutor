import { useQuery } from '@tanstack/react-query'

import taxaService from '../services/taxaService'

// useTaxa accepts an array of taxon ids, and returns an array of corresponding Taxon objects retrieved from the iNaturalist API.

const useTaxa = (taxonIds) => {
  const getTaxa = async ({ queryKey }) => {
    const taxa = queryKey[1].map(async taxonId => {
      const taxon = await taxaService.fetchTaxaById(taxonId)
      taxon.wikiSummary = await taxaService.getWikiSummary(taxon.wikipedia_url)
      return taxon
    })
    return await Promise.all(taxa)
  }

  return useQuery({
    queryKey: ['taxa', taxonIds],
    queryFn: getTaxa,
    staleTime: Infinity,
    enabled: !!taxonIds
  })
}

export default useTaxa