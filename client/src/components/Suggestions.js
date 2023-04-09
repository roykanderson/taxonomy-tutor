import React from "react"
import { useNavigate } from "react-router-dom"

import styles from './Suggestions.module.css'

const Suggestions = ({ suggestions, setSuggestions, setInput }) => {
  const navigate = useNavigate()

  const handleClick = ({ target }) => {
    console.log('click')
    setSuggestions(null)
    setInput(target.getAttribute('data-name'))
    console.log(target.getAttribute('data-name'))
    navigate(`/search?q=${target.getAttribute('data-name')}`)
  }

  return (
    <ul className={styles.Suggestions}>
      {suggestions && suggestions.map(suggestion =>
        <React.Fragment key={suggestion.id}>
          {suggestion.default_photo &&
            <li className={styles.Suggestions__suggestionContainer} onMouseDown={handleClick} data-name={suggestion.name}>
              <img className={styles.Suggestions__image} src={suggestion.default_photo.url} alt={suggestion.preferred_common_name} data-name={suggestion.name} />
              <div className={styles.Suggestions__suggestion} data-name={suggestion.name} >
                <div className={styles.Suggestions__commonName} data-name={suggestion.name}>{suggestion.preferred_common_name}</div>
                <div className={styles.Suggestions__sciName} data-name={suggestion.name}>
                  {suggestion.rank}<span data-name={suggestion.name}>{suggestion.name}</span>
                </div>
              </div>
            </li>
          }
        </React.Fragment>
      )}
    </ul>
  )
}

export default Suggestions