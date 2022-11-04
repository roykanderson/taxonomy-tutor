import { Link } from 'react-router-dom'

import SearchBar from './SearchBar'

const Navbar = ({ search, setSearch, isLoading }) => {
  return (
    <>
      <SearchBar search={search} setSearch={setSearch} />
      <Link to='/profile' className='navbar-profile'>Profile</Link>
    </>
  )
}

export default Navbar