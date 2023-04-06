import { useMutation } from '@tanstack/react-query'

import userService from '../services/userService'

// useCreateSetFromSearch returns an object whose .mutate method can be used to create a new set containing just the species
// from the "Add to set" modal on that species' results page.

const useCreateSetFromSearch = (setShowModal, invalidateQueries) => {
  return useMutation({
    mutationFn: async ({ taxon, title }) => {
      await userService.createSet(title, [String(taxon.id)])
    },
    onSuccess: () => {
      setShowModal(false)
      invalidateQueries('sets')
    }
  })
}

export default useCreateSetFromSearch