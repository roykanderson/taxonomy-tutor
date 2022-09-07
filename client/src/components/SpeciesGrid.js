import SpeciesCard from './SpeciesCard'

const SpeciesGrid = ({ observations }) => {
  // setImgSrc(res.data[0].photos[0].large_url)
  // setCommonName(res.data[0].taxon.common_name.name)
  // setSciName(res.data[0].taxon.name)
  console.log(observations)
  return (
    <div className="species-grid">
      {observations.map((obs => {
        return (<SpeciesCard key={obs.id} commonName={obs.taxon.common_name.name} sciName={obs.taxon.name} imgSrc={obs.photos[0].large_url} />)
      }))}
    </div> 
  )
}

export default SpeciesGrid