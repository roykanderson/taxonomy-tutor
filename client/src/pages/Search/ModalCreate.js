import styles from './ModalCreate.module.css'

const ModalCreate = ({ createActive, title, setTitle, handleCreateClick }) => {
 return (
  <>
    {createActive
      ? <input className={styles.CreateInput}
          type='text'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder='Enter a title...'
          autoFocus
        />
      : <button
          className={styles.CreateButton}
          onClick={handleCreateClick}
        >
          Create new set
        </button>
    }
  </>
 )
}

export default ModalCreate