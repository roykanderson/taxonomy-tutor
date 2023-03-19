import { useState } from "react"
import { useLocation } from "react-router-dom"

import { useTaxa } from "../hooks"
import LoadingIcon from "./LoadingIcon"
import { getDefaultPhotoUrl, shuffleArrayAroundIndex } from "../utils/helpers"

const StudyCard = () => {
  const location = useLocation()
  const set = location.state
  set.idIndices = []

  set.taxonIds.forEach((id, index) => {
    set.idIndices[id] = index
  })

  const [index, setIndex] = useState(0)
  const [array, setArray] = useState(set.taxonIds)
  const [shuffle, setShuffle] = useState(false)
  const [reveal, setReveal] = useState(false)

  const { data, isFetching } = useTaxa(array)

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

  if (isFetching) {
    return (
      <LoadingIcon />
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
                  {data[index].preferred_common_name}
                </div>
                <div>
                  {data[index].name}
                </div>
              </div>
              <div className="study-card-content-info-text">
                {data[index].wikiSummary}
              </div>
              <button
                className="study-card-content-button"
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
        <img src={getDefaultPhotoUrl(data[index])} alt='Species to study' />
      </div>
    </div>
  )
}

export default StudyCard