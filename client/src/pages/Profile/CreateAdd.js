import { useState } from "react"

import taxaService from "../../services/taxaService"
import toTitleCase from "../../utils/toTitleCase"
import firstCharToUpper from "../../utils/firstCharToUpper"

import styles from './CreateAdd.module.css'

const CreateAdd = ({ taxa, setTaxa }) => {
  const [active, setActive] = useState(false)
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

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
    // Prevent user from adding duplicate taxa
    if (taxa.some(taxon => String(taxon.id) === target.getAttribute('data-id'))) {
      setErrorMessage('Oops! That species is already in the set.')
      setTimeout(() => setErrorMessage(''), 2000)
    }
    else {
      setTaxa(taxa.concat(suggestions[target.getAttribute('index')]))
    }
    
    setSuggestions(null)
    setInput('')
    setActive(false)
  }

  return (
    <>
      {active
        ? <>
            <input autoFocus={true} onBlur={() => setActive(false)}
              className={`${styles.CreateAdd} ${styles['CreateAdd--active']}`}
              type="text"
              placeholder="Search for a species..."
              value={input}
              onChange={handleInputChange}
            />
            <ul className={styles.CreateAddSuggestions}>
              {suggestions && suggestions.map((suggestion, index) =>
                <li key={suggestion.id} className={styles.CreateAddSuggestions__suggestion} onMouseDown={handleSuggestionClick} data-id={suggestion.id} index={index}>
                  {suggestion.default_photo &&
                    <img className={styles.CreateAddSuggestions__image} src={suggestion.default_photo.url} alt={suggestion.preferred_common_name} data-id={suggestion.id} index={index} />
                  }
                  <div className={styles.CreateAddSuggestions__namesContainer} data-id={suggestion.id}>
                    <div className={styles.CreateAddSuggestions__commonName} data-id={suggestion.id} index={index}>
                      {toTitleCase(suggestion.preferred_common_name)}
                    </div>
                    <div className={styles.CreateAddSuggestions__sciName} data-id={suggestion.id} index={index}>
                      {firstCharToUpper(suggestion.name)}
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </>
        : <button className={errorMessage ? `${styles.CreateAdd} ${styles['CreateAdd--error']}` : `${styles.CreateAdd}`} onClick={() => setActive(true)}>
            {errorMessage
              ? <>
                  {errorMessage}
                </>
              : <>
                  + Add species
                </>
            }
          </button>
      }
    </>
  )
}

export default CreateAdd