import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

import { useField } from '../hooks'

// TODO: SET UP CLICKING SUGGESTION TRIGGERING SEARCH
// TODO: SUGGESTIONS AND SEARCH WITHOUT CALLING API MULTIPLE TIMES

import { ReactComponent as SearchIcon } from '../assets/search-icon.svg'

import LoadingIcon from './LoadingIcon'
import taxaService from '../services/taxaService'
import DropdownSuggestions from './DropdownSuggestions'

const SearchBar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // const previousSearch = useParams()
  const [search, setSearch] = useState('')

  const [suggestions, setSuggestions] = useState(null)
  const [shake, setShake] = useState(false)

  
  useEffect(() => {
    if (location.pathname !== '/search') {
      setSearch('')
    }
  }, [location])

  /*
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
` */

  const handleSearch = (event) => {
    event.preventDefault()
    navigate(`/search?q=${search}`)
    /*
    if (search === previousSearch) {
      setShake(true)
    } else {
      navigate(`/species?search=${search}`)
      setSuggestions(null)
    }
    */
    // Remove shake class after animation finishes
    // setTimeout(() => setShake(false), 500)
  }

  const handleInputChange = (event) => {
    setSearch(event.target.value)
  }

  /*
  const handleSearchChange = async ({ target }) => {
    setSearch(target.value)
    target.value
      ? setSuggestions(await taxaService.fetchTaxaSuggestions(search))
      : setSuggestions(null)
  }
  /*

  /*
  return (
    <form ref={wrapperRef} className={`search-bar${shake ? ' shake' : ''}`} onSubmit={handleSearch} >
      <input type='text' value={search} onChange={handleSearchChange} name='Taxon' autoComplete='off' />
      <button type="submit">
        {isLoading
          ? <LoadingIcon />
          : <SearchIcon />
        }
      </button>
      <DropdownSuggestions suggestions={suggestions} setSuggestions={setSuggestions} setInput={search} setSearch={search} />
    </form>
  )
  */
 
 return (
  <form className='search-bar' onSubmit={handleSearch}>
    <input type='text' value={search} onChange={handleInputChange} />
    <button type='submit'>
      <SearchIcon />
    </button>
    <DropdownSuggestions suggestions={suggestions} setSuggestions={setSuggestions} />
  </form>
 )
}

export default SearchBar