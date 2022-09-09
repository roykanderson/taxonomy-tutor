import { useState } from 'react'

const SearchBar = ({ setTaxon }) => {
  const [search, setSearch] = useState('')

  const handleSubmitSearch = (event) => {
    event.preventDefault()
    setTaxon(search)
  }

  const handleSearchChange = ({ target }) => {
    setSearch(target.value)
  }

  return (
    <form className="search-bar" onSubmit={handleSubmitSearch}>
      <input type="text" value={search} name='Taxon' onChange={handleSearchChange} />
      <button type="submit">Search</button>
    </form>
  )
}

export default SearchBar