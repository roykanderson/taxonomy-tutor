import { useContext } from 'react'
import { UserContext } from '../utils/UserContext'
import { Link, Outlet, useLocation } from 'react-router-dom'

const Profile = () => {
  const { user } = useContext(UserContext)

  const location = useLocation()

  return (
    <main className="profile-container">
      <div className="profile-banner">
        <div>
          {user.username.charAt(0).toUpperCase()}
        </div>
        <div>
          {user.username}
        </div>
      </div>
      <div className='profile-options'>
        <button className={location.pathname === '/profile' ? 'active' : ''}>
          <Link to=''>
            My species sets
          </Link>
        </button>
        <button className={location.pathname === '/profile/create' ? 'active' : ''}>
          <Link to='create'>
            Create new set
          </Link>
        </button>
      </div>
      <Outlet />
    </main>
  )
}

export default Profile