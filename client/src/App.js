import { Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'

import './styles/App.css'
import { ReactComponent as Logo } from './assets/logo.svg'

import { UserContext } from './utils/UserContext'

import LoginPage from './components/LoginPage'
import Navbar from './components/Navbar'
import SpeciesGrid from './components/SpeciesGrid'
import SpeciesPage from './components/SpeciesPage'

function App() {
  const [user, setUser] = useState(null)

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
        <Route path='/' element={<></>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/search' element={<SpeciesGrid />} />
        <Route path='/profile' element={<></>} />
        <Route path='/species/:id' element={<SpeciesPage />} />
      </Routes>
    </UserContext.Provider>
  )
}

export default App