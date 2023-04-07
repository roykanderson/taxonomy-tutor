import { useState } from "react"
import { useOutletContext } from "react-router-dom"

import getDefaultPhotoUrl from '../../../utils/getDefaultPhotoUrl'
import shuffleArrayAroundIndex from '../../../utils/shuffleArrayAroundIndex'

const StudyCardContent = () => {
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
      <div className="study-card-nospecies">
        Looks like this study set is empty! Click the "Edit" button to add species.
      </div>
    )
  }

  return (
    <div className="study-card">
      <div className="study-card-banner">
        {set.numberOfTaxa > 1 &&
          <div className="study-card-banner-box shuffle">
            <button
              className={shuffle ? "study-card-banner-box-shuffle active" : "study-card-banner-box-shuffle"}
              onClick={handleShuffle}
            >
              Shuffle: {shuffle ? 'on' : 'off'}
            </button>
          </div>
        }
        {set.numberOfTaxa > 1 &&
          <div className="study-card-banner-box arrows">
            <button
              onClick={handleLeftClick}
              className={index === 0 ? 'study-card-banner-box-arrow' : 'study-card-banner-box-arrow active'}
            >
              {'<'}
            </button>
            <button
              onClick={handleRightClick}
              className={index === (set.taxonIds.length - 1) ? 'study-card-banner-box-arrow' : 'study-card-banner-box-arrow active'}
            >
              {'>'}
            </button>
          </div>
        }
        <div className="study-card-banner-box species">
          Species {set.idIndices[array[index]] + 1} of {set.numberOfTaxa}
        </div>
      </div>
      <div className="study-card-content">
        {reveal
          ? <div className="study-card-content-info">
              <div className="study-card-content-info-names">
                <div>
                  {taxa[set.idIndices[array[index]]].preferred_common_name
                    ? taxa[set.idIndices[array[index]]].preferred_common_name
                    : taxa[set.idIndices[array[index]]].name
                  }
                </div>
                <div>
                  {taxa[set.idIndices[array[index]]].name}
                </div>
              </div>
              <div className="study-card-content-info-text">
                {taxa[set.idIndices[array[index]]].wikiSummary
                  ? taxa[set.idIndices[array[index]]].wikiSummary
                  : <>No Wikipedia information available.</>
                }
              </div>
              <button
                className="study-card-content-button hide"
                onClick={() => setReveal(false)}
              >
                Hide species information
              </button>
            </div>
          : <button
              className="study-card-content-button"
              onClick={() => setReveal(true)}
            >
              Reveal species information
            </button>
        }
        {getDefaultPhotoUrl(taxa[set.idIndices[array[index]]])
          ? <img src={getDefaultPhotoUrl(taxa[set.idIndices[array[index]]])} alt='Species to study' />
          : <div className="study-card-noimage">No image available.</div>
        }
      </div>
    </div>
  )
}

export default StudyCardContent