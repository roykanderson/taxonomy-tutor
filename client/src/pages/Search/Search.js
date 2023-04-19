import { useSearchParams } from 'react-router-dom'

import SearchPage from './SearchPage'
import SearchResult from './SearchResult'
import LoadingIcon from '../../components/LoadingIcon'
import useResults from '../../hooks/useResults'

import styles from './Search.module.css'

const Search = () => {
  // Obtain query from URL
  const [searchParams] = useSearchParams()
  const search = searchParams.get('q')
  const rank = searchParams.get('rank')
  const commonName = searchParams.get('commonName')
  const page = Number(searchParams.get('page'))

  const { data, isFetching } = useResults(search, page)

  return (
    <main className={styles.Search}>
      <section className={styles.Search__summary}>
        <div className={styles.Search__summaryText}>
          Showing results for {rank} <i>{search}</i>{commonName ? ` (${commonName})` : ''}
        </div>
        <SearchPage data={data} page={page} search={search} />
      </section>
      {isFetching
        ? <LoadingIcon />
        : <section className={styles.Search__results}>
          {data.results.map(taxon => 
            <SearchResult key={taxon.id} taxon={taxon} />     
          )}
        </section>
      }
      {data && page !== Math.ceil(data.total_results / data.per_page) && !isFetching &&
        <section className={styles.Search__footer}>
          <SearchPage data={data} page={page} search={search} />
        </section>
      }
    </main>
  )
}

export default Search