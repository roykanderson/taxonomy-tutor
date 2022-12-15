import { useState } from "react"
import { useLocation } from "react-router-dom"
import { useTaxa } from "../hooks"

const StudyCard = () => {
  const location = useLocation()
  const set = location.state

  const { data } = useTaxa(set.taxonIds)
  console.log(data)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [shuffle, setShuffle] = useState(false)
  const [reveal, setReveal] = useState(false)

  const handleLeftClick = () => {
    if (currentIndex !== 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleRightClick = () => {
    if (currentIndex !== set.taxonIds.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  return (
    <div className="study-card">
      <div className="study-card-banner">
        <div className="study-card-banner-index">
          {currentIndex + 1} of {set.numberOfTaxa} species
        </div>
        <button
          className={shuffle ? "study-card-banner-shuffle active" : "study-card-banner-shuffle"}
          onClick={() => setShuffle(!shuffle)}
        >
          Shuffle: {shuffle ? 'on' : 'off'}
        </button>
      </div>
      <div className="study-card-content">
        <img src={'NEED TO CONNECT TO TAXA SERVICE TO GET IMG LINK'} alt='Species to study' />
        {reveal
          ? <div>
              NEED TO CONNECT TO WIKI SERVICE AND TAXA SERVICE TO DISPLAY SPECIES INFO HERE
            </div>
          : <button
              className="study-card-content-reveal"
              onClick={() => setReveal(true)}
            >
              Reveal species information
            </button>
        }
      </div>
      <div className="study-card-arrows">
        <button
          onClick={handleLeftClick}
          className={currentIndex === 0 ? '' : 'active'}
        >
          {'<'}
        </button>
        <button
          onClick={handleRightClick}
          className={currentIndex === set.taxonIds.length - 1 ? '' : 'active'}
        >
          {'>'}
        </button>
      </div>
    </div>
  )
}

export default StudyCard