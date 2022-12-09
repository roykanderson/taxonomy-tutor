const CreateTaxon = ({ taxonId, index }) => {
  return (
    <div className="create-taxon">
      <div className="create-taxon-left">
        <div>
          {index + 1}
        </div>
        <div>
          {taxonId}
        </div>
      </div>
      <button>
        Remove
      </button>
    </div>
  )
}

export default CreateTaxon