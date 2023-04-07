import { useState, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { UserContext } from '../context/UserContext'
import userService from '../services/userService'

import Searchbar from './Searchbar'
import { ReactComponent as Logo } from '../assets/logo.svg'
import styles from './styles/Navbar.module.css'
import NavbarDropdown from './NavbarDropdown'

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
    setMenuActive(false)
    window.localStorage.clear()
    userService.logOut()
    navigate('/')
  }

  return (
    <header>
      <nav className={styles.Navbar}>
        <Link to='/'>
          <Logo />
        </Link>
        <Searchbar />
        {user
          ? <button
              className={styles.Navbar__profile}
              onFocus={() => setMenuActive(true)}
              onBlur={() => setMenuActive(false)}
            >
              {user.username.charAt(0).toUpperCase()}
              {menuActive
                ? <NavbarDropdown user={user} handleNavigateToProfile={handleNavigateToProfile} handleLogOut={handleLogOut}/>
                : <></>
              }
            </button>
          : <>
              <Link
                to='/login'
                className={`${styles.Navbar__link} ${location.pathname === '/login' ? styles['Navbar__link--active'] : ''}`}
              >
                Log in
              </Link>
              <Link
                to='/signup'
                className={`${styles.Navbar__link} ${location.pathname === '/signup' ? styles['Navbar__link--active'] : ''}`}
              >
                Sign up
              </Link>
            </>
        }
        </nav>
    </header>
  )
}

export default Navbar