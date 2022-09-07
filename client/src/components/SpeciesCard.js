import { useEffect, useState } from 'react'
import '../App.css'

import axios from 'axios'

const SpeciesCard = () => {
  const [imgSrc, setImgSrc] = useState(null)
  const [commonName, setCommonName] = useState(null)
  const [sciName, setSciName] = useState(null)

  useEffect(() => {
    console.log('effect')
    const baseUrl = 'https://www.inaturalist.org/observations.json?has[]=photos&taxon_name=phaeophyta'
    const getObservations = async () => {
      const res = await axios.get(baseUrl)
      console.log(res.data[0].photos[0])
      setImgSrc(res.data[0].photos[0].large_url)
      setCommonName(res.data[0].taxon.common_name.name)
      setSciName(res.data[0].taxon.name)
    }

    getObservations()
  }, [])

  return (
    <div className="species-card">
      <img className="species-image" src={imgSrc} alt="" />
      <div className="species-info">
        <div className="common-name">{commonName}</div>
        <div className="sci-name">{sciName}</div>
      </div>
    </div>
  )
}

export default SpeciesCard