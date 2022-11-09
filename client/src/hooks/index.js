import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import observationsService from '../services/observations'
import wikiService from '../services/wikiService'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

// Accepts a search argument. Returns search results and status of async request.
export const useResults = (search) => {
  const fetchResults = async (search) => {
    // The server first matches the search to a taxon
    const taxon = await observationsService.searchForTaxon(search.queryKey[1])

    // Then retrieves all descendants
    const descendants = await observationsService.searchForDescendants(taxon.id, 1)
    return descendants
  }

  return useQuery({
    queryKey: ['results', search],
    queryFn: fetchResults
  })
}

export const useWikiSummary = (url) => {
  return useQuery(
    ['wikiSummary'],
    async () => await wikiService.getWikiSummary(url),
    Infinity
  )
}