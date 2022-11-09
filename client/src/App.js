import { Routes, Route, Link } from 'react-router-dom'

import './App.css'
import { ReactComponent as Logo } from './assets/logo.svg'

import Navbar from './components/Navbar'
import SpeciesGrid from './components/SpeciesGrid'
import SpeciesPage from './components/SpeciesPage'

function App() {
  return (
    <>
      <div className='header-wrapper'>
        <header className='header'>
          <Link to='/'>
            <Logo />
          </Link>
          <Navbar />
        </header>
      </div>

      <Routes>
        <Route path='/' element={<h1>HOME</h1>} />
        <Route path='/search' element={<SpeciesGrid />} />
        <Route path='/profile' element={<h1>hello woRLD</h1>} />
        <Route path='/species/:id' element={<SpeciesPage />} />
      </Routes>
    </>
  )
}

export default App