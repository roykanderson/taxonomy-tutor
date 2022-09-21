import React from "react"

const DropdownSuggestions = ({ suggestions, setSuggestions, setInput, setSearch }) => {
  const handleSuggestionClick = ({ target }) => {
    setSuggestions(null)
    setInput('')
    setSearch(target.getAttribute('data-name'))
  }

  return (
    <ul className='suggestions'>
      {suggestions && suggestions.map(suggestion =>
        <React.Fragment key={suggestion.id}>
          {suggestion.default_photo &&
            <li className='suggestion' onClick={handleSuggestionClick} data-name={suggestion.name}>
              <img src={suggestion.default_photo.url} alt={suggestion.preferred_common_name} data-name={suggestion.name} />
              <div className='suggestion-info' data-name={suggestion.name} >
                <div className='suggestion-info-name' data-name={suggestion.name}>{suggestion.preferred_common_name}</div>
                <div className='suggestion-info-rank' data-name={suggestion.name}>{suggestion.rank} <span data-name={suggestion.name}>{suggestion.name}</span></div>
              </div>
            </li>
          }
        </React.Fragment>
      )}
    </ul>
  )
}

export default DropdownSuggestions