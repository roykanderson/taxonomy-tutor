const SpeciesAddModalSets = ({ data, activeSet, setActiveSet, setCreateActive, setError }) => {

  const handleSetClick = (setId) => {
    setActiveSet(setId)
    setCreateActive(false)
    setError(false)
  }

  return (
    <div className="species-add-modal-sets">
      {data
        ? data.map((set) => (
            <div
              key={set.id}
              className={set.id === activeSet ? "species-add-modal-set active" : "species-add-modal-set"}
              onClick={() => handleSetClick(set.id)}
            >
              <div className="species-add-modal-set-toprow">
                <p>
                  {set.name}
                </p>
                <p>
                  Last updated {new Date(set.dateLastUpdated).toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
              <div>
                {set.numberOfTaxa} species
              </div>
            </div>
          ))
        : <div className="species-add-modal-noset">
            Looks like you haven't created any sets yet. Now's the perfect time to start!
          </div>
      }
    </div>
  )
}

export default SpeciesAddModalSets