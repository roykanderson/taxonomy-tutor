import { useState } from "react"
import { useLocation } from "react-router-dom"

import { useTaxa } from "../hooks"
import LoadingIcon from "./LoadingIcon"
import { getDefaultPhotoUrl } from "../utils/helpers"

const StudyCard = () => {
  const location = useLocation()
  const set = location.state

  const { data, isFetching } = useTaxa(set.taxonIds)

  const [index, setIndex] = useState(0)
  const [shuffle, setShuffle] = useState(false)
  const [reveal, setReveal] = useState(false)

  const handleLeftClick = () => {
    if (index !== 0) {
      setIndex(index - 1)
    }
  }

  const handleRightClick = () => {
    if (index !== set.taxonIds.length - 1) {
      setIndex(index + 1)
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
        <div className="study-card-banner-index">
          {index + 1} of {set.numberOfTaxa} species
        </div>
        <button
          className={shuffle ? "study-card-banner-shuffle active" : "study-card-banner-shuffle"}
          onClick={() => setShuffle(!shuffle)}
        >
          Shuffle: {shuffle ? 'on' : 'off'}
        </button>
      </div>
      <div className="study-card-content">
        <img src={getDefaultPhotoUrl(data[index])} alt='Species to study' />
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
            </div>
          : <button
              className="study-card-content-button"
              onClick={() => setReveal(true)}
            >
              Reveal species information
            </button>
        }
      </div>
      <div className="study-card-arrows">
        <button
          onClick={handleLeftClick}
          className={index === 0 ? '' : 'active'}
        >
          {'<'}
        </button>
        <button
          onClick={handleRightClick}
          className={index === set.taxonIds.length - 1 ? '' : 'active'}
        >
          {'>'}
        </button>
      </div>
    </div>
  )
}

export default StudyCard