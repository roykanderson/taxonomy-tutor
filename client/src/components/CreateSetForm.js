import { useState } from "react"
import { useNavigate } from "react-router-dom"

import userService from "../services/userService"
import CreateAddButton from "./CreateAddButton"
import CreateTaxon from "./CreateTaxon"
import CreateTitle from "./CreateTitle"

const CreateSetForm = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [taxa, setTaxa] = useState([])

  const handleCreate = () => {
    if (title) {
      userService.createSet(title, taxa.map(taxa => taxa.id))
      navigate('/profile')
    }
  }

  return (
    <div className="create-container">
      <CreateTitle title={title} setTitle={setTitle} />
      {taxa.map((taxon, index) =>
        <CreateTaxon key={taxon.id} taxon={taxon} taxa={taxa} setTaxa={setTaxa} index={index} />
      )}
      <CreateAddButton
        taxa={taxa}
        setTaxa={setTaxa}
      />
      <button className="create-submit" onClick={handleCreate}>
        Create
      </button>
    </div>
  )
}

export default CreateSetForm