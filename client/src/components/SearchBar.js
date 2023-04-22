import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import taxaService from '../services/taxaService'
import Suggestions from './Suggestions'

import { ReactComponent as SearchIcon } from '../assets/search-icon.svg'
import styles from './Searchbar.module.css'

const Searchbar = ({ setSearchBarFocused, user }) => {
  const controlRef = useRef(null)

  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState(null)
  const [focused, setFocused] = useState(null)

  const location = useLocation()

  // Set input to be blank when user searches or url
  useEffect(() => {
    if (!location.pathname.startsWith('/search')) {
      setInput('')
    }
  }, [location])

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    controlRef.current.blur()
    if (input) {
      setFocused(false)
      setSuggestions(null)
      navigate(`/search?q=${input}&page=1`)
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
        type='text'
        value={input}
        placeholder='Search for taxa...'
        onChange={handleInputChange}
        ref={controlRef}
      />
      <button
        className={suggestions?.length > 0 && focused 
          ? `${styles.Searchbar__submit} ${styles['Searchbar__submit--active']} ${styles['Searchbar__submit--mobile']}`
          : focused
            ? `${styles.Searchbar__submit} ${styles['Searchbar__submit--active']}`
            : `${styles.Searchbar__submit}`
        }
        type='submit'
      >
        <SearchIcon />
      </button>
      {focused &&
        <Suggestions suggestions={suggestions} setSuggestions={setSuggestions} setInput={setInput} user={user} />
      }
    </form>
  )
}

export default Searchbar