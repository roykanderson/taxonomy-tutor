import { useSearchParams } from 'react-router-dom'

import SpeciesCard from './SpeciesCard'
import LoadingIcon from './LoadingIcon'
import { useResults } from '../hooks'

const SpeciesGrid = () => {
  const [searchParams] = useSearchParams()

  const { data, isLoading } = useResults(searchParams.get('q'))

  console.log('species card', data)

  const getPhotoUrl = (taxon) => {
    let url = taxon.default_photo.url
    const pattern = /square/
    return url.replace(pattern, 'large')
  }

  return (
    <main className='container'>
      <div className="species-grid">
        {isLoading
          ? <LoadingIcon />
          : data.map((taxon => {
              return (<SpeciesCard key={taxon.id} commonName={taxon.preferred_common_name} sciName={taxon.name} imgSrc={getPhotoUrl(taxon)} />)
            }))
        }
      </div>
    </main>
  )
}

export default SpeciesGrid