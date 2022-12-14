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
      <div>
        {error}
      </div>
    )
  }

  return (
    <Link className="sets-container">
      {
        data.map(set => 
          <div key={set.id} className="sets-set">
            <p>
              {set.name}
            </p>
            <p>
              {new Date(set.dateLastUpdated).toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p>
              {set.numberOfTaxa} species
            </p>
          </div>
        )
      }
    </Link>
  )
}

export default Sets