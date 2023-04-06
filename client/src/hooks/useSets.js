import { useQuery } from '@tanstack/react-query'

import userService from '../services/userService'

// useSets returns the data for all sets of the user that is currently logged in.

const useSets = () => {
  const getSets = async () => {
    const response = await userService.getSets()
    return response
  }

  return useQuery({
    queryKey: ['sets'],
    queryFn: getSets,
    staleTime: Infinity
  })
}

export default useSets