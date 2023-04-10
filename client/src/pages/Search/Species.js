import { useState, useContext } from "react"
import { useLocation } from "react-router-dom"

import { UserContext } from '../../context/UserContext'
import useWikiSummary from '../../hooks/useWikiSummary'
import getDefaultPhotoUrl from '../../utils/getDefaultPhotoUrl'
import LoadingIcon from "../../components/LoadingIcon"
import SpeciesModal from "./SpeciesModal"

import styles from './Species.module.css'

const Species = () => {
  const { user } = useContext(UserContext)

  const location = useLocation()
  const taxon = location.state
  
  const { data, isFetching } = useWikiSummary(taxon.wikipedia_url)

  const [showModal, setShowModal] = useState(false)

  return (
    <main className={styles.Species}>
      <section className={styles.Species__info}>
        <div>
          <section className={styles.Species__titleSection}>
            <div className={styles.Species__namesContainer}>
              <div className={styles.Species__commonName}>{taxon.preferred_common_name}</div>
              <div className={styles.Species__sciName}>{taxon.name}</div>
            </div>
            {user &&
              <button className={styles.Species__addButton} onClick={() => setShowModal(true)}>
                Add to set
              </button>
            }
          </section>
        </div>
        <div className={styles.Species__wiki}>
          {isFetching
            ? <LoadingIcon />
            : data
              ? <>
                  <div className={styles.Species__wikiDescription}>{data}</div>
                  <div className={styles.Species__wikiCitation}>Information from <a href={taxon.wikipedia_url}>Wikipedia</a></div>
                </>
              : <>No Wikipedia information available.</>
          }
        </div>
      </section>
      {getDefaultPhotoUrl(taxon)
        ? <img className={styles.Species__image} src={getDefaultPhotoUrl(taxon)} alt="species" />
        : <div className={styles.Species__noImage}>No image available.</div>
      }
      {showModal &&
        <SpeciesModal setShowModal={setShowModal} taxon={taxon} />
      }
    </main>
  )
}

export default Species