import { useLocation, Link } from "react-router-dom"
import { useState } from "react"

const StudyPage = () => {
  const location = useLocation()
  const set = location.state

  const [currentIndex, setCurrentIndex] = useState(0)
  const [shuffle, setShuffle] = useState(false)
  const [reveal, setReveal] = useState(false)

  // Connect to taxa and wiki service to display data
  
  return (
    <div className="study-container" >

      <div className="study-title">
        {set.name}
      </div>

      <div className="study-options">
        <button className={location.pathname === `/profile/${set.id}` ? 'active' : ''}>
          <Link to=''>
            Study
          </Link>
        </button>
        <button className={location.pathname === `/profile/${set.id}/edit` ? 'active' : ''}>
          <Link to='create'>
            Edit
          </Link>
        </button>
      </div>

      <div className="study-main">
        <div className="study-left">
          {'<'}
        </div>
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
        </div>
        <div className="study-right">
          {'>'}
        </div>
      </div>

    </div>
  )
}

export default StudyPage