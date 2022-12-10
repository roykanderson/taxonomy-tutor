import { useState } from "react"
import taxaService from "../services/taxaService"

const CreateAddButton = ({ taxonIds, setTaxonIds }) => {
  const [active, setActive] = useState(false)
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState('')

  const handleInputChange = async ({ target }) => {
    setInput(target.value)
    if (target.value) {
      const results = await taxaService.fetchTaxaSuggestions(target.value)
      setSuggestions(results.filter(result => result.rank === 'species'))
    } else {
      setSuggestions(null)
    }
  }

  const handleSuggestionClick = ({ target }) => {
    setSuggestions(null)
    setInput('')
    setTaxonIds(taxonIds.concat(target.getAttribute('data-id')))
    setActive(false)
  }

  return (
    <>
      {active
        ? <>
            <input autoFocus={true} onBlur={() => setActive(false)}
              className="create-add active"
              type="text"
              placeholder="Search for a species..."
              value={input}
              onChange={handleInputChange}
            />
            <ul className='create-suggestions'>
              {suggestions && suggestions.map(suggestion =>
                <li key={suggestion.id} className='create-suggestion' onMouseDown={handleSuggestionClick} data-id={suggestion.id}>
                  <img src={suggestion.default_photo.url} alt={suggestion.preferred_common_name} data-id={suggestion.id} />
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
        : <button className="create-add" onClick={() => setActive(true)}>
            + Add species
          </button>
      }
    </>
  )
}

export default CreateAddButton