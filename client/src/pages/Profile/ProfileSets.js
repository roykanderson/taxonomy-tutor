import { Link } from 'react-router-dom'

import useSets from '../../hooks/useSets'
import LoadingIcon from "../../components/LoadingIcon"

import styles from './ProfileSets.module.css'

const ProfileSets = () => {
  const { data, isFetching, isError, error } = useSets()

  if (isFetching) {
    return (
      <LoadingIcon />
    )
  }

  else if (isError) {
    return (
      <div>
        {error}
      </div>
    )
  }

  else if (data.length === 0) {
    return (
      <div className={styles.ProfileSets__noSets}>
        It looks like you haven't created any study sets yet. Now's the perfect time to start!
      </div>
    )
  }

  return (
    <div className={styles.ProfileSets}>
      {
        data
          .sort((set1, set2) => new Date(set2.dateLastUpdated) - new Date(set1.dateLastUpdated)) // Sort sets by most recently updated
          .map(set => 
            <Link key={set.id} className={styles.ProfileSets__set} to={`/profile/${set.id}`}>
              <p className={styles.ProfileSets__name}>
                {set.name}
              </p>
              <p className={styles.ProfileSets__date}>
                {new Date(set.dateLastUpdated).toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className={styles.ProfileSets__numSpecies}>
                {set.numberOfTaxa} species
              </p>
            </Link>
          )
      }
    </div>
  )
}

export default ProfileSets