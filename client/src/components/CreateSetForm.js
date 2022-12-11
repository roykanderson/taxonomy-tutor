import { useState } from "react"
import CreateAddButton from "./CreateAddButton"
import CreateTaxon from "./CreateTaxon"
import CreateTitle from "./CreateTitle"

const CreateSetForm = () => {
  const [title, setTitle] = useState('')
  const [taxa, setTaxa] = useState([])

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
      <button className="create-submit">
        Create
      </button>
    </div>
  )
}

export default CreateSetForm