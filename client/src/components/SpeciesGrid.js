import SpeciesCard from './SpeciesCard'

const SpeciesGrid = ({ observations }) => {
  const getPhotoUrl = (observation) => {
    let url = observation.photos[0].url
    const pattern1 = /square.jpg$/
    const pattern2 = /square.jpeg$/
    const pattern3 = /square.JPG$/
    const pattern4 = /square.JPEG$/
    url = url.replace(pattern1, 'large.jpg')
    url = url.replace(pattern2, 'large.jpeg')
    url = url.replace(pattern3, 'large.JPG')
    return url.replace(pattern4, 'large.JPEG')
  }

  return (
    <div className="species-grid">
      {observations.map((obs => {
        return (<SpeciesCard key={obs.id} commonName={obs.taxon.preferred_common_name} sciName={obs.taxon.name} imgSrc={getPhotoUrl(obs)} />)
      }))}
    </div> 
  )
}

export default SpeciesGrid