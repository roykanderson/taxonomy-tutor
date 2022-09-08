const SpeciesCard = ({ commonName, sciName, imgSrc }) => {
  return (
    <div className="species-card">
      <img className="species-image" src={imgSrc} alt="" />
      <div className="species-info">
        <p className="common-name">{commonName}</p>
        <p className="sci-name">{sciName}</p>
      </div>
    </div>
  )
}

export default SpeciesCard