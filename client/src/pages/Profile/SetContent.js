import { useState } from "react"
import { useOutletContext } from "react-router-dom"

import getDefaultPhotoUrl from '../../utils/getDefaultPhotoUrl'
import shuffleArrayAroundIndex from '../../utils/shuffleArrayAroundIndex'

import styles from './SetContent.module.css'

const SetContent = () => {
  const { set, taxa } = useOutletContext()

  set.idIndices = []

  set.taxonIds.forEach((id, index) => {
    set.idIndices[id] = index
  })

  const [index, setIndex] = useState(0)
  const [array, setArray] = useState(set.taxonIds)
  const [shuffle, setShuffle] = useState(false)
  const [reveal, setReveal] = useState(false)

  const handleLeftClick = () => {
    if (index !== 0) {
      setIndex(index - 1)
    }
    setReveal(false)
  }

  const handleRightClick = () => {
    if (index !== set.taxonIds.length - 1) {
      setIndex(index + 1)
    }
    setReveal(false)
  }

  const handleShuffle = () => {
    if (!shuffle) {
      setArray(shuffleArrayAroundIndex(set.taxonIds.slice(), index))
      setShuffle(true)
    }
    else {
      setIndex(set.taxonIds.indexOf(array[index]))
      setArray(set.taxonIds)
      setShuffle(false)
    }
  }

  if (taxa.length === 0) {
    return (
      <div className={styles.SetContentNoSpecies}>
        Looks like this study set is empty! Click the "Edit" button to add species.
      </div>
    )
  }

  return (
    <div className={styles.SetContent}>
      <div className={styles.SetContent__banner}>
        {set.numberOfTaxa > 1 &&
          <div className={`${styles.SetContent__bannerBox} ${styles['SetContent__bannerBox--left']}`}>
            <button
              className={shuffle ? `${styles.SetContent__bannerButton} ${styles.SetContent__shuffleButton} ${styles['SetContent__shuffleButton--active']}` : `${styles.SetContent__bannerButton} ${styles.SetContent__shuffleButton}`}
              onClick={handleShuffle}
            >
              Shuffle: {shuffle ? 'on' : 'off'}
            </button>
          </div>
        }
        {set.numberOfTaxa > 1 &&
          <div className={`${styles.SetContent__bannerBox} ${styles['SetContent__bannerBox--center']}`}>
            <button
              onClick={handleLeftClick}
              className={index === 0 ? `${styles.SetContent__bannerButton} ${styles.SetContent__bannerArrow}` : `${styles.SetContent__bannerButton} ${styles.SetContent__bannerArrow} ${styles['SetContent__bannerArrow--active']}`}
            >
              {'<'}
            </button>
            <button
              onClick={handleRightClick}
              className={index === (set.taxonIds.length - 1) ? `${styles.SetContent__bannerButton} ${styles.SetContent__bannerArrow}` : `${styles.SetContent__bannerButton} ${styles.SetContent__bannerArrow} ${styles['SetContent__bannerArrow--active']}`}
            >
              {'>'}
            </button>
          </div>
        }
        <div className={`${styles.SetContent__bannerBox} ${styles['SetContent__bannerBox--right']}`}>
          Species {set.idIndices[array[index]] + 1} of {set.numberOfTaxa}
        </div>
      </div>
      <div className={styles.SetContent__main}>
        {reveal
          ? <div className={styles.SetContent__textContainer}>
              <div className={styles.SetContent__names}>
                <div className={styles.SetContent__commonName}>
                  {taxa[set.idIndices[array[index]]].preferred_common_name
                    ? taxa[set.idIndices[array[index]]].preferred_common_name
                    : taxa[set.idIndices[array[index]]].name
                  }
                </div>
                <div className={styles.SetContent__sciName}>
                  {taxa[set.idIndices[array[index]]].name}
                </div>
              </div>
              <div className={styles.SetContent__wikiText}>
                {taxa[set.idIndices[array[index]]].wikiSummary
                  ? taxa[set.idIndices[array[index]]].wikiSummary
                  : <>No Wikipedia information available.</>
                }
              </div>
              <button
                className={`${styles.SetContent__button} ${styles['SetContent__button--hide']}`}
                onClick={() => setReveal(false)}
              >
                Hide species information
              </button>
            </div>
          : <button
              className={styles.SetContent__button}
              onClick={() => setReveal(true)}
            >
              Reveal species information
            </button>
        }
        {getDefaultPhotoUrl(taxa[set.idIndices[array[index]]])
          ? <img className={styles.SetContent__image} src={getDefaultPhotoUrl(taxa[set.idIndices[array[index]]])} alt='Species to study' />
          : <div className={styles.SetContent__noImage}>No image available.</div>
        }
      </div>
    </div>
  )
}

export default SetContent