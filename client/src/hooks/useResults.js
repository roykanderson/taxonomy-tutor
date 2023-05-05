import { useQuery } from '@tanstack/react-query'

import taxaService from '../services/taxaService'

// useResults accepts a search argument, then returns search results and status of async request.

const useResults = (search, page = 1) => {
  const fetchResults = async ({ queryKey }) => {
    if (queryKey[1].match(/[^a-zA-Z\s]/)) {
      return null
    }

    // The server first matches the search to a taxon
    const taxon = await taxaService.searchForTaxon(queryKey[1])
    
    // If a taxon is found, retrieve all descendants
    if (taxon) {
      const descendants = await taxaService.searchForDescendants(taxon?.id, queryKey[2])
      if (descendants?.total_results > 0) {
        return descendants
      }

      // If no descendants are found, return the taxon alone
      else if (taxon) {
        descendants.results.push(taxon)
        descendants.total_results = 1
        return descendants
      }
    }

    return null
  }

  return useQuery({
    queryKey: ['results', search, page],
    queryFn: fetchResults,
    staleTime: Infinity,
    keepPreviousData: true
  })
}

export default useResults