import { useMutation } from '@tanstack/react-query'

import userService from '../services/userService'

// useUpdateSetFromSearch returns an object whose .mutate method can be used to add a species to a set from the "Add to set"
// modal on that species' results page.

const useUpdateSetFromSearch = (setShowModal, setError, invalidateQueries) => {
  return useMutation({
    mutationFn: async ({ taxon, set }) => {
      await userService.updateSet(set.id, set.name, set.taxonIds.concat(String(taxon.id)))
    },
    onError: () => {
      setError(true)
    },
    onSuccess: () => {
      setShowModal(false)
      invalidateQueries('sets')
    }
  })
}

export default useUpdateSetFromSearch