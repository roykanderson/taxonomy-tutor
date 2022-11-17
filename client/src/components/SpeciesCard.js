import { Link } from 'react-router-dom'

import { getDefaultPhotoUrl } from '../utils/helpers'

// FIX Ursidae error when searching for bears with photoURL

const SpeciesCard = ({ taxon }) => {
  return (
    <Link to={`/species/${taxon.id}`} state={taxon} className="species-card">
      <img className="species-image" src={getDefaultPhotoUrl(taxon)} alt="" />
      <div className="species-info">
        <p className="common-name">{taxon.preferred_common_name}</p>
        <p className="sci-name">{taxon.name}</p>
      </div>
    </Link>
  )
}

export default SpeciesCard