import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

import CreateAddButton from "./CreateAddButton"
import EditTaxon from "./EditTaxon"
import CreateTitle from "./CreateTitle"

import observationsService from "../services/observations"

const StudyEdit = () => {
  const location = useLocation()
  const set = location.state

  const [title, setTitle] = useState(set.name)
  const [taxa, setTaxa] = useState([])

  console.log('TAXA', taxa)

  useEffect(() => {
    const fetchTaxaData = async () => {
      const data = set.taxonIds.map(async (id) => {
        return await observationsService.fetchTaxaById(id)
      })
      setTaxa(await Promise.all(data))
    }

    fetchTaxaData()
  }, [set.taxonIds])

  const handleUpdate = () => {
    return null
  }

  return (
    <div className="create-container">
      <CreateTitle title={title} setTitle={setTitle} />
      {taxa.map((taxon, index) =>
        <EditTaxon key={taxon.id} taxa={taxa} setTaxa={setTaxa} index={index} />
      )}
      <CreateAddButton
        taxa={taxa}
        setTaxa={setTaxa}
      />
      <button className="create-submit" onClick={handleUpdate}>
        Update
      </button>
    </div>
  )
}

export default StudyEdit