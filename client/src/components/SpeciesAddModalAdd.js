import { useUpdateSetFromSearch, useCreateSetFromSearch } from '../hooks'

import LoadingIcon from './LoadingIcon'

const SpeciesAddModalAdd = ({ activeSet, title, setShowModal, taxon, data, error, setError }) => {
  const updateSetFromSearch = useUpdateSetFromSearch(setShowModal, setError)
  const createSetFromSearch = useCreateSetFromSearch(setShowModal)

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