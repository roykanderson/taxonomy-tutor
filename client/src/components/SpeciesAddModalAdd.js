import { useQueryClient } from '@tanstack/react-query'

import useUpdateSetFromSearch from '../hooks/useUpdateSetFromSearch'
import useCreateSetFromSearch from '../hooks/useCreateSetFromSearch'

import LoadingIcon from './LoadingIcon'

const SpeciesAddModalAdd = ({ activeSet, title, setShowModal, taxon, data, error, setError }) => {
  const queryClient = useQueryClient()

  const updateSetFromSearch = useUpdateSetFromSearch(setShowModal, setError, (key) => queryClient.invalidateQueries(key))
  const createSetFromSearch = useCreateSetFromSearch(setShowModal, (key) => queryClient.invalidateQueries(key))

  const handleAdd = () => {
    // Add species to an existing set
    if (activeSet) {
      updateSetFromSearch.mutate({ taxon: taxon, set: data.filter(set => set.id === activeSet)[0] })
    }
    else if (title) {
      createSetFromSearch.mutate({ taxon, title })
    }
  }

  if (updateSetFromSearch.isLoading || createSetFromSearch.isLoading) {
    return (
      <button className='species-add-modal-add active'>
        <LoadingIcon />
      </button>
    )
  }

  else if (error) {
    return (
      <button className='species-add-modal-add error'>
        Already in that set!
      </button>
    )
  }

  return (
    <button
      className={activeSet || title ? 'species-add-modal-add active' : 'species-add-modal-add'}
      disabled={!(activeSet || title)}
      onClick={handleAdd}
    >
      {title && !activeSet
        ? <>
            Create and add
          </>
        : <>
            Add
          </>
      }
    </button>
  )
}

export default SpeciesAddModalAdd