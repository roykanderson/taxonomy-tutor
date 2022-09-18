import SpeciesCard from './SpeciesCard'

const SpeciesGrid = ({ results }) => {
  const getPhotoUrl = (observation) => {
    let url = observation.taxon.default_photo.url
    const pattern = /square/
    return url.replace(pattern, 'large')
  }

  return (
    <>
      <div className="species-grid">
        {results && [...new Map(results.map(item => [item.taxon['name'], item])).values()] // only display one observation of each species
          .map((obs => {
            return (<SpeciesCard key={obs.id} commonName={obs.taxon.preferred_common_name} sciName={obs.taxon.name} imgSrc={getPhotoUrl(obs)} />)
          }))
        }
      </div>
    </>
  )
}

export default SpeciesGrid