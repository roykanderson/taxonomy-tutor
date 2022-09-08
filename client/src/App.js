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
    <div className='container'>
      <SearchBar setTaxon={setTaxon} />
      {observations && <SpeciesGrid observations={observations} />}
    </div>
  )
}

export default App