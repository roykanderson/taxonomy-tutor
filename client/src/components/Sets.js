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
    <div className="sets-container">
      {
        data.map(set => 
          <div key={set.id} className="sets-set">
            <p>
              {set.name}
            </p>
            <p>
              {set.dateLastUpdated}
            </p>
            <p>
              {set.numberOfTaxa} species
            </p>
          </div>
        )
      }
    </div>
  )
}

export default Sets