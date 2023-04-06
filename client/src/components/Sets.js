import { Link } from 'react-router-dom'

import useSets from '../hooks/useSets'
import LoadingIcon from "./LoadingIcon"

const Sets = () => {
  const { data, isFetching, isError, error } = useSets()

  if (isFetching) {
    return (
      <LoadingIcon />
    )
  }

  else if (isError) {
    return (
      <div className='error'>
        {error}
      </div>
    )
  }

  else if (data.length === 0) {
    return (
      <div className='sets-nosets'>
        It looks like you haven't created any study sets yet. Now's the perfect time to start!
      </div>
    )
  }

  return (
    <div className="sets-container">
      {
        data
          .sort((set1, set2) => new Date(set2.dateLastUpdated) - new Date(set1.dateLastUpdated)) // Sort sets by most recently updated
          .map(set => 
            <Link key={set.id} className="sets-set" to={`/profile/${set.id}`}>
              <p>
                {set.name}
              </p>
              <p>
                {new Date(set.dateLastUpdated).toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p>
                {set.numberOfTaxa} species
              </p>
            </Link>
          )
      }
    </div>
  )
}

export default Sets