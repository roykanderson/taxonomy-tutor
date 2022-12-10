import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'

import taxaService from '../services/taxaService'
import DropdownSuggestions from './DropdownSuggestions'

import { ReactComponent as SearchIcon } from '../assets/search-icon.svg'

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
    setFocused(false)
    setSuggestions(null)
    navigate(`/search?q=${input}`)
  }

  const handleInputChange = async ({ target }) => {
    setFocused(true)
    setInput(target.value)
    target.value
      ? setSuggestions(await taxaService.fetchTaxaSuggestions(target.value))
      : setSuggestions(null)
  }

  const onFocus = async () => {
    setFocused(true)
    setSuggestions(await taxaService.fetchTaxaSuggestions(input))
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
      {focused &&
        <DropdownSuggestions suggestions={suggestions} setSuggestions={setSuggestions} setInput={setInput} />}
    </form>
  )
}

export default SearchBar