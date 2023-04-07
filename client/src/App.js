import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import './assets/styles/App.css'
import { ReactComponent as Logo } from './assets/logo.svg'

import { UserContext } from './context/UserContext'

import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Navbar from './components/Navbar'
import SpeciesGrid from './pages/Search/SpeciesGrid'
import SpeciesPage from './pages/Search/Result/SpeciesPage'
import Profile from './pages/Profile/Profile'
import ProfileSets from './pages/Profile/ProfileSets'
import ProfileCreate from './pages/Profile/ProfileCreate'
import userService from './services/userService'
import ProfileSet from './pages/Profile/ProfileSet'
import SetContent from './pages/Profile/SetContent'
import SetEdit from './pages/Profile/SetEdit'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userJSON = window.localStorage.getItem('user')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      userService.setToken(user.token)
    }
  }, [])

  return (
    <UserContext.Provider value={{user, setUser}}>
      <div className='header-wrapper'>
        <header className='header'>
          <Link to='/'>
            <Logo />
          </Link>
          <Navbar />
        </header>
      </div>

      <Routes>
        <Route index element={<Home />} />
        <Route path='login' element={user ? <Navigate replace to='/profile' /> : <Login />} />
        <Route path='profile' element={user ? <Profile /> : <Navigate replace to='/login' />}>
          <Route path='' element={<ProfileSets />} />
          <Route path='create' element={<ProfileCreate />} />
        </Route>
        <Route path='profile/:id' element={<ProfileSet />}>
          <Route path='' element={<SetContent />} />
          <Route path='edit' element={<SetEdit />} />
        </Route>
        <Route path='search' element={<SpeciesGrid />} />
        <Route path='search/:id' element={<SpeciesPage />} />
        <Route path='signup' element={user ? <Navigate replace to='/profile' /> : <Signup />} />
      </Routes>
    </UserContext.Provider>
  )
}

export default App