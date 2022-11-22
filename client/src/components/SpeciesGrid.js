import { useSearchParams } from 'react-router-dom'

import SpeciesCard from './SpeciesCard'
import LoadingIcon from './LoadingIcon'
import { useResults } from '../hooks'

const SpeciesGrid = () => {
  const [searchParams] = useSearchParams()
  const { data, isLoading } = useResults(searchParams.get('q'))

  return (
    <main className='container'>
      {isLoading
        ? <LoadingIcon />
        : <div className='species-grid'>
          {data.map(taxon => {
            return <SpeciesCard key={taxon.id} taxon={taxon} />
          })}
        </div>
      }
    </main>
  )
}

export default SpeciesGrid