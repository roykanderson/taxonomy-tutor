import { Link } from 'react-router-dom'
import { useContext } from 'react'

import { UserContext } from '../../context/UserContext'
import styles from './Home.module.css'

const Home = () => {
  const { user } = useContext(UserContext)

  return (
    <main className={styles.Home}>
      <h1 className={styles.Home__heading}>
        Flashcards, for naturalists.
      </h1>
      <section className={styles.Home__flexContainer}>
        <h3 className={styles.Home__subheading}>
          Create flashcard sets to practice species identification
        </h3>
        <p className={styles.Home__paragraph}>
          Make an account, search for species, and add them to your flashcard sets. Try to recall each species from its picture alone. Once you're ready, reveal the species info to see if you were right.
        </p>
        <h3 className={styles.Home__subheading}>
          Learn from species descriptions
        </h3>
        <p className={styles.Home__paragraph}>
          Each flashcard contains a short species description, along with a link to the source Wikipedia article. These descriptions are retrieved via the <a className={styles.Home__link} href='https://www.mediawiki.org/wiki/API:Main_page' target="_blank" rel="noopener noreferrer">MediaWiki API</a>.
        </p>
        <h3 className={styles.Home__subheading}>
          Never run out of species to study
        </h3>
        <p className={styles.Home__paragraph}>
          Taxonomy Tutor utilizes the <a className={styles.Home__link} href='https://inaturalist.org' target="_blank" rel="noopener noreferrer">iNaturalist</a> <a className={styles.Home__link} href='https://api.inaturalist.org/v1/docs/' target="_blank" rel="noopener noreferrer">API</a> to keep track. iNaturalist users have observed over <a className={styles.Home__link} href='https://www.inaturalist.org/blog/52872-one-sixth-of-all-named-species-tallied#:~:text=Most%20estimates%20are%20that%20there,described%20species%20with%20an%20observation.' target="_blank" rel="noopener noreferrer">333,000 unique species</a> around the world.
        </p>
      </section>
      {!user &&
        <section className={styles.Home__buttonsContainer}>
          <Link className={styles.Home__link} to='/signup'>
            <button className={styles.Home__signupButton}>
              Get started
            </button>
          </Link>
          <Link className={styles.Home__link} to='/login'>
            <button className={styles.Home__loginButton}>
              Log in
            </button>
          </Link>
        </section>
      }
    </main>
  )
}

export default Home