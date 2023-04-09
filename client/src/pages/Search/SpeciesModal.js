import { useState } from "react"

import useSets from '../../hooks/useSets'

import LoadingIcon from "../../components/LoadingIcon"
import ModalSets from './ModalSets'
import ModalCreate from "./ModalCreate"
import ModalAdd from './ModalAdd'
import OutsideDetector from "../../components/OutsideDetector"

import styles from './styles/SpeciesModal.module.css'

const SpeciesModal = ({ setShowModal, taxon }) => {
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
    <div className={styles.SpeciesModal}>
      <OutsideDetector sideEffectFn={() => setShowModal(false)}>
        <div className={styles.SpeciesModal__container}>
          {isFetching
            ? <LoadingIcon />
            : <>
                <div className={styles.SpeciesModal__topSection}>
                  <h2 className={styles.SpeciesModal__heading}>
                    Which set would you like to add this species to?
                  </h2>
                  <button className={styles.SpeciesModal__closeButton} onClick={() => setShowModal(false)}>
                    X
                  </button>
                </div>
                {data.length === 0
                  ? <div className={styles.SpeciesModal__noSets}>
                      It looks like you haven't created any study sets yet. Now's the perfect time to start!
                    </div>
                  : <ModalSets data={data} activeSet={activeSet} setActiveSet={setActiveSet} setCreateActive={setCreateActive} setError={setError} />
                }
                <div className={styles.SpeciesModal__buttons}>
                  <ModalCreate createActive={createActive} title={title} setTitle={setTitle} handleCreateClick={handleCreateClick} />
                  <ModalAdd activeSet={activeSet} title={title} setShowModal={setShowModal} taxon={taxon} data={data} error={error} setError={setError} />
                </div>
              </>
          }
        </div>
      </OutsideDetector>
    </div>
  )
}

export default SpeciesModal