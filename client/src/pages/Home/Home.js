import { Link } from 'react-router-dom'
import { useContext } from 'react'

import { UserContext } from '../../context/UserContext'
import styles from './Home.module.css'

const Home = () => {
  const { user } = useContext(UserContext)

  return (
    <main className={styles.Home}>
      <h1 className={styles.Home__heading}>
        Study every species in the world, all in one place.
      </h1>
      <section className={styles.Home__flexContainer}>
        <h2 className={styles.Home__subheading}>
          Practice your species identification skills
        </h2>
        <p className={styles.Home__paragraph}>
          Study your species flashcard-style - create a study set, and try to recall each species from its picture alone. Once you're ready, reveal the species' information to see if you were right!
        </p>
        <h2 className={styles.Home__subheading}>
          Search for any species
        </h2>
        <p className={styles.Home__paragraph}>
          Taxonomy Tutor utilizes the <a className={styles.Home__link} href='https://api.inaturalist.org/v1/docs/'>iNaturalist API</a> to search for and catalog species. If you can find it on iNaturalist, then you can add it to your study sets on Taxonomy Tutor!
        </p>
        <h2 className={styles.Home__subheading}>
          Learn as you go
        </h2>
        <p className={styles.Home__paragraph}>
          Taxonomy Tutor also utilizes the <a className={styles.Home__link} href='https://www.mediawiki.org/wiki/API:Main_page'>MediaWiki API</a> to provide short descriptions from each species' Wikipedia article. When a species really sparks your interest, follow the link to its Wikipedia page to learn more!
        </p>
      </section>
      {!user &&
        <section className={styles.Home__callToAction}>
          Create an account to get started!
          <Link className={styles.Home__link} to='/signup'>
            <button className={styles.Home__button}>
              Sign up
            </button>
          </Link>
        </section>
      }
    </main>
  )
}

export default Home