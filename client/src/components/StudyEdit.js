import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import EditTitle from "./EditTitle"
import EditTaxon from "./EditTaxon"
import EditAddButton from "./EditAddButton"

import observationsService from "../services/observations"
import userService from "../services/userService"
import { arraysContainEqualValues } from "../utils/helpers"
import DeleteSetModal from "./DeleteSetModal"

const StudyEdit = () => {
  const location = useLocation()
  const set = location.state

  const navigate = useNavigate()

  const [title, setTitle] = useState(set.name)
  const [taxa, setTaxa] = useState([])
  const [showModal, setShowModal] = useState(false)

  const originalTitle = set.name
  const originalTaxa = set.taxonIds

  const [isChanged, setIsChanged] = useState(false)

  useEffect(() => {
    const fetchTaxaData = async () => {
      const data = set.taxonIds.map(async (id) => {
        return await observationsService.fetchTaxaById(id)
      })
      setTaxa(await Promise.all(data))
    }

    fetchTaxaData()
  }, [set.taxonIds])

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
    const updatedSet = await userService.updateSet(set.id, title, taxa.map((taxon) => taxon.id))
    navigate(`/profile/${set.id}`, { state: updatedSet })
  }

  return (
    <div className="create-container">
      <EditTitle title={title} setTitle={setTitle} checkForTitleChanges={checkForTitleChanges} />
      {taxa.map((taxon, index) =>
        <EditTaxon key={taxon.id} taxa={taxa} setTaxa={setTaxa} index={index} checkForTaxaChanges={checkForTaxaChanges} />
      )}
      <EditAddButton taxa={taxa} setTaxa={setTaxa} checkForTaxaChanges={checkForTaxaChanges} />
      <div className="study-edit-buttons">
        <button className='study-edit-delete' onClick={() => setShowModal(true)}>
          Delete set
        </button>
        <button className={isChanged ? 'create-submit study-edit' : 'create-submit study-edit inactive'} onClick={handleUpdate}>
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