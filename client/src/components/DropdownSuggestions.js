import React from "react"

const DropdownSuggestions = ({ suggestions }) => {
  return (
    <ul className='suggestions'>
      {suggestions && suggestions.map(suggestion =>
        <React.Fragment key={suggestion.id}>
          {suggestion.default_photo &&
            <li className='suggestion'>
              <img src={suggestion.default_photo.url} alt={suggestion.preferred_common_name} />
              <div className='suggestion-info'>
                <div className='suggestion-info-name'>{suggestion.preferred_common_name}</div>
                <div className='suggestion-info-rank'>{suggestion.rank} <span>{suggestion.name}</span></div>
              </div>
            </li>
          }
        </React.Fragment>
      )}
    </ul>
  )
}

export default DropdownSuggestions