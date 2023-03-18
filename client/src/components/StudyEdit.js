import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import EditTitle from "./EditTitle"
import EditTaxon from "./EditTaxon"
import EditAddButton from "./EditAddButton"

import observationsService from "../services/observations"
import userService from "../services/userService"
import { arraysContainEqualValues } from "../utils/helpers"

const StudyEdit = () => {
  const location = useLocation()
  const set = location.state

  const navigate = useNavigate()

  const [title, setTitle] = useState(set.name)
  const [taxa, setTaxa] = useState([])

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
      <button className={isChanged ? 'create-submit' : 'create-submit inactive'} onClick={handleUpdate}>
        Update
      </button>
    </div>
  )
}

export default StudyEdit