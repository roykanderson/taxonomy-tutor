import { useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

import userService from "../../services/userService"
import arraysContainEqualValues from '../../utils/arraysContainEqualValues'

import EditTitle from "./EditTitle"
import EditTaxon from "./EditTaxon"
import EditAdd from "./EditAdd"
import EditModal from "./EditModal"

import styles from './SetEdit.module.css'

const SetEdit = () => {
  const { set, taxa } = useOutletContext()

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [title, setTitle] = useState(set.name)
  const [selectedTaxa, setSelectedTaxa] = useState(taxa)
  const [showModal, setShowModal] = useState(false)

  const originalTitle = set.name
  const originalTaxa = set.taxonIds

  const [isChanged, setIsChanged] = useState(false)

  const checkForTitleChanges = (newTitle) => {
    if (newTitle !== originalTitle) {
      setIsChanged(true)
    }
    else {
      setIsChanged(false)
    }
  }

  const checkForTaxaChanges = (newTaxa) => {
    if (arraysContainEqualValues(newTaxa.map((taxon) => String(taxon.id)), originalTaxa)) {
      setIsChanged(false)
    }
    else {
      setIsChanged(true)
    }
  }

  const handleUpdate = async () => {
    const updatedSet = await userService.updateSet(set.id, title, selectedTaxa.map((taxon) => taxon.id))
    queryClient.invalidateQueries('sets')
    navigate(`/profile/${set.id}`, { state: updatedSet })
  }

  return (
    <div className={styles.SetEdit}>
      <EditTitle title={title} setTitle={setTitle} checkForTitleChanges={checkForTitleChanges} />
      {selectedTaxa.map((taxon, index) =>
        <EditTaxon key={taxon.id} selectedTaxa={selectedTaxa} setSelectedTaxa={setSelectedTaxa} index={index} checkForTaxaChanges={checkForTaxaChanges} />
      )}
      <EditAdd selectedTaxa={selectedTaxa} setSelectedTaxa={setSelectedTaxa} checkForTaxaChanges={checkForTaxaChanges} />
      <div className={styles.SetEdit__buttons}>
        <button className={styles.SetEdit__deleteButton} onClick={() => setShowModal(true)}>
          Delete set
        </button>
        <button className={isChanged && title ? `${styles.SetEdit__submit}` : `${styles.SetEdit__submit} ${styles['SetEdit__submit--inactive']}`} onClick={handleUpdate} disabled={!isChanged}>
          Update
        </button>
      </div>
      {showModal &&
        <EditModal setShowModal={setShowModal} set={set} />
      }
    </div>
  )
}

export default SetEdit