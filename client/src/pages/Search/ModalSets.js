import styles from './styles/ModalSets.module.css'

const ModalSets = ({ data, activeSet, setActiveSet, setCreateActive, setError }) => {

  const handleSetClick = (setId) => {
    setActiveSet(setId)
    setCreateActive(false)
    setError(false)
  }

  return (
    <div className={styles.ModalSets}>
      {data &&
        data.map((set) => (
          <div
            key={set.id}
            className={set.id === activeSet ? `${styles.ModalSets__set} ${styles['ModalSets__set--active']}` : `${styles.ModalSets__set}`}
            onClick={() => handleSetClick(set.id)}
          >
            <div className={styles.ModalSets__setTopRow}>
              <p>
                {set.name}
              </p>
              <p>
                Last updated {new Date(set.dateLastUpdated).toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div>
              {set.numberOfTaxa} species
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default ModalSets