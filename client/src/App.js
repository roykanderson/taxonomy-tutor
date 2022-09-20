import { useState, useEffect } from 'react'

import './App.css'
import observationsService from './services/observations'

import { ReactComponent as Logo } from './assets/logo.svg'
import Navbar from './components/Navbar'
import SpeciesGrid from './components/SpeciesGrid'

function App() {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState(null)
  const [isFetchingData, setIsFetchingData] = useState(false)

  useEffect(() => {
    const fetchResults = async () => {
      setResults(null)
      setIsFetchingData(true)
      const res = await observationsService.fetchObservations(search)
      setIsFetchingData(false)
      setResults(res)
    }

    if (search) fetchResults()
  }, [search])

  return (
    <>
      <div className='header-wrapper'>
        <header className='header'>
          <Logo />
          <Navbar search={search} setSearch={setSearch} isFetchingData={isFetchingData} />
        </header>
      </div>
      <main className='container'>
        <SpeciesGrid results={results} />
      </main>
    </>
  )
}

export default App