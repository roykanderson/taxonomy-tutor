import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import './styles/App.css'
import { ReactComponent as Logo } from './assets/logo.svg'

import { UserContext } from './utils/UserContext'

import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import Navbar from './components/Navbar'
import SpeciesGrid from './components/SpeciesGrid'
import SpeciesPage from './components/SpeciesPage'
import Profile from './components/Profile'
import Sets from './components/Sets'
import CreateSetForm from './components/CreateSetForm'
import userService from './services/userService'
import StudyPage from './components/StudyPage'
import StudyCard from './components/StudyCard'
import StudyEdit from './components/StudyEdit'

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
        <Route index element={<></>} />
        <Route path='login' element={user ? <Navigate replace to='/profile' /> : <LoginPage />} />
        <Route path='signup' element={user ? <Navigate replace to='/profile' /> : <SignupPage />} />
        <Route path='search' element={<SpeciesGrid />} />
        <Route path='profile' element={user ? <Profile /> : <Navigate replace to='/login' />}>
          <Route path='' element={<Sets />} />
          <Route path='create' element={<CreateSetForm />} />
        </Route>
        <Route path='profile/:id' element={<StudyPage />}>
          <Route path='' element={<StudyCard />} />
          <Route path='edit' element={<StudyEdit />} />
        </Route>
        <Route path='species/:id' element={<SpeciesPage />} />
      </Routes>
    </UserContext.Provider>
  )
}

export default App