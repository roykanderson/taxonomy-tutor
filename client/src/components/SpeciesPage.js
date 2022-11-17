import { useLocation } from "react-router-dom"

import { useWikiSummary } from "../hooks"
import { getDefaultPhotoUrl } from "../utils/helpers"
import LoadingIcon from "./LoadingIcon"

const SpeciesPage = () => {
  const location = useLocation()
  const taxon = location.state

  console.log(taxon)
  
  const { data, isFetching } = useWikiSummary(taxon.wikipedia_url)

  return (
    <main className="container">
      <div className="page-left">
        <div className="page-text">
          <div>
            <div className="page-names">
              <div>{taxon.preferred_common_name}</div>
              <div>{taxon.name}</div>
            </div>
            <button>Add to set</button>
          </div>
          <div className="page-wiki">
            {isFetching
              ? <LoadingIcon />
              : data
                ? data
                : <>No Wikipedia information</>
            }
          </div>
        </div>
        <img src={getDefaultPhotoUrl(taxon)} alt="species" />
      </div>
    </main>
  )
}

export default SpeciesPage