import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { useContext } from 'react'
import { UserContext } from '../utils/UserContext'

import SearchBar from './SearchBar'

const Navbar = () => {
  const { user, setUser } = useContext(UserContext)
  const location = useLocation()
  const navigate = useNavigate()

  const [menuActive, setMenuActive] = useState(false)

  const handleNavigateToProfile = () => {
    navigate('/profile')
  }

  const handleLogOut = () => {
    setUser(null)
    window.localStorage.clear()
    navigate('/')
  }

  return (
    <>
      <SearchBar />
      {user
        ? <div className='navbar-profile'>
            <button onFocus={() => setMenuActive(true)} onBlur={() => setMenuActive(false)}>
              {user.username.charAt(0).toUpperCase()}
            </button>
            {menuActive
              ? <div className='navbar-profile-dropdown'>
                  <div className='navbar-profile-dropdown-username'>
                    <div>
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      {user.username}
                    </div>
                  </div>
                  <div className='navbar-profile-dropdown-option'>
                    <Link className='navbar-profile-dropdown-option-link' to='/profile' onMouseDown={handleNavigateToProfile}>My species sets</Link>
                  </div>
                  <div className='navbar-profile-dropdown-option'>
                    <Link className='navbar-profile-dropdown-option-link' to='/' onMouseDown={handleLogOut}>Log out</Link>
                  </div>
                </div>
              : <></>
            }
          </div>
        : <>
            <Link to='/login' className={`navbar-right-text ${location.pathname === '/login' ? 'active' : ''}`}>Log in</Link>
            <Link to='/signup' className={`navbar-right-text ${location.pathname === '/signup' ? 'active' : ''}`}>Sign up</Link>
          </>
      }
    </>
  )
}

export default Navbar