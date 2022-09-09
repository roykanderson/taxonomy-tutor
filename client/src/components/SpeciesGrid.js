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
    let url = observation.photos[0].url
    const pattern1 = /square.jpg$/
    const pattern2 = /square.jpeg$/
    const pattern3 = /square.JPG$/
    const pattern4 = /square.JPEG$/
    url = url.replace(pattern1, 'large.jpg')
    url = url.replace(pattern2, 'large.jpeg')
    url = url.replace(pattern3, 'large.JPG')
    return url.replace(pattern4, 'large.JPEG')
  }

  return (
    <div className="species-grid">
      <SearchBar taxon={taxon} setTaxon={setTaxon} isFetchingData={isFetchingData} />
      {observations && observations.map((obs => {
        return (<SpeciesCard key={obs.id} commonName={obs.taxon.preferred_common_name} sciName={obs.taxon.name} imgSrc={getPhotoUrl(obs)} />)
      }))}
    </div> 
  )
}

export default SpeciesGrid