import { useEffect, useState } from 'react'

import axios from 'axios'

const SpeciesCard = () => {  
  const [imgSrc, setImgSrc] = useState(null)

  useEffect(() => {
    console.log('effect')
    const baseUrl = 'https://www.inaturalist.org/observations.json?has[]=photos&taxon_name=phaeophyta'
    const getObservations = async () => {
      const res = await axios.get(baseUrl)
      console.log(res.data[0].photos[0])
      setImgSrc(res.data[0].photos[0].large_url)
    }

    getObservations()
  }, [])

  return (
    <img src={imgSrc} alt="" />
  )
}

export default SpeciesCard