import { useContext } from 'react'
import { UserContext } from '../utils/UserContext'

import ProfileSets from './ProfileSets'

const Profile = () => {
  const { user } = useContext(UserContext)

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
        <div className='profile-options'>
          <button className='active'>
            My species sets
          </button>
          <button>
            Create new set
          </button>
        </div>
      </div>
      <div className='profile-content'>
        <ProfileSets />
      </div>
    </main>
  )
}

export default Profile