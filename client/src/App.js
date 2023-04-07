import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import './assets/styles/App.css'
import { ReactComponent as Logo } from './assets/logo.svg'

import { UserContext } from './context/UserContext'

import Home from './pages/Home/Home'
import LoginPage from './pages/Login/LoginPage'
import SignupPage from './pages/Signup/SignupPage'
import Navbar from './components/Navbar'
import SpeciesGrid from './pages/Search/SpeciesGrid'
import SpeciesPage from './pages/Search/Result/SpeciesPage'
import Profile from './pages/Profile/Profile'
import Sets from './pages/Profile/Sets'
import CreateSetForm from './pages/Profile/Create/CreateSetForm'
import userService from './services/userService'
import StudyPage from './pages/Profile/Set/StudyPage'
import StudyCard from './pages/Profile/Set/StudyCard'
import StudyEdit from './pages/Profile/Set/Edit/StudyEdit'

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
        <Route path='login' element={user ? <Navigate replace to='/profile' /> : <LoginPage />} />
        <Route path='signup' element={user ? <Navigate replace to='/profile' /> : <SignupPage />} />
        <Route path='search' element={<SpeciesGrid />} />
        <Route path='search/:id' element={<SpeciesPage />} />
        <Route path='profile' element={user ? <Profile /> : <Navigate replace to='/login' />}>
          <Route path='' element={<Sets />} />
          <Route path='create' element={<CreateSetForm />} />
        </Route>
        <Route path='profile/:id' element={<StudyPage />}>
          <Route path='' element={<StudyCard />} />
          <Route path='edit' element={<StudyEdit />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  )
}

export default App