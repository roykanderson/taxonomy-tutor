import React from "react"

const DropdownSuggestions = ({ suggestions, setTaxon, setSearch, setSuggestions }) => {
  const handleSuggestionClick = ({ target }) => {
    setTaxon(target.getAttribute('data-name'))
    setSearch('')
    setSuggestions(null)
  }

  return (
    <ul className='suggestions'>
      {suggestions && suggestions.map(suggestion =>
        <React.Fragment key={suggestion.id}>
          {suggestion.default_photo &&
            <li className='suggestion' onClick={handleSuggestionClick} data-name={suggestion.preferred_common_name}>
              <img src={suggestion.default_photo.url} alt={suggestion.preferred_common_name} data-name={suggestion.preferred_common_name} />
              <div className='suggestion-info' data-name={suggestion.preferred_common_name} >
                <div className='suggestion-info-name' data-name={suggestion.preferred_common_name}>{suggestion.preferred_common_name}</div>
                <div className='suggestion-info-rank' data-name={suggestion.preferred_common_name}>{suggestion.rank} <span data-name={suggestion.preferred_common_name}>{suggestion.name}</span></div>
              </div>
            </li>
          }
        </React.Fragment>
      )}
    </ul>
  )
}

export default DropdownSuggestions