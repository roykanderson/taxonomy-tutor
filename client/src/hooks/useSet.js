import { useQuery } from '@tanstack/react-query'

import userService from '../services/userService'

// useSet accepts a set ID, then returns the data for that particular set.

const useSet = (setId) => {
  const getSet = async () => {
    const response = await userService.getSet(setId)
    return response
  }

  return useQuery({
    queryKey: ['set', setId],
    queryFn: getSet,
    staleTime: Infinity
  })
}

export default useSet