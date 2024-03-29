import { useState } from "react"

import taxaService from "../../services/taxaService"
import firstCharToUpper from "../../utils/firstCharToUpper"
import toTitleCase from "../../utils/toTitleCase"

import { ReactComponent as RemoveIcon } from '../../assets/remove-icon.svg'
import styles from './EditTaxon.module.css'

const EditTaxon = ({ selectedTaxa, setSelectedTaxa, index, checkForTaxaChanges }) => {

  console.log(selectedTaxa)

  const [input, setInput] = useState(selectedTaxa[index].preferred_common_name ? toTitleCase(selectedTaxa[index].preferred_common_name) : firstCharToUpper(selectedTaxa[index].name))
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
    setInput(selectedTaxa[index].preferred_common_name ? toTitleCase(selectedTaxa[index].preferred_common_name) : firstCharToUpper(selectedTaxa[index].name))
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

  return (
    <>
      <div className={styles.EditTaxon}>
        {selectedTaxa[index].default_photo
          ? <img className={styles.EditTaxon__photo} src={selectedTaxa[index].default_photo.url} alt={selectedTaxa[index].preferred_common_name} />
          : <div className={styles.EditTaxon__noPhoto}>
              No photo available
            </div>
        }
        <div className={styles.EditTaxon__info}>
          <div> 
            {index + 1}
          </div>
          <input
            className={styles.EditTaxon__input}
            type="text"
            value={input}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={onBlur}
          />
          {!focused && 
            <div className={styles.EditTaxon__sciName}>
              {firstCharToUpper(selectedTaxa[index].name)}
            </div>
          }
        </div>
        <button className={styles.EditTaxon__removeButton} onClick={handleRemove}>
          <RemoveIcon />
        </button>
      </div>
      <ul className={styles.EditTaxonSuggestions}>
        {suggestions && suggestions.map(suggestion =>
          <li key={suggestion.id} className={styles.EditTaxonSuggestions__suggestion} onMouseDown={handleSuggestionClick} data-id={suggestion.id}>
            {suggestion.default_photo &&
              <img className={styles.EditTaxonSuggestions__image} src={suggestion.default_photo.url} alt={suggestion.preferred_common_name} data-id={suggestion.id} />
            }
            <div className={styles.EditTaxonSuggestions__namesContainer}>
              <div className={styles.EditTaxonSuggestions__commonName} data-id={suggestion.id}>
                {toTitleCase(suggestion.preferred_common_name)}
              </div>
              <div className={styles.EditTaxonSuggestions__sciName} data-id={suggestion.id}>
                {firstCharToUpper(suggestion.name)}
              </div>
            </div>
          </li>
        )}
      </ul>
    </>
  )
}

export default EditTaxon