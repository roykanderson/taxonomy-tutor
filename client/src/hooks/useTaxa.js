import { useQuery } from '@tanstack/react-query'

import observationsService from '../services/taxaService'
import wikiService from '../services/wikiService'

// useTaxa accepts an array of taxon ids, and returns an array of corresponding Taxon objects retrieved from the iNaturalist API.

const useTaxa = (taxonIds) => {
  const getTaxa = async ({ queryKey }) => {
    const taxa = queryKey[1].map(async taxonId => {
      const taxon = await observationsService.fetchTaxaById(taxonId)
      taxon.wikiSummary = await wikiService.getWikiSummary(taxon.wikipedia_url)
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