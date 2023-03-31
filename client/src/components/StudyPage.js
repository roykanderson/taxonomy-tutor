import { useLocation, Link, Outlet } from "react-router-dom"
import { useContext } from "react"

import { UserContext } from '../utils/UserContext'
import { useSet, useTaxa } from "../hooks"
import { extractSetIdFromPathname } from '../utils/helpers'

import LoadingIcon from "./LoadingIcon"

const StudyPage = () => {
  const { user } = useContext(UserContext)
  const location = useLocation()
  const setId = extractSetIdFromPathname(location.pathname)
  const { data: set, isFetching: isFetchingSet } = useSet(setId)
  const taxonIds = set?.taxonIds
  const { data: taxa, isFetching: isFetchingTaxa } = useTaxa(taxonIds)

  if (isFetchingSet || isFetchingTaxa) {
    return (
      <LoadingIcon />
    )
  }

  return (
    <div className="study-container" >
      <div className="study-title">
        <div className="study-title-profile">
          <Link className="study-back-link" to='/profile'>
            {user.username}
          </Link>
          <span className="study-back-link-slash">/</span>
          {set.name}
        </div>
        <div className="study-title-date">
          Last updated {new Date(set.dateLastUpdated).toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div className="study-options">
        <button className={location.pathname === `/profile/${set.id}` ? 'active' : ''}>
          <Link to=''>
            Study
          </Link>
        </button>
        <button className={location.pathname === `/profile/${set.id}/edit` ? 'active' : ''}>
          <Link to='edit'>
            Edit
          </Link>
        </button>
      </div>

      <Outlet context={{ set, taxa }} />
    </div>
  )
}

export default StudyPage