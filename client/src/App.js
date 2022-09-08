// Component imports
import { useEffect, useState } from 'react'

import './App.css'
import observationsService from './services/observations'

import SpeciesGrid from './components/SpeciesGrid'
import SearchBar from './components/SearchBar'

function App() {
  const [taxon, setTaxon] = useState('')
  const [observations, setObservations] = useState(null)

  useEffect(() => {
    const fetchObservations = async () => {
      const res = await observationsService.fetchObservations(taxon)
      setObservations(res)
    }

    if (taxon) fetchObservations()
  }, [taxon])

  return (
    <>
      <SearchBar setTaxon={setTaxon} />
      {observations && <SpeciesGrid observations={observations} />}
    </>
  )
}

export default App