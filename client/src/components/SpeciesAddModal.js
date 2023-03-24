import { useState } from "react"

import { useSets } from "../hooks"

import LoadingIcon from "./LoadingIcon"
import SpeciesAddModalSets from './SpeciesAddModalSets'
import SpeciesAddModalCreate from "./SpeciesAddModalCreate"
import SpeciesAddModalAdd from './SpeciesAddModalAdd'

const SpeciesAddModal = ({ setShowModal, taxon }) => {
  const { data, isFetching } = useSets()

  const [createActive, setCreateActive] = useState(false)
  const [activeSet, setActiveSet] = useState(null)
  const [title, setTitle] = useState('')

  const handleCreateClick = () => {
    setCreateActive(true)
    setActiveSet(null)
  }

  return (
    <div className='species-add-modal-container'>
      {isFetching
        ? <LoadingIcon />
        : <>
            <h2 className='species-add-modal-header'>
              Which set would you like to add this species to?
            </h2>
            <SpeciesAddModalSets data={data} activeSet={activeSet} setActiveSet={setActiveSet} setCreateActive={setCreateActive} />
            <div className='species-add-modal-buttons'>
              <SpeciesAddModalCreate createActive={createActive} title={title} setTitle={setTitle} handleCreateClick={handleCreateClick} />
              <SpeciesAddModalAdd activeSet={activeSet} title={title} setShowModal={setShowModal} taxon={taxon} data={data} />
            </div>
          </>
      }
    </div>
  )
}

export default SpeciesAddModal