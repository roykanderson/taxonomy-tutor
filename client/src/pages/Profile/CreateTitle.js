import styles from './CreateTitle.module.css'

const CreateTitle = ({ title, setTitle }) => {
  return (
    <div className={styles.CreateTitle}>
        Title
        <input
          className={styles.CreateTitle__input}
          type="text"
          name='title'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder='Enter a title...'
        />
      </div>
  )
}

export default CreateTitle