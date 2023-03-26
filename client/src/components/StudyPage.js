import { useLocation, Link, Outlet } from "react-router-dom"
import { useSet, useTaxa } from "../hooks"
import LoadingIcon from "./LoadingIcon"

const StudyPage = () => {
  const location = useLocation()
  const setId = location.pathname.split('/').pop()
  const { data: set, isFetching: isFetchingSet } = useSet(setId)
  console.log(set)

  const taxonIds = set?.taxonIds
  const { data: taxa, isFetching: isFetchingTaxa } = useTaxa(taxonIds)
  console.log(taxa)

  if (isFetchingSet || isFetchingTaxa) {
    return (
      <LoadingIcon />
    )
  }

  return (
    <div className="study-container" >

      <div className="study-title">
        <div>
          {set.name}
        </div>
        <div>
          Last updated {new Date(set.dateLastUpdated).toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div className="study-options">
        <button className={location.pathname === `/profile/${set.id}` ? 'active' : ''}>
          <Link to='' state={set}>
            Study
          </Link>
        </button>
        <button className={location.pathname === `/profile/${set.id}/edit` ? 'active' : ''}>
          <Link to='edit' state={set}>
            Edit
          </Link>
        </button>
      </div>

      <Outlet />
    </div>
  )
}

export default StudyPage