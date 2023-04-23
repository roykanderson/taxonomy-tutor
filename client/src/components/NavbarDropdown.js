import { Link, useNavigate } from 'react-router-dom'

import styles from './NavbarDropdown.module.css'

const NavbarDropdown = ({ user, handleLogOut }) => {
  const navigate = useNavigate()

  if (!user) {
    return (
      <div className={styles.NavbarDropdown}>
        <div className={`${styles.NavbarDropdown__linkContainer} ${styles['NavbarDropdown__linkContainer--noTopBorder']}`}>
          <Link className={styles.NavbarDropdown__link} to='/' onMouseDown={() => navigate('/')}>Home</Link>
        </div>
        <div className={styles.NavbarDropdown__linkContainer}>
          <Link className={styles.NavbarDropdown__link} to='/signup' onMouseDown={() => navigate('/signup')}>Create an account</Link>
        </div>
        <div className={styles.NavbarDropdown__linkContainer}>
          <Link className={styles.NavbarDropdown__link} to='/login' onMouseDown={() => navigate('/login')}>Log in</Link>
        </div>
      </div>
    )
  }

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
        <Link className={styles.NavbarDropdown__link} to='/' onMouseDown={() => navigate('/')}>Home</Link>
      </div>
      <div className={styles.NavbarDropdown__linkContainer}>
        <Link className={styles.NavbarDropdown__link} to='/profile' onMouseDown={() => navigate('/profile')}>My flashcard sets</Link>
      </div>
      <div className={styles.NavbarDropdown__linkContainer}>
        <Link className={styles.NavbarDropdown__link} to='/' onMouseDown={handleLogOut}>Log out</Link>
      </div>
    </div>
  )
}

export default NavbarDropdown