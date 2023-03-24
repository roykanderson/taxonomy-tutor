import { useUpdateSet, useCreateSet } from '../hooks'

import LoadingIcon from './LoadingIcon'

const SpeciesAddModalAdd = ({ activeSet, title, setShowModal, taxon, data, error, setError }) => {
  const updateSet = useUpdateSet(setShowModal, setError)
  const createSet = useCreateSet(setShowModal)

  const handleAdd = () => {
    // Add species to an existing set
    if (activeSet) {
      updateSet.mutate({ taxon: taxon, set: data.filter(set => set.id === activeSet)[0] })
    }
    else if (title) {
      createSet.mutate({ taxon, title })
    }
  }

  if (updateSet.isLoading || createSet.isLoading) {
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