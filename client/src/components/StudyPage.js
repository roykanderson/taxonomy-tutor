import { useLocation, Link, Outlet } from "react-router-dom"

const StudyPage = () => {
  const location = useLocation()
  const set = location.state
  // Connect to taxa and wiki service to display data
  
  return (
    <div className="study-container" >

      <div className="study-title">
        <div>
          {set.name}
        </div>
        <div>
          {set.dateLastUpdated}
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