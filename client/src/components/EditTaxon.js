import { useState } from "react"

import suggestionService from "../services/suggestionService"
import taxaService from "../services/taxaService"

const EditTaxon = ({ selectedTaxa, setSelectedTaxa, index, checkForTaxaChanges }) => {

  const [input, setInput] = useState(selectedTaxa[index].preferred_common_name)
  const [focused, setFocused] = useState(false)
  const [suggestions, setSuggestions] = useState(null)

  const handleChange = async ({ target }) => {
    setInput(target.value)
    if (target.value) {
      const results = await suggestionService.fetchTaxaSuggestions(target.value)
      setSuggestions(results.filter(result => result.rank === 'species'))
    } else {
      setSuggestions(null)
    }
  }

  const onBlur = () => {
    setFocused(false)
    setSuggestions(null)
    setInput(selectedTaxa[index].preferred_common_name)
  }
  
  const handleSuggestionClick = async ({ target }) => {
    const id = target.getAttribute('data-id')
    const newTaxon = await taxaService.fetchTaxaById(id)
    const newTaxa = selectedTaxa.slice()
    newTaxa[index] = newTaxon

    setSelectedTaxa(newTaxa)
    setInput(newTaxon.preferred_common_name)
    checkForTaxaChanges(newTaxa)
  }

  const handleRemove = () => {
    const newTaxa = selectedTaxa.slice()
    newTaxa.splice(index, 1)
    setSelectedTaxa(newTaxa)
    checkForTaxaChanges(newTaxa)
  }
  console.log(selectedTaxa[index])

  return (
    <>
      <div className={focused ? 'create-taxon active' : 'create-taxon'}>
        {selectedTaxa[index].default_photo
          ? <img src={selectedTaxa[index].default_photo.url} alt={selectedTaxa[index].preferred_common_name} />
          : <div className='create-taxon-nophoto'>
              No photo available
            </div>
        }
        <div className="create-taxon-left">
          <div> 
            {index + 1}
          </div>
          <input
            className="create-taxon-input"
            type="text"
            value={input
              ? input
              : selectedTaxa[index].name
            }
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={onBlur}
          />
          {!focused && 
            <div className="create-sci">
              {selectedTaxa[index].name}
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

export default EditTaxon