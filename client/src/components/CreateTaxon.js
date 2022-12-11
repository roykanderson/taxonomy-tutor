import { useState } from "react"

import taxaService from "../services/taxaService"
import observationsService from "../services/observations"

const CreateTaxon = ({ taxonId, taxa, setTaxa, index }) => {
  const [input, setInput] = useState(taxa[index].preferred_common_name)
  const [focused, setFocused] = useState(false)
  const [suggestions, setSuggestions] = useState(null)

  const handleChange = async ({ target }) => {
    setInput(target.value)
    if (target.value) {
      const results = await taxaService.fetchTaxaSuggestions(target.value)
      setSuggestions(results.filter(result => result.rank === 'species'))
    } else {
      setSuggestions(null)
    }
  }

  const onBlur = () => {
    setFocused(false)
    setSuggestions(null)
    setInput(taxa[index].preferred_common_name)
  }
  
  const handleSuggestionClick = async ({ target }) => {
    const id = target.getAttribute('data-id')
    const newTaxon = await observationsService.fetchTaxaById(id)
    const newTaxa = taxa.slice()
    newTaxa[index] = newTaxon

    setTaxa(newTaxa)
    setInput(newTaxon.preferred_common_name)
  }

  const handleRemove = () => {
    const newTaxa = taxa.slice()
    newTaxa.splice(index, 1)
    setTaxa(newTaxa)
  }

  return (
    <>
      <div className={focused ? 'create-taxon active' : 'create-taxon'}>
        <img src={taxa[index].default_photo.url} alt={taxa[index].preferred_common_name} />
        <div className="create-taxon-left">
          <div> 
            {index + 1}
          </div>
          <input
            className="create-taxon-input"
            type="text"
            value={input}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={onBlur}
          />
          {!focused && 
            <div className="create-sci">
              {taxa[index].name}
            </div>
          }
        </div>
        <button className="create-taxon-button" onClick={handleRemove}>
          Remove
        </button>
      </div>
      <ul className='create-suggestions taxon'>
        {suggestions && suggestions.map(suggestion =>
          <li key={suggestion.id} className='create-suggestion' onMouseDown={handleSuggestionClick} data-id={suggestion.id}>
            {suggestion.default_photo &&
              <img src={suggestion.default_photo.url} alt={suggestion.preferred_common_name} data-id={suggestion.id} />
            }
            <div className="create-suggestion-common" data-id={suggestion.id}>
              {suggestion.preferred_common_name}
            </div>
            <div className="create-suggestion-sci" data-id={suggestion.id}>
              {suggestion.name}
            </div>
          </li>
        )}
      </ul>
    </>
  )
}

export default CreateTaxon