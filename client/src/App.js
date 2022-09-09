// Component imports
import { useEffect, useState } from 'react'

import './App.css'
import observationsService from './services/observations'

import SpeciesGrid from './components/SpeciesGrid'

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
      <SpeciesGrid observations={observations} setTaxon={setTaxon} />
    </div>
  )
}

export default App