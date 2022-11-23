import { Link } from 'react-router-dom'

import { useContext } from 'react'
import { UserContext } from '../utils/UserContext'

import SearchBar from './SearchBar'

const Navbar = () => {
  const { user } = useContext(UserContext)

  return (
    <>
      <SearchBar />
      {user
        ? <Link to='/profile' className='navbar-right-text'>Profile</Link>
        : <>
            <Link to='/login' className='navbar-right-text'>Log in</Link>
            <Link to='/signup' className='navbar-right-text'>Sign up</Link>
          </>
      }
    </>
  )
}

export default Navbar