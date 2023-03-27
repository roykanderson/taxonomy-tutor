import { useState } from "react"

import { useSets } from "../hooks"

import LoadingIcon from "./LoadingIcon"
import SpeciesAddModalSets from './SpeciesAddModalSets'
import SpeciesAddModalCreate from "./SpeciesAddModalCreate"
import SpeciesAddModalAdd from './SpeciesAddModalAdd'
import OutsideAlerter from "./OutsideAlerter"

const SpeciesAddModal = ({ setShowModal, taxon }) => {
  const { data, isFetching } = useSets()

  const [createActive, setCreateActive] = useState(false)
  const [activeSet, setActiveSet] = useState(null)
  const [title, setTitle] = useState('')
  const [error, setError] = useState(false)

  const handleCreateClick = () => {
    setCreateActive(true)
    setActiveSet(null)
    setError(false)
  }

  return (
    <div className="species-add-modal-overlay">
      <OutsideAlerter sideEffectFn={() => setShowModal(false)}>
        <div className='species-add-modal-container'>
          {isFetching
            ? <LoadingIcon />
            : <>
                <div className="species-add-modal-header-row">
                  <h2 className='species-add-modal-header'>
                    Which set would you like to add this species to?
                  </h2>
                  <button className='species-add-modal-closebutton' onClick={() => setShowModal(false)}>
                    X
                  </button>
                </div>
                {data.length === 0
                  ? <div className='species-add-modal-nosets'>
                      It looks like you haven't created any study sets yet. Now's the perfect time to start!
                    </div>
                  : <SpeciesAddModalSets data={data} activeSet={activeSet} setActiveSet={setActiveSet} setCreateActive={setCreateActive} setError={setError} />
                }
                <div className='species-add-modal-buttons'>
                  <SpeciesAddModalCreate createActive={createActive} title={title} setTitle={setTitle} handleCreateClick={handleCreateClick} />
                  <SpeciesAddModalAdd activeSet={activeSet} title={title} setShowModal={setShowModal} taxon={taxon} data={data} error={error} setError={setError} />
                </div>
              </>
          }
        </div>
      </OutsideAlerter>
    </div>
  )
}

export default SpeciesAddModal