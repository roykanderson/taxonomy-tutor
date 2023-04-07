import { useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

import userService from "../../../../services/userService"
import arraysContainEqualValues from '../../../../utils/arraysContainEqualValues'

import EditTitle from "./EditTitle"
import EditTaxon from "./EditTaxon"
import EditAddButton from "./EditAddButton"
import DeleteSetModal from "./DeleteSetModal"

const StudyEdit = () => {
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
    <div className="create-container">
      <EditTitle title={title} setTitle={setTitle} checkForTitleChanges={checkForTitleChanges} />
      {selectedTaxa.map((taxon, index) =>
        <EditTaxon key={taxon.id} selectedTaxa={selectedTaxa} setSelectedTaxa={setSelectedTaxa} index={index} checkForTaxaChanges={checkForTaxaChanges} />
      )}
      <EditAddButton selectedTaxa={selectedTaxa} setSelectedTaxa={setSelectedTaxa} checkForTaxaChanges={checkForTaxaChanges} />
      <div className="study-edit-buttons">
        <button className='study-edit-delete' onClick={() => setShowModal(true)}>
          Delete set
        </button>
        <button className={isChanged ? 'create-submit study-edit' : 'create-submit study-edit inactive'} onClick={handleUpdate} disabled={!isChanged}>
          Update
        </button>
      </div>
      {showModal &&
        <DeleteSetModal setShowModal={setShowModal} set={set} />
      }
    </div>
  )
}

export default StudyEdit