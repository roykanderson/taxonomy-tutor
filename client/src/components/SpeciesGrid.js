import SpeciesCard from './SpeciesCard'

const SpeciesGrid = ({ results }) => {
  const getPhotoUrl = (taxon) => {
    let url = taxon.default_photo.url
    const pattern = /square/
    return url.replace(pattern, 'large')
  }

  return (
    <>
      <div className="species-grid">
        {results && results
          .map((taxon => {
            return (<SpeciesCard key={taxon.id} commonName={taxon.preferred_common_name} sciName={taxon.name} imgSrc={getPhotoUrl(taxon)} />)
          }))
        }
      </div>
    </>
  )
}

export default SpeciesGrid