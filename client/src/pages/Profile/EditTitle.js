import styles from './EditTitle.module.css'

const EditTitle = ({ title, setTitle, checkForTitleChanges }) => {
  const handleChange = ({ target }) => {
    setTitle(target.value)
    checkForTitleChanges(target.value)
  }

  return (
    <div className={styles.EditTitle}>
        <div className={styles.EditTitle__label}>
          Title
        </div>
        <input
          className={styles.EditTitle__input}
          type="text"
          name='title'
          value={title}
          onChange={handleChange}
          placeholder='Enter a title, like "Birds of the Western United States"'
        />
      </div>
  )
}

export default EditTitle