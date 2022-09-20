import { useState, useEffect, useRef } from 'react'

// TODO: SET UP CLICKING SUGGESTION TRIGGERING SEARCH
// TODO: SUGGESTIONS AND SEARCH WITHOUT CALLING API MULTIPLE TIMES

import { ReactComponent as SearchIcon } from '../assets/search-icon.svg'

import LoadingIcon from './LoadingIcon'
import taxaService from '../services/taxaService'
import DropdownSuggestions from './DropdownSuggestions'

const SearchBar = ({ search, setSearch, isFetchingData }) => {
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState(null)
  const [shake, setShake] = useState(false)

  const useOutsideToggler = (ref) => {
    useEffect(() => {
      // Hide suggestions if click happens outside dropdown menu by setting suggestions to null
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setInput('')
          setSuggestions(null)
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [ref])
  }

  const wrapperRef = useRef(null)
  useOutsideToggler(wrapperRef)

  const handleSubmitSearch = (event) => {
    event.preventDefault()

    if (input === search) {
      setShake(true)
    } else {
      setSearch(input)
      setInput('')
      setSuggestions(null)
    }

    // Remove shake class after animation finishes
    setTimeout(() => setShake(false), 500)
  }

  const handleInputChange = async ({ target }) => {
    setInput(target.value)
    target.value
      ? setSuggestions(await taxaService.fetchTaxaSuggestions(input))
      : setSuggestions(null)
  }

  return (
    <form ref={wrapperRef} className={`search-bar${shake ? ' shake' : ''}`} onSubmit={handleSubmitSearch} >
      <input type="text" value={input} name='Taxon' autoComplete='off' onChange={handleInputChange} />
      <button type="submit">
        {isFetchingData
          ? <LoadingIcon />
          : <SearchIcon />
        }
      </button>
      <DropdownSuggestions suggestions={suggestions} setSuggestions={setSuggestions} setInput={setInput} setSearch={setSearch} />
    </form>
  )
}

export default SearchBar