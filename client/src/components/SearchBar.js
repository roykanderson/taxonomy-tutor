import { useState, useEffect, useRef } from 'react'

// TODO: SET UP CLICKING SUGGESTION TRIGGERING SEARCH
// TODO: SUGGESTIONS AND SEARCH WITHOUT CALLING API MULTIPLE TIMES

import LoadingIcon from './LoadingIcon'
import taxaService from '../services/taxaService'
import DropdownSuggestions from './DropdownSuggestions'

const SearchBar = ({ taxon, setTaxon, isFetchingData }) => {
  const [search, setSearch] = useState('')
  const [shake, setShake] = useState(false)
  const [suggestions, setSuggestions] = useState(null)

  const useOutsideToggler = (ref) => {
    useEffect(() => {
      // Set suggestions to null if clicked outside dropdown to hide menu
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setSearch('')
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

    if (search === taxon) {
      setShake(true)
    } else {
      setTaxon(search)
      setSearch('')
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
    <form ref={wrapperRef} className={`search-bar${shake ? ' shake' : ''}`} onSubmit={handleSubmitSearch} >
      <input type="text" value={search} name='Taxon' autoComplete='off' onChange={handleSearchChange} />
      <button type="submit">Search</button>
      {isFetchingData && <LoadingIcon />}
      <DropdownSuggestions suggestions={suggestions} setTaxon={setTaxon} setSearch={setSearch} setSuggestions={setSuggestions} />
    </form>
  )
}

export default SearchBar