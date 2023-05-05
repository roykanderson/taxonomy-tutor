import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { Link, Outlet, useLocation } from 'react-router-dom'

import styles from './Profile.module.css'

const Profile = () => {
  const { user } = useContext(UserContext)

  const location = useLocation()

  return (
    <main className={styles.Profile}>
      <div className={styles.Profile__banner}>
        <div className={styles.Profile__icon}>
          {user.username.charAt(0).toUpperCase()}
        </div>
        <div className={styles.Profile__username}>
          {user.username}
        </div>
      </div>
      <div className={styles.Profile__options}>
        <button className={location.pathname === '/profile' ? `${styles.Profile__button} ${styles['Profile__button--active']}` : `${styles.Profile__button}`}>
          <Link className={styles.Profile__link} to=''>
            My flashcard sets
          </Link>
        </button>
        <button className={location.pathname === '/profile/create' ? `${styles.Profile__button} ${styles['Profile__button--active']}` : `${styles.Profile__button}`}>
          <Link className={styles.Profile__link} to='create'>
            Create new set
          </Link>
        </button>
      </div>
      <Outlet />
    </main>
  )
}

export default Profile