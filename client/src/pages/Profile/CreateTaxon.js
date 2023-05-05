import { useState } from "react"

import taxaService from "../../services/taxaService"
import toTitleCase from "../../utils/toTitleCase"
import firstCharToUpper from "../../utils/firstCharToUpper"
import { ReactComponent as RemoveIcon } from '../../assets/remove-icon.svg'

import styles from './CreateTaxon.module.css'

const CreateTaxon = ({ taxa, setTaxa, index }) => {
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
    const newTaxon = await taxaService.fetchTaxaById(id)
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
      <div className={styles.CreateTaxon}>
        {taxa[index].default_photo
          ? <img className={styles.CreateTaxon__photo} src={taxa[index].default_photo.url} alt={taxa[index].preferred_common_name} />
          : <div className={styles.CreateTaxon__noPhoto}>
              No photo available
            </div>
        }
        <div className={styles.CreateTaxon__info}>
          <div className={styles.CreateTaxon__index}> 
            {index + 1}
          </div>
          <input
            className={styles.CreateTaxon__input}
            type="text"
            value={toTitleCase(input)}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={onBlur}
          />
          {!focused && 
            <div className={styles.CreateTaxon__sciName}>
              {firstCharToUpper(taxa[index].name)}
            </div>
          }
        </div>
        <button className={styles.CreateTaxon__removeButton} onClick={handleRemove}>
          <div>
            <RemoveIcon />
          </div>
        </button>
      </div>
      <ul className={styles.CreateTaxonSuggestions}>
        {suggestions && suggestions.map(suggestion =>
          <li key={suggestion.id} className={styles.CreateTaxonSuggestions__suggestion} onMouseDown={handleSuggestionClick} data-id={suggestion.id}>
            {suggestion.default_photo &&
              <img className={styles.CreateTaxonSuggestions__image} src={suggestion.default_photo.url} alt={suggestion.preferred_common_name} data-id={suggestion.id} />
            }
            <div className={styles.CreateTaxonSuggestions__namesContainer}>
              <div className={styles.CreateTaxonSuggestions__commonName} data-id={suggestion.id}>
                {toTitleCase(suggestion.preferred_common_name)}
              </div>
              <div className={styles.CreateTaxonSuggestions__sciName} data-id={suggestion.id}>
                {firstCharToUpper(suggestion.name)}
              </div>
            </div>
          </li>
        )}
      </ul>
    </>
  )
}

export default CreateTaxon