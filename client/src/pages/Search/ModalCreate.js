const ModalCreate = ({ createActive, title, setTitle, handleCreateClick }) => {
 return (
  <>
    {createActive
      ? <input className="species-add-modal-create-input"
          type='text'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder='Enter a title...'
          autoFocus
        />
      : <button
          className="species-add-modal-create-button"
          onClick={handleCreateClick}
        >
          Create new set
        </button>
    }
  </>
 )
}

export default ModalCreate