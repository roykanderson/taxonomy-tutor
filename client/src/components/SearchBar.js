import { useState } from 'react'
import LoadingIcon from './LoadingIcon'

const SearchBar = ({ taxon, setTaxon, isFetchingData }) => {
  const [search, setSearch] = useState('')
  const [shake, setShake] = useState(false)

  const handleSubmitSearch = (event) => {
    event.preventDefault()

    search === taxon
      ? setShake(true)
      : setTaxon(search)

    // Remove shake class after animation finishes
    setTimeout(() => setShake(false), 500)
  }

  const handleSearchChange = ({ target }) => {
    setSearch(target.value)
  }

  return (
    <>
      <form className={`search-bar${shake ? ' shake' : ''}`} onSubmit={handleSubmitSearch} >
        <input type="text" value={search} name='Taxon' onChange={handleSearchChange} />
        <button type="submit">Search</button>
        {isFetchingData && <LoadingIcon />}
      </form>
    </>
  )
}

export default SearchBar