import SpeciesCard from './SpeciesCard'

const SpeciesGrid = ({ observations }) => {
  return (
    <div className="species-grid">
      {observations.map((obs => {
        return (<SpeciesCard key={obs.id} commonName={obs.taxon.common_name.name} sciName={obs.taxon.name} imgSrc={obs.photos[0].large_url} />)
      }))}
    </div> 
  )
}

export default SpeciesGrid