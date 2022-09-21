import { useState, useEffect } from 'react'

import './App.css'
import observationsService from './services/observations'

import { ReactComponent as Logo } from './assets/logo.svg'
import Navbar from './components/Navbar'
import SpeciesGrid from './components/SpeciesGrid'

function App() {
  const [search, setSearch] = useState('')
  const [resultTaxon, setResultTaxon] = useState(null)
  const [results, setResults] = useState(null)
  const [isFetchingData, setIsFetchingData] = useState(false)

  useEffect(() => {
    const fetchResults = async () => {
      setResultTaxon(null)
      setResults(null)
      setIsFetchingData(true)

      const taxon = await observationsService.searchForTaxon(search)
      const descendants = await observationsService.searchForDescendants(taxon.id, 1)

      setIsFetchingData(false)
      setResultTaxon(taxon)
      setResults(descendants)
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