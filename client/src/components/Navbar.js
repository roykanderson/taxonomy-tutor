import { Link } from 'react-router-dom'

import SearchBar from './SearchBar'

const Navbar = () => {
  return (
    <>
      <SearchBar />
      <Link to='/profile' className='navbar-profile'>Profile</Link>
    </>
  )
}

export default Navbar