import { Link } from 'react-router-dom'

import { useSets } from "../hooks"
import LoadingIcon from "./LoadingIcon"

const Sets = () => {
  const { data, isFetching, isError, error } = useSets()

  if (isFetching) {
    return (
      <LoadingIcon />
    )
  }

  if (isError) {
    return (
      <div className='error'>
        {error}
      </div>
    )
  }

  return (
    <div className="sets-container">
      {
        data.map(set => 
          <Link key={set.id} className="sets-set" to={`/profile/${set.id}`} state={set}>
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