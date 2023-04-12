import { useState, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { UserContext } from '../context/UserContext'
import userService from '../services/userService'

import Searchbar from './Searchbar'
import { ReactComponent as Logo } from '../assets/logo.svg'
import styles from './Navbar.module.css'
import NavbarDropdown from './NavbarDropdown'

const Navbar = () => {
  const { user, setUser } = useContext(UserContext)
  const location = useLocation()
  const navigate = useNavigate()

  const [menuActive, setMenuActive] = useState(false)
  const [searchBarFocused, setSearchBarFocused] = useState(false)

  const handleLogOut = () => {
    setUser(null)
    setMenuActive(false)
    window.localStorage.clear()
    userService.logOut()
    navigate('/')
  }

  return (
    <header>
      <nav className={searchBarFocused ? `${styles.Navbar} ${styles['Navbar--hide']}` : `${styles.Navbar}`}>
        <Link className={styles.Navbar__logo} to='/'>
          <Logo />
        </Link>
        <Searchbar setSearchBarFocused={setSearchBarFocused} user={user} />
        {user
          ? <div className={styles.Navbar__profileContainer}>
              <button
                className={searchBarFocused ? `${styles.Navbar__profile} ${styles['Navbar__profile--hide']}` : `${styles.Navbar__profile}`}
                onFocus={() => setMenuActive(true)}
                onBlur={() => setMenuActive(false)}
              >
                {user.username.charAt(0).toUpperCase()}
              </button>
            </div>
          : <div className={searchBarFocused ? `${styles.Navbar__linksContainer} ${styles['Navbar__linksContainer--hide']}` : `${styles.Navbar__linksContainer}`}>
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
            </div>
        }
        </nav>
        {menuActive &&
          <NavbarDropdown user={user} handleLogOut={handleLogOut}/>
        }
    </header>
  )
}

export default Navbar