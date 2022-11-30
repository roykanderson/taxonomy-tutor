import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import { useContext } from 'react'
import { UserContext } from '../utils/UserContext'

import SearchBar from './SearchBar'

const Navbar = () => {
  const { user } = useContext(UserContext)
  const location = useLocation()

  return (
    <>
      <SearchBar />
      {user
        ? <Link to='/profile' className={`navbar-right-text ${location.pathname === '/profile' ? 'active' : ''}`}>Profile</Link>
        : <>
            <Link to='/login' className={`navbar-right-text ${location.pathname === '/login' ? 'active' : ''}`}>Log in</Link>
            <Link to='/signup' className={`navbar-right-text ${location.pathname === '/signup' ? 'active' : ''}`}>Sign up</Link>
          </>
      }
    </>
  )
}

export default Navbar