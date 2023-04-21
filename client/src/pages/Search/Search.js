import { useSearchParams } from 'react-router-dom'

import SearchPage from './SearchPage'
import SearchResult from './SearchResult'
import LoadingIcon from '../../components/LoadingIcon'
import useResults from '../../hooks/useResults'
import toTitleCase from '../../utils/toTitleCase'

import styles from './Search.module.css'

const Search = () => {
  // Obtain query from URL
  const [searchParams] = useSearchParams()
  const search = searchParams.get('q')
  const rank = toTitleCase(searchParams.get('rank'))
  const commonName = toTitleCase(searchParams.get('commonName'))
  const page = Number(searchParams.get('page'))

  const { data, isFetching } = useResults(search, page)

  if (!data && !isFetching) {
    console.log('ya')
    return (
      <main className={styles.Search}>
        <div className={styles.Search__errorMessage}>
          Did not find any results for: "{search}". Please use only letters and spaces in your search.
        </div>
      </main>
    )
  }

  return (
    <main className={styles.Search}>
      <section className={styles.Search__summary}>
        <div className={styles.Search__summaryText}>
          {rank && commonName
            ? <>{rank} <span className={styles.Search__query}>{search}</span> ({commonName})</>
            : <span className={styles.Search__query}>"{search}"</span>
          }
        </div>
        <SearchPage data={data} page={page} search={search} rank={rank} commonName={commonName} />
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