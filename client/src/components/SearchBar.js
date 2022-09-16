import { useState } from 'react'

import LoadingIcon from './LoadingIcon'
import taxaService from '../services/taxaService'

const SearchBar = ({ taxon, setTaxon, isFetchingData }) => {
  const [search, setSearch] = useState('')
  const [shake, setShake] = useState(false)
  const [suggestions, setSuggestions] = useState(null)

  const handleSubmitSearch = (event) => {
    event.preventDefault()

    if (search === taxon) {
      setShake(true)
    } else {
      setTaxon(search)
      setSuggestions(null)
    }

    // Remove shake class after animation finishes
    setTimeout(() => setShake(false), 500)
  }

  const handleSearchChange = async ({ target }) => {
    setSearch(target.value)
    target.value
      ? setSuggestions(await taxaService.fetchTaxaSuggestions(search))
      : setSuggestions(null)
  }

  return (
    <>
      <form className={`search-bar${shake ? ' shake' : ''}`} onSubmit={handleSubmitSearch} >
        <input type="text" value={search} name='Taxon' autoComplete='off' onChange={handleSearchChange} />
        <button type="submit">Search</button>
        {isFetchingData && <LoadingIcon />}
        <ul className='suggestions'>
        {suggestions && suggestions.map(suggestion => 
          <li className='suggestion' key={suggestion.id}>
            <img src={suggestion.default_photo.square_url} alt={suggestion.preferred_common_name} />
            <div className='suggestion-info'>
              <div>{suggestion.preferred_common_name}</div>
              <div>{suggestion.rank} {suggestion.name}</div>
            </div>
          </li>
        )}
      </ul>
      </form>
    </>
  )
}

export default SearchBar