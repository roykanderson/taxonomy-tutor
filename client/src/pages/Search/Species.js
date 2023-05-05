import { useState, useContext } from "react"
import { useLocation } from "react-router-dom"

import { UserContext } from '../../context/UserContext'
import useWikiSummary from '../../hooks/useWikiSummary'
import getDefaultPhotoUrl from '../../utils/getDefaultPhotoUrl'
import LoadingIcon from "../../components/LoadingIcon"
import SpeciesModal from "./SpeciesModal"

import styles from './Species.module.css'
import useTaxa from "../../hooks/useTaxa"
import toTitleCase from "../../utils/toTitleCase"
import firstCharToUpper from "../../utils/firstCharToUpper"

const Species = () => {
  const { user } = useContext(UserContext)

  const location = useLocation()
  const taxonId = Number(location.pathname.split('/').pop())
  const { data: taxa, isFetching: isFetchingTaxon } = useTaxa([taxonId])
  const taxon = taxa ? taxa[0] : null
  const { data: wikiText, isFetching: isFetchingWikiText } = useWikiSummary(taxon?.wikipedia_url)

  const [showModal, setShowModal] = useState(false)

  if (isFetchingTaxon || isFetchingWikiText) {
    return (
      <main className={styles.Species}>
        <LoadingIcon />
      </main>
    )
  }

  return (
    <main className={styles.Species}>
      <section className={styles.Species__flexContainer}>
        <section className={styles.Species__info}>
          <div>
            <section className={styles.Species__titleSection}>
              <div className={styles.Species__namesContainer}>
                <div className={styles.Species__commonName}>
                  {taxon.preferred_common_name
                    ? toTitleCase(taxon.preferred_common_name)
                    : firstCharToUpper(taxon.name)
                  }
                </div>
                <div className={styles.Species__sciName}>
                  {firstCharToUpper(taxon.name)}
                </div>
              </div>
              {user
                ? <button className={styles.Species__addButton} onClick={() => setShowModal(true)}>
                    Add to set
                  </button>
                : <button className={`${styles.Species__addButton} ${styles['Species__addButton--disabled']}`} disabled>
                    Log in to add to set
                  </button>
              }
            </section>
          </div>
          <div className={styles.Species__wiki}>
            {wikiText
              ? <>
                  <div className={styles.Species__wikiDescription}>{wikiText}</div>
                  <div className={styles.Species__wikiCitation}>Information from <a href={taxon.wikipedia_url} target="_blank" rel="noopener noreferrer">Wikipedia</a></div>
                </>
              : 'No Wikipedia information available.'
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
      </section>
    </main>
  )
}

export default Species