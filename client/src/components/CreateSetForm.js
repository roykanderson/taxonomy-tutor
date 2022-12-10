import { useState } from "react"
import CreateAddButton from "./CreateAddButton"
import CreateTaxon from "./CreateTaxon"
import CreateTitle from "./CreateTitle"

const CreateSetForm = () => {
  const [title, setTitle] = useState('')
  const [taxonIds, setTaxonIds] = useState([])
  console.log(taxonIds)

  return (
    <div className="create-container">
      <CreateTitle title={title} setTitle={setTitle} />
      {taxonIds.map((taxonId, index) =>
        <CreateTaxon key={taxonId} taxonId={taxonId} index={index} />
      )}
      <CreateAddButton
        taxonIds={taxonIds}
        setTaxonIds={setTaxonIds}
      />
      <button className="create-submit">
        Create
      </button>
    </div>
  )
}

export default CreateSetForm