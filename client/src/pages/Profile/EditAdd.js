import { useState } from "react"
import taxaService from "../../services/taxaService"

import styles from './EditAdd.module.css'

const EditAdd = ({ selectedTaxa, setSelectedTaxa, checkForTaxaChanges }) => {
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

  const handleSuggestionClick = async ({ target }) => {
    setSuggestions(null)
    setInput('')
    const newTaxa = selectedTaxa.concat(await taxaService.fetchTaxaById(target.getAttribute('data-id')))
    setSelectedTaxa(newTaxa)
    setActive(false)
    checkForTaxaChanges(newTaxa)
  }

  return (
    <>
      {active
        ? <>
            <input autoFocus={true} onBlur={() => setActive(false)}
              className={`${styles.EditAdd} ${styles['EditAdd--active']}`}
              type="text"
              placeholder="Search for a species..."
              value={input}
              onChange={handleInputChange}
            />
            <ul className={styles.EditAddSuggestions}>
              {suggestions && suggestions.map(suggestion =>
                <li key={suggestion.id} className={styles.EditAddSuggestions__suggestion} onMouseDown={handleSuggestionClick} data-id={suggestion.id}>
                  {suggestion.default_photo &&
                    <img className={styles.EditAddSuggestions__image} src={suggestion.default_photo.url} alt={suggestion.preferred_common_name} data-id={suggestion.id} />
                  }
                  <div data-id={suggestion.id}>
                    {suggestion.preferred_common_name}
                  </div>
                  <div className={styles.EditAddSuggestions__sciName} data-id={suggestion.id}>
                    {suggestion.name}
                  </div>
                </li>
              )}
            </ul>
          </>
        : <button className={styles.EditAdd} onClick={() => setActive(true)}>
            + Add species
          </button>
      }
    </>
  )
}

export default EditAdd