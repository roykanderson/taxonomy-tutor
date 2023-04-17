import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'

import taxaService from '../services/taxaService'
import Suggestions from './Suggestions'

import { ReactComponent as SearchIcon } from '../assets/search-icon.svg'
import styles from './Searchbar.module.css'

const Searchbar = ({ setSearchBarFocused, user }) => {
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
    if (input) {
      setFocused(false)
      setSuggestions(null)
      navigate(`/search?q=${input}`)
    }
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
    setSearchBarFocused(true)
    setSuggestions(await taxaService.fetchTaxaSuggestions(input))
  }

  const onBlur = () => {
    setSearchBarFocused(false)
    setTimeout(setFocused(false), 5000)
  }

  return (
    <form className={styles.Searchbar} onSubmit={handleSubmit} onFocus={onFocus} onBlur={onBlur} >
      <input
        className={styles.Searchbar__input}
        type='search'
        value={input}
        placeholder='Search for taxa...'
        onChange={handleInputChange} />
      <button className={styles.Searchbar__submit} type='submit'>
        <SearchIcon />
      </button>
      {focused &&
        <Suggestions suggestions={suggestions} setSuggestions={setSuggestions} setInput={setInput} user={user} />
      }
    </form>
  )
}

export default Searchbar