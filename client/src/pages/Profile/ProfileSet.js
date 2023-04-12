import { useLocation, Link, Outlet } from "react-router-dom"
import { useContext } from "react"

import { UserContext } from '../../context/UserContext'
import useSet from '../../hooks/useSet'
import useTaxa from '../../hooks/useTaxa'
import extractSetIdFromPathname from '../../utils/extractSetIdFromPathname'

import LoadingIcon from "../../components/LoadingIcon"

import styles from './ProfileSet.module.css'

const ProfileSet = () => {
  const { user } = useContext(UserContext)
  const location = useLocation()
  const setId = extractSetIdFromPathname(location.pathname)
  const { data: set, isFetching: isFetchingSet } = useSet(setId)
  const taxonIds = set?.taxonIds
  const { data: taxa, isFetching: isFetchingTaxa } = useTaxa(taxonIds)

  if (isFetchingSet || isFetchingTaxa) {
    return (
      <LoadingIcon />
    )
  }

  return (
    <div className={styles.ProfileSet}>
      <div className={styles.ProfileSet__topSection}>
        <div className={styles.ProfileSet__usernameTitle}>
          <Link className={styles.ProfileSet__backLink} to='/profile'>
            {user.username}
          </Link>
          <span className={styles.ProfileSet__slash}>
            /
          </span>
          {set.name}
        </div>
        <div className={styles.ProfileSet__date}>
          Last updated {new Date(set.dateLastUpdated).toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div className={styles.ProfileSet__options}>
        <button className={location.pathname === `/profile/${set.id}` ? `${styles.ProfileSet__button} ${styles['ProfileSet__button--active']}` : `${styles.ProfileSet__button}`}>
          <Link className={styles.ProfileSet__optionLink} to=''>
            Study
          </Link>
        </button>
        <button className={location.pathname === `/profile/${set.id}/edit` ? `${styles.ProfileSet__button} ${styles['ProfileSet__button--active']}` : `${styles.ProfileSet__button}`}>
          <Link className={styles.ProfileSet__optionLink} to='edit'>
            Edit
          </Link>
        </button>
      </div>

      <Outlet context={{ set, taxa }} />
    </div>
  )
}

export default ProfileSet