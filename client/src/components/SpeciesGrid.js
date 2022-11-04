import { useResults } from '../hooks'
import SpeciesCard from './SpeciesCard'

const SpeciesGrid = ({ search }) => {
  const results = useResults(search)

  const getPhotoUrl = (taxon) => {
    let url = taxon.default_photo.url
    const pattern = /square/
    return url.replace(pattern, 'large')
  }

  return (
    <main className='container'>
      <div className="species-grid">
        {results.results && results.results
          .map((taxon => {
            return (<SpeciesCard key={taxon.id} commonName={taxon.preferred_common_name} sciName={taxon.name} imgSrc={getPhotoUrl(taxon)} />)
          }))
        }
      </div>
    </main>
  )
}

export default SpeciesGrid