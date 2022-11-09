import { useLocation } from "react-router-dom"

import { useWikiSummary } from "../hooks"
import LoadingIcon from "./LoadingIcon"

const SpeciesPage = () => {
  const location = useLocation()
  const taxon = location.state
  
  const { data, isLoading } = useWikiSummary(taxon.wikipedia_url)
  console.log(data)
  
  return (
    <main className="container">
      <div>
        <div>
          <div>{taxon.preferred_common_name}</div>
          <div>{taxon.name}</div>
        </div>
        <button>Add to set</button>
      </div>
      <div>
        {isLoading
          ? <LoadingIcon />
          : data
        }
      </div>
    </main>
  )
}

export default SpeciesPage