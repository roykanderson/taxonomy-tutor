import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { UserContext } from './context/UserContext'

import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Navbar from './components/Navbar'
import Search from './pages/Search/Search'
import Species from './pages/Search/Species'
import Profile from './pages/Profile/Profile'
import ProfileSets from './pages/Profile/ProfileSets'
import ProfileCreate from './pages/Profile/ProfileCreate'
import userService from './services/userService'
import ProfileSet from './pages/Profile/ProfileSet'
import SetContent from './pages/Profile/SetContent'
import SetEdit from './pages/Profile/SetEdit'
import Footer from './components/Footer'

import './assets/index.css'

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
    <UserContext.Provider value={{ user, setUser }}>
      
      <Navbar />
      
      <Routes>
        <Route index element={<Home />} />
        <Route path='login' element={user ? <Navigate replace to='/profile' /> : <Login />} />
        <Route path='profile' element={user ? <Profile /> : <Navigate replace to='/login' />}>
          <Route path='' element={user ? <ProfileSets /> : <Navigate replace to='/login' />} />
          <Route path='create' element={user ? <ProfileCreate /> : <Navigate replace to='/login' />} />
        </Route>
        <Route path='profile/:id' element={user ? <ProfileSet /> : <Navigate replace to='/login' />}>
          <Route path='' element={user ? <SetContent /> : <Navigate replace to='/login' />} />
          <Route path='edit' element={user ? <SetEdit /> : <Navigate replace to='/login' />} />
        </Route>
        <Route path='search' element={<Search />} />
        <Route path='search/:id' element={<Species />} />
        <Route path='signup' element={user ? <Navigate replace to='/profile' /> : <Signup />} />
      </Routes>

      <Footer />
    
    </UserContext.Provider>
  )
}

export default App