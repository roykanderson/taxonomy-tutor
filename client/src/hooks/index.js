import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import observationsService from '../services/observations'
import wikiService from '../services/wikiService'
import userService from '../services/userService'

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
export const useResults = (search, page = 1) => {
  const fetchResults = async ({ queryKey }) => {
    // The server first matches the search to a taxon
    const taxon = await observationsService.searchForTaxon(queryKey[1])

    // Then retrieves all descendants
    const descendants = await observationsService.searchForDescendants(taxon.id, queryKey[2])
    return descendants
  }

  return useQuery({
    queryKey: ['results', search, page],
    queryFn: fetchResults,
    staleTime: Infinity,
    keepPreviousData: true
  })
}

export const useWikiSummary = (url) => {
  return useQuery({
    queryKey: ['wikiSummary', url],
    queryFn: async ({ queryKey }) => await wikiService.getWikiSummary(queryKey[1]),
    staleTime: Infinity
  })
}

export const useSignup = (credentials) => {
  const signUp = async (credentials) => {
    const response = await userService.signUp(credentials)
    return response.data
  }

  return useQuery(['user'], signUp)
}