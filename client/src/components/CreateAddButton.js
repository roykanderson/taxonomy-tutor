import { useState } from "react"

const CreateAddButton = ({ species, setSpecies, taxonIds, setTaxonIds }) => {
  const [active, setActive] = useState(false)

  return (
    <>
      {active
        ? <input
            className="create-add active"
            type="text"
            placeholder="Search for a species..."
          />
        : <button className="create-add" onClick={() => setActive(true)}>
            + Add species
          </button>
      }
    </>
  )
}

export default CreateAddButton