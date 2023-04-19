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

    // Then retrieves all descendants
    const descendants = await taxaService.searchForDescendants(taxon.id, queryKey[2])
    return descendants
  }

  return useQuery({
    queryKey: ['results', search, page],
    queryFn: fetchResults,
    staleTime: Infinity,
    keepPreviousData: true
  })
}

export default useResults