// Component imports
import { useEffect, useState } from 'react'

import SpeciesGrid from './components/SpeciesGrid'

import observationsService from './services/observations'

function App() {
  const [taxon, setTaxon] = useState('echinodermata')
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
      {observations && <SpeciesGrid observations={observations} />}
    </>
  )
}

export default App