import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { UserContext } from '../context/UserContext'
import userService from '../services/userService'

import Searchbar from './Searchbar'
import { ReactComponent as Logo } from '../assets/logo.svg'
import { ReactComponent as HamburgerMenu } from '../assets/hamburger-menu.svg'
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
                onClick={() => this.focus()}
                onFocus={() => setMenuActive(true)}
                onBlur={() => setMenuActive(false)}
              >
                {user.username.charAt(0).toUpperCase()}
              </button>
            </div>
          : <div className={styles.Navbar__menuContainer}>
              <button
                className={searchBarFocused ? `${styles.Navbar__menuButton} ${styles['Navbar__menuButton--hide']}` : `${styles.Navbar__menuButton}`}
                onClick={() => this.focus()}
                onFocus={() => setMenuActive(true)}
                onBlur={() => setMenuActive(false)}
              >
                <HamburgerMenu />
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