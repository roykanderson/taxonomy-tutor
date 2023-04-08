import { useSearchParams, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { ReactComponent as BackArrowGrey } from '../../assets/back-arrow-grey.svg'
import { ReactComponent as BackArrowGreen } from '../../assets/back-arrow-green.svg'
import { ReactComponent as NextArrowGrey } from '../../assets/next-arrow-grey.svg'
import { ReactComponent as NextArrowGreen } from '../../assets/next-arrow-green.svg'

import SearchResult from './SearchResult'
import LoadingIcon from '../../components/LoadingIcon'
import useResults from '../../hooks/useResults'

import styles from './styles/Search.module.css'

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
        {data &&
          <div className={styles.Search__summaryPage}>
            <button
              className={page === 1 ? `${styles.Search__pageButton}` : `${styles.Search__pageButton} ${styles['Search__pageButton--active']}`}
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              {page === 1 ? <BackArrowGrey /> : <BackArrowGreen />}
            </button>
            Page {page} of {Math.ceil(data.total_results / data.per_page)}
            <button
              className={page === Math.ceil(data.total_results / data.per_page) ? `${styles.Search__pageButton}` : `${styles.Search__pageButton} ${styles['Search__pageButton--active']}`}
              onClick={() => setPage(page + 1)}
              disabled={page === Math.ceil(data.total_results / data.per_page)}
            >
              {page === Math.ceil(data.total_results / data.per_page) ? <NextArrowGrey /> : <NextArrowGreen />}
            </button>
          </div>
        }
      </section>
      {isFetching
        ? <LoadingIcon />
        : <section className={styles.Search__results}>
          {data.results.map(taxon => {
            return <SearchResult key={taxon.id} taxon={taxon} />
          })}
        </section>
      }
    </main>
  )
}

export default Search