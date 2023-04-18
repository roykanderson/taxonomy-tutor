import { Link } from 'react-router-dom'
import { useContext } from 'react'

import { UserContext } from '../../context/UserContext'
import styles from './Home.module.css'

const Home = () => {
  const { user } = useContext(UserContext)

  return (
    <main className={styles.Home}>
      <h1 className={styles.Home__heading}>
        Welcome to Taxonomy Tutor!
      </h1>
      <h2 className={styles.Home__flexHeading}>
        Here you can...
      </h2>
      <section className={styles.Home__flexContainer}>
        <h3 className={styles.Home__subheading}>
          Practice your species identification skills
        </h3>
        <p className={styles.Home__paragraph}>
          Study species flashcard-style - create a study set, and try to recall each species from its picture alone. Once you're ready, reveal the species' information to see if you were right!
        </p>
        <h3 className={styles.Home__subheading}>
          Search for (almost) any species
        </h3>
        <p className={styles.Home__paragraph}>
          Taxonomy Tutor utilizes the <a className={styles.Home__link} href='https://api.inaturalist.org/v1/docs/'>iNaturalist API</a> to search for and catalog species. If you can find it amongst the 300,000+ species on iNaturalist, then you can add it to your study sets on Taxonomy Tutor!
        </p>
        <h3 className={styles.Home__subheading}>
          Learn as you go
        </h3>
        <p className={styles.Home__paragraph}>
          Taxonomy Tutor also utilizes the <a className={styles.Home__link} href='https://www.mediawiki.org/wiki/API:Main_page'>MediaWiki API</a> to provide short descriptions from each species' Wikipedia article. When a species really sparks your interest, follow the link to its Wikipedia page to learn more!
        </p>
      </section>
      {!user &&
        <section className={styles.Home__callToAction}>
          <Link className={styles.Home__link} to='/signup'>
            <button className={styles.Home__button}>
              Create an account to get started!
            </button>
          </Link>
        </section>
      }
    </main>
  )
}

export default Home