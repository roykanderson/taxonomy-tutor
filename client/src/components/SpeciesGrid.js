import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'

import { ReactComponent as BackArrowGrey } from '../assets/back-arrow-grey.svg'
import { ReactComponent as BackArrowGreen } from '../assets/back-arrow-green.svg'
import { ReactComponent as NextArrowGrey } from '../assets/next-arrow-grey.svg'
import { ReactComponent as NextArrowGreen } from '../assets/next-arrow-green.svg'

import SpeciesCard from './SpeciesCard'
import LoadingIcon from './LoadingIcon'
import { useResults } from '../hooks'

const SpeciesGrid = () => {
  const [searchParams] = useSearchParams()
  const search = searchParams.get('q')

  const [page, setPage] = useState(1)

  const { data, isLoading } = useResults(search, page)

  return (
    <main className='container'>
      <div className='results-info'>
        <div className='results-info-text'>
          Showing results for "{search}"
        </div>
        {data &&
          <div className='results-info-page'>
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
              {page === 1 ? <BackArrowGrey /> : <BackArrowGreen />}
            </button>
            <div>
                <>Page {page} of {Math.ceil(data.total_results / data.per_page)}</>
            </div>
            <button onClick={() => setPage(page + 1)} disabled={page === Math.ceil(data.total_results / data.per_page)}>
              {page === Math.ceil(data.total_results / data.per_page) ? <NextArrowGrey /> : <NextArrowGreen />}
            </button>
          </div>
        }
      </div>
      {isLoading
        ? <LoadingIcon />
        : <div className='species-grid'>
          {data.results.map(taxon => {
            return <SpeciesCard key={taxon.id} taxon={taxon} />
          })}
        </div>
      }
    </main>
  )
}

export default SpeciesGrid