import { useSearchParams } from 'react-router-dom'

import { useResults } from '../hooks'
import SpeciesCard from './SpeciesCard'

const SpeciesGrid = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  console.log(searchParams.get('q'))
  const { results, isLoading } = useResults(searchParams.get('q'))

  const getPhotoUrl = (taxon) => {
    let url = taxon.default_photo.url
    const pattern = /square/
    return url.replace(pattern, 'large')
  }

  return (
    <main className='container'>
      <div className="species-grid">
        {results && results
          .map((taxon => {
            return (<SpeciesCard key={taxon.id} commonName={taxon.preferred_common_name} sciName={taxon.name} imgSrc={getPhotoUrl(taxon)} />)
          }))
        }
      </div>
    </main>
  )
}

export default SpeciesGrid