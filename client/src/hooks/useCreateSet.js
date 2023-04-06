import { useMutation } from '@tanstack/react-query'

import userService from '../services/userService'

// useCreateSet returns an object whose .mutate method can be used to create a new set.

const useCreateSet = (navigate) => {
  return useMutation({
    mutationFn: async ({ title, taxonIds }) => {
      await userService.createSet(title, taxonIds)
    },
    onSuccess: () => {
      navigate('/profile')
    }
  })
}

export default useCreateSet