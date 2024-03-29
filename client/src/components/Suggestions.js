import React from "react"
import { useNavigate } from "react-router-dom"

import toTitleCase from "../utils/toTitleCase"
import firstCharToUpper from "../utils/firstCharToUpper"
import styles from './Suggestions.module.css'

const Suggestions = ({ suggestions, setSuggestions, setInput, user }) => {
  const navigate = useNavigate()

  const handleClick = ({ target }) => {
    setSuggestions(null)
    setInput(target.getAttribute('data-name'))
    navigate(`/search?q=${target.getAttribute('data-name')}&rank=${target.getAttribute('data-rank')}&commonName=${target.getAttribute('data-common-name')}&page=1`)
  }

  return (
    <ul className={user ? `${styles.Suggestions} ${styles['Suggestions--user']}` : `${styles.Suggestions}`}>
      {suggestions && suggestions.map(suggestion =>
        <React.Fragment key={suggestion.id}>
          {suggestion.default_photo &&
            <li className={styles.Suggestions__suggestionContainer} onMouseDown={handleClick} data-name={suggestion.name} data-rank={suggestion.rank} data-common-name={toTitleCase(suggestion.preferred_common_name)}>
              <img className={styles.Suggestions__image} src={suggestion.default_photo.url} alt={suggestion.preferred_common_name} data-name={suggestion.name} data-rank={suggestion.rank} data-common-name={toTitleCase(suggestion.preferred_common_name)} />
              <div className={styles.Suggestions__suggestion} data-name={suggestion.name} data-rank={suggestion.rank} data-common-name={toTitleCase(suggestion.preferred_common_name)}>
                <div className={styles.Suggestions__commonName} data-name={suggestion.name} data-rank={suggestion.rank} data-common-name={toTitleCase(suggestion.preferred_common_name)}>
                  {toTitleCase(suggestion.preferred_common_name)}
                </div>
                <div className={styles.Suggestions__sciName} data-name={suggestion.name} data-rank={suggestion.rank} data-common-name={toTitleCase(suggestion.preferred_common_name)}>
                  <span data-name={suggestion.name} data-rank={suggestion.rank} data-common-name={toTitleCase(suggestion.preferred_common_name)}>{firstCharToUpper(suggestion.name)}</span> ({firstCharToUpper(suggestion.rank)})
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