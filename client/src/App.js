import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'

import './App.css'
import observationsService from './services/observations'
import { ReactComponent as Logo } from './assets/logo.svg'
import Navbar from './components/Navbar'
import SpeciesGrid from './components/SpeciesGrid'
import { useField, useResults } from './hooks'

function App() {
  const [search, setSearch] = useState('')
  const location = useLocation()

  return (
    <>
      <div className='header-wrapper'>
        <header className='header'>
          <Link to='/'>
            <Logo />
          </Link>
          <Navbar search={search} setSearch={setSearch} />
        </header>
      </div>

      <Routes>
        <Route path='/' element={<h1>HOME</h1>} />
        <Route path='/species' element={<SpeciesGrid search={search} />} />
        <Route path='/profile' element={<h1>hello woRLD</h1>} />
      </Routes>
    </>
  )
}

export default App