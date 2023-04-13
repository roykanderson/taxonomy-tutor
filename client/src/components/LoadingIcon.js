import styles from './LoadingIcon.module.css'

const LoadingIcon = ({ size }) => {
  if (size === 'small') {
    return (
      <div className={styles.LoadingIcon}>
        <div className={`${styles.LoadingIcon__spinner} ${styles['LoadingIcon__spinner--small']}`}></div>
      </div>
    )
  }

  return (
    <div className={styles.LoadingIcon}>
      <div className={styles.LoadingIcon__spinner}></div>
    </div>
  )
}

export default LoadingIcon