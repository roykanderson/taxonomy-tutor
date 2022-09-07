import '../App.css'

const SpeciesCard = ({ commonName, sciName, imgSrc }) => {
  return (
    <div className="species-card">
      <img className="species-image" src={imgSrc} alt="" />
      <div className="species-info">
        <div className="common-name">{commonName}</div>
        <div className="sci-name">{sciName}</div>
      </div>
    </div>
  )
}

export default SpeciesCard