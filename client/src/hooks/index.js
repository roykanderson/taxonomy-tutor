import axios from 'axios'
import { useState, useEffect } from 'react'

import observationsService from '../services/observations'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    setValue,
    onChange
  }
}

// Accepts a search argument. Returns search results and status of async request.
export const useResults = (search) => {
  const [results, setResults] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchResults = async () => {
      setResults(null)
      setIsLoading(true)

      // The server first matches the search to a taxon
      const taxon = await observationsService.searchForTaxon(search)

      // Then retrieves all descendants
      const descendants = await observationsService.searchForDescendants(taxon.id, 1)
  
      setIsLoading(false)
      setResults(descendants)
    }

    fetchResults()
  }, [search])

  return {
    results,
    isLoading
  }
}