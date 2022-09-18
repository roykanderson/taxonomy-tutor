import SearchBar from './SearchBar'

const Navbar = ({ search, setSearch, isFetchingData }) => {
  return (
    <>
      <SearchBar search={search} setSearch={setSearch} isFetchingData={isFetchingData} />
    </>
  )
}

export default Navbar