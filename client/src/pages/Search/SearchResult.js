import { Link } from 'react-router-dom'

import getDefaultPhotoUrl from '../../utils/getDefaultPhotoUrl'

import styles from './SearchResult.module.css'

// FIX Ursidae error when searching for bears with photoURL

const SearchResult = ({ taxon }) => {
  return (
    <Link to={`/search/${taxon.id}`} state={taxon} className={styles.SearchResult}>
      {taxon.default_photo
        ? <img className={styles.SearchResult__image} src={getDefaultPhotoUrl(taxon)} alt="" />
        : <div className={styles.SearchResult__noImage}>No image available.</div>
      }
      <div className={styles.SearchResult__namesContainer}>
        <p className={styles.SearchResult__commonName}>{taxon.preferred_common_name ? taxon.preferred_common_name : taxon.name}</p>
        <p className={styles.SearchResult__sciName}>{taxon.name}</p>
      </div>
    </Link>
  )
}

export default SearchResult