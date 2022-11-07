import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'

// TODO: SET UP CLICKING SUGGESTION TRIGGERING SEARCH
// TODO: SUGGESTIONS AND SEARCH WITHOUT CALLING API MULTIPLE TIMES

import { ReactComponent as SearchIcon } from '../assets/search-icon.svg'

import taxaService from '../services/taxaService'
import DropdownSuggestions from './DropdownSuggestions'

const SearchBar = () => {
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState(null)
  const [focused, setFocused] = useState(null)

  const location = useLocation()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    location.pathname === '/search'
      ? setInput(searchParams.get('q'))
      : setInput('')
  }, [location, searchParams])

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate(`/search?q=${input}`)
  }

  const handleInputChange = async ({ target }) => {
    setInput(target.value)
    target.value
      ? setSuggestions(await taxaService.fetchTaxaSuggestions(input))
      : setSuggestions(null)
  }

  const onFocus = () => {
    setFocused(true)
  }

  const onBlur = () => {
    setTimeout(setFocused(false), 5000)
  }

  return (
    <form className='search-bar' onSubmit={handleSubmit} onFocus={onFocus} onBlur={onBlur} >
      <input type='text' value={input} onChange={handleInputChange} />
      <button type='submit'>
        <SearchIcon />
      </button>
      {focused && <DropdownSuggestions suggestions={suggestions} setSuggestions={setSuggestions} setInput={setInput} />}
    </form>
  )
}

export default SearchBar