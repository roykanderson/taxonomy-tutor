import { Link } from 'react-router-dom'

import styles from './styles/NavbarDropdown.module.css'

const NavbarDropdown = ({ user, handleNavigateToProfile, handleLogOut }) => {
  return (
    <div className={styles.NavbarDropdown}>
      <div className={styles.NavbarDropdown__userContainer}>
        <div className={styles.NavbarDropdown__userIcon}>
          {user.username.charAt(0).toUpperCase()}
        </div>
        <div className={styles.NavbarDropdown__username}>
          {user.username}
        </div>
      </div>
      <div className={styles.NavbarDropdown__linkContainer}>
        <Link className={styles.NavbarDropdown__link} to='/profile' onMouseDown={handleNavigateToProfile}>My species sets</Link>
      </div>
      <div className={styles.NavbarDropdown__linkContainer}>
        <Link className={styles.NavbarDropdown__link} to='/' onMouseDown={handleLogOut}>Log out</Link>
      </div>
    </div>
  )
}

export default NavbarDropdown