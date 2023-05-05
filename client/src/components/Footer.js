import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <span className={styles.Footer__text}>
        Powered by <a href='https://api.inaturalist.org/v1/docs/' target="_blank" rel="noopener noreferrer">iNaturalist</a> and <a href='https://www.mediawiki.org/wiki/API:Main_page' target="_blank" rel="noopener noreferrer">MediaWiki</a>
      </span>
    </footer>
  )
}

export default Footer