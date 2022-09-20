import SearchBar from './SearchBar'

const Navbar = ({ search, setSearch, isFetchingData }) => {
  return (
    <>
      <SearchBar search={search} setSearch={setSearch} isFetchingData={isFetchingData} />
      <a href="" className='navbar-link'>Explore</a>
      <a href="" className='navbar-link'>Study</a>
      <a href="" className='navbar-link active'>Profile</a>
    </>
  )
}

export default Navbar