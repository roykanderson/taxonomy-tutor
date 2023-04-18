import { useNavigate } from 'react-router-dom'

import { ReactComponent as BackArrowGrey } from '../../assets/back-arrow-grey.svg'
import { ReactComponent as BackArrowGreen } from '../../assets/back-arrow-green.svg'
import { ReactComponent as NextArrowGrey } from '../../assets/next-arrow-grey.svg'
import { ReactComponent as NextArrowGreen } from '../../assets/next-arrow-green.svg'

import styles from './SearchPage.module.css'

const SearchPage = ({ data, page, search }) => {
  const navigate = useNavigate()

  const handleBackClick = () => {
    window.scrollTo(0, 0)
    navigate(`/search?q=${search}&page=${Number(page) - 1}`)
  }

  const handleForwardClick = () => {
    window.scrollTo(0, 0)
    navigate(`/search?q=${search}&page=${Number(page) + 1}`)
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