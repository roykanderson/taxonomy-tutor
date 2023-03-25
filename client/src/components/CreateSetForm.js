import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useCreateSet } from "../hooks"

import CreateAddButton from "./CreateAddButton"
import CreateTaxon from "./CreateTaxon"
import CreateTitle from "./CreateTitle"

const CreateSetForm = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [taxa, setTaxa] = useState([])

  const createSet = useCreateSet(navigate)

  const handleCreate = () => {
    if (title) {
      createSet.mutate({ title, taxonIds: taxa.map(taxa => taxa.id) })
    }
  }

  return (
    <div className="create-container">
      <CreateTitle title={title} setTitle={setTitle} />
      {taxa.map((taxon, index) =>
        <CreateTaxon key={taxon.id} taxa={taxa} setTaxa={setTaxa} index={index} />
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