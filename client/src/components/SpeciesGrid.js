import { useState, useEffect } from 'react'

import SearchBar from './SearchBar'
import SpeciesCard from './SpeciesCard'

import observationsService from '../services/observations'

const SpeciesGrid = () => {
  const [isFetchingData, setIsFetchingData] = useState(false)
  const [taxon, setTaxon] = useState('')
  const [observations, setObservations] = useState(null)

  useEffect(() => {
    const fetchObservations = async () => {
      setObservations(null)
      setIsFetchingData(true)
      const res = await observationsService.fetchObservations(taxon)
      setIsFetchingData(false)
      setObservations(res)
    }

    if (taxon) fetchObservations()
  }, [taxon])

  const getPhotoUrl = (observation) => {
    let url = observation.taxon.default_photo.url
    const pattern = /square/
    return url.replace(pattern, 'large')
  }

  return (
    <>
      <SearchBar taxon={taxon} setTaxon={setTaxon} isFetchingData={isFetchingData} />
      <div className="species-grid">
        {observations && [...new Map(observations.map(item => [item.taxon['name'], item])).values()] // only display one observation of each species
          .map((obs => {
            return (<SpeciesCard key={obs.id} commonName={obs.taxon.preferred_common_name} sciName={obs.taxon.name} imgSrc={getPhotoUrl(obs)} />)
          }))
        }
      </div>
    </>
  )
}

export default SpeciesGrid