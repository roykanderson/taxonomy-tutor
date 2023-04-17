import { useSearchParams, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

import SearchPage from './SearchPage'
import SearchResult from './SearchResult'
import LoadingIcon from '../../components/LoadingIcon'
import useResults from '../../hooks/useResults'

import styles from './Search.module.css'

const Search = () => {
  // Obtain query from URL
  const [searchParams] = useSearchParams()
  const search = searchParams.get('q')

  const [page, setPage] = useState(1)

  // Reset page to 1 whenever query changes
  const location = useLocation()
  useEffect(() => setPage(1), [location])

  const { data, isFetching } = useResults(search, page)

  return (
    <main className={styles.Search}>
      <section className={styles.Search__summary}>
        <div className={styles.Search__summaryText}>
          Showing results for "{search}"
        </div>
        <SearchPage data={data} page={page} setPage={setPage} />
      </section>
      {isFetching
        ? <LoadingIcon />
        : <section className={data.results.length < 5 ? `${styles.Search__results} ${styles['Search__results--singleRow']}` : `${styles.Search__results}`}>
          {data.results.map(taxon => 
              <SearchResult key={taxon.id} taxon={taxon} />     
          )}
        </section>
      }
      {data && page !== Math.ceil(data.total_results / data.per_page) && !isFetching &&
        <section className={styles.Search__footer}>
          <SearchPage data={data} page={page} setPage={setPage} />
        </section>
      }
    </main>
  )
}

export default Search