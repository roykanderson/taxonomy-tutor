import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { UserContext } from '../context/UserContext'
import userService from '../services/userService'

import Searchbar from './Searchbar'
import { ReactComponent as Logo } from '../assets/logo.svg'
import styles from './Navbar.module.css'
import NavbarDropdown from './NavbarDropdown'

const Navbar = () => {
  const { user, setUser } = useContext(UserContext)
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
          ? <div className={styles.Navbar__menuContainer}>
              <button
                className={searchBarFocused ? `${styles.Navbar__menuButton} ${styles['Navbar__menuButton--hide']}` : `${styles.Navbar__menuButton}`}
                onFocus={() => setMenuActive(true)}
                onBlur={() => setMenuActive(false)}
                onClick={({ target }) => target.focus()} // Ensure that focus event fires on mobile devices
              >
                {user.username.charAt(0).toUpperCase()}
              </button>
            </div>
          : <div className={styles.Navbar__menuContainer}>
              <button
                className={searchBarFocused ? `${styles.Navbar__menuButton} ${styles['Navbar__menuButton--hide']}` : `${styles.Navbar__menuButton}`}
                onFocus={() => setMenuActive(true)}
                onBlur={() => setMenuActive(false)}
                onClick={({ target }) => target.focus()} // Ensure that focus event fires on mobile devices
              >
                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect y="7.11108" width="19.5556" height="1.77778" fill="#333333"/>
                  <rect y="14.2222" width="19.5556" height="1.77778" fill="#333333"/>
                  <rect width="19.5556" height="1.77778" fill="#333333"/>
                </svg>
              </button>
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