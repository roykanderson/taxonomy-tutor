import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import observationsService from '../services/observations'

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
    console.log('Search: ', search)
    // The server first matches the search to a taxon
    const taxon = await observationsService.searchForTaxon(search.queryKey[1])

    // Then retrieves all descendants
    const descendants = await observationsService.searchForDescendants(taxon.id, 1)

    console.log('Returning: ', descendants)
    return descendants
  }

  return useQuery({
    queryKey: ['results', search],
    queryFn: fetchResults
  })
}