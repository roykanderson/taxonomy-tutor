import { useQuery } from '@tanstack/react-query'

import wikiService from '../services/wikiService'

// useWikiSummary accepts a species Wikipedia article URL, and returns the first paragraph from that article as a string.

const useWikiSummary = (url) => {
  const getWikiSummary = async ({ queryKey }) => {
    const wikiSummary = await wikiService.getWikiSummary(queryKey[1])
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