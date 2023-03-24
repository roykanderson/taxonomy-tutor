import { useState } from "react"

import { getDefaultPhotoUrl, shuffleArrayAroundIndex } from "../utils/helpers"

const StudyCardContent = ({ data, set }) => {
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
                  {data[set.idIndices[array[index]]].preferred_common_name}
                </div>
                <div>
                  {data[set.idIndices[array[index]]].name}
                </div>
              </div>
              <div className="study-card-content-info-text">
                {data[set.idIndices[array[index]]].wikiSummary}
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
        <img src={getDefaultPhotoUrl(data[set.idIndices[array[index]]])} alt='Species to study' />
      </div>
    </div>
  )
}

export default StudyCardContent