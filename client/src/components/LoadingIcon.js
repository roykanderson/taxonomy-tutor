import styles from './styles/LoadingIcon.module.css'

const LoadingIcon = () => {
  return (
    <div className={styles.LoadingIcon}>
      <div className={styles.LoadingIcon__spinner}></div>
    </div>
  )
}

export default LoadingIcon