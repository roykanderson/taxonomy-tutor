const CreateTitle = ({ title, setTitle }) => {
  return (
    <div className="create-title">
        <div>
          Title
        </div>
        <input
          type="text"
          name='title'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder='Enter a title, like "Birds of the Western United States"'
        />
      </div>
  )
}

export default CreateTitle