import { useMutation } from '@tanstack/react-query'

import userService from '../services/userService'

// useDeleteSet returns an object whose .mutate method can be used to delete a set by its ID. Upon deletion, the
// navigateAfterDeletion function will run.

const useDeleteSet = (navigateAfterDeletion) => {
  return useMutation({
    mutationFn: async (id) => {
      await userService.deleteSet(id)
    },
    onSuccess: () => {
      navigateAfterDeletion()
    }
  })
}

export default useDeleteSet