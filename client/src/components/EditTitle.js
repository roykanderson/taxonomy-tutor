const EditTitle = ({ title, setTitle, checkForTitleChanges }) => {
  const handleChange = ({ target }) => {
    setTitle(target.value)
    checkForTitleChanges(target.value)
  }

  return (
    <div className="create-title">
        <div>
          Title
        </div>
        <input
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