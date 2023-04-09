import { ReactComponent as BackArrowGrey } from '../../assets/back-arrow-grey.svg'
import { ReactComponent as BackArrowGreen } from '../../assets/back-arrow-green.svg'
import { ReactComponent as NextArrowGrey } from '../../assets/next-arrow-grey.svg'
import { ReactComponent as NextArrowGreen } from '../../assets/next-arrow-green.svg'

import styles from './SearchPage.module.css'

const SearchPage = ({ data, page, setPage }) => {
  const handleBackClick = () => {
    setPage(page - 1)
    window.scrollTo(0, 0)
  }

  const handleForwardClick = () => {
    setPage(page + 1)
    window.scrollTo(0, 0)
  }

  return (
    <>
      {data &&
        <div className={styles.SearchPage}>
          <button
            className={page === 1 ? `${styles.SearchPage__button}` : `${styles.SearchPage__button} ${styles['SearchPage__button--active']}`}
            onClick={handleBackClick}
            disabled={page === 1}
          >
            {page === 1 ? <BackArrowGrey /> : <BackArrowGreen />}
          </button>
          Page {page} of {Math.ceil(data.total_results / data.per_page)}
          <button
            className={page === Math.ceil(data.total_results / data.per_page) ? `${styles.SearchPage__button}` : `${styles.SearchPage__button} ${styles['SearchPage__button--active']}`}
            onClick={handleForwardClick}
            disabled={page === Math.ceil(data.total_results / data.per_page)}
          >
            {page === Math.ceil(data.total_results / data.per_page) ? <NextArrowGrey /> : <NextArrowGreen />}
          </button>
        </div>
      }
    </>
  )
}

export default SearchPage