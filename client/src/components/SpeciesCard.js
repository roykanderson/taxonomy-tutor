import { Link } from 'react-router-dom'

const SpeciesCard = ({ taxon }) => {
  const getPhotoUrl = (taxon) => {
    let url = taxon.default_photo.url
    const pattern = /square/
    return url.replace(pattern, 'large')
  }

  return (
    <Link to={`/species/${taxon.id}`} state={taxon} className="species-card">
      <img className="species-image" src={getPhotoUrl(taxon)} alt="" />
      <div className="species-info">
        <p className="common-name">{taxon.preferred_common_name}</p>
        <p className="sci-name">{taxon.name}</p>
      </div>
    </Link>
  )
}

export default SpeciesCard