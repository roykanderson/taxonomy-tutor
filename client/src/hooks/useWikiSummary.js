import { useQuery } from '@tanstack/react-query'

import taxaService from '../services/taxaService'

// useWikiSummary accepts a species Wikipedia article URL, and returns the first paragraph from that article as a string.

const useWikiSummary = (url) => {
  const getWikiSummary = async ({ queryKey }) => {
    const wikiSummary = await taxaService.getWikiSummary(queryKey[1])
    if (wikiSummary) {
      return wikiSummary
    }
    return null
  }

  return useQuery({
    queryKey: ['wikiSummary', url],
    queryFn: getWikiSummary,
    staleTime: Infinity
  })
}

export default useWikiSummary