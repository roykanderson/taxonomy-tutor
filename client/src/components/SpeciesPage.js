import { useLocation } from "react-router-dom"

import { useWikiSummary } from "../hooks"
import { getDefaultPhotoUrl } from "../utils/helpers"
import LoadingIcon from "./LoadingIcon"

const SpeciesPage = () => {
  const location = useLocation()
  const taxon = location.state
  
  const { data, isFetching } = useWikiSummary(taxon.wikipedia_url)

  return (
    <main className="page-container">
      <div className="page-left">
        <div>
          <div className="page-title">
            <div className="page-names">
              <div className="page-common-name">{taxon.preferred_common_name}</div>
              <div className="page-sci-name">{taxon.name}</div>
            </div>
            <button className="page-button">
              <div className="button-text">Add to set</div>
              <div className="button-plus">+</div>
            </button>
          </div>
        </div>
        <div className="page-wiki">
          {isFetching
            ? <LoadingIcon />
            : data
              ? <>
                <div className="page-wiki-info">{data}</div>
                <div className="page-wiki-cite">Information from <a href={taxon.wikipedia_url}>Wikipedia</a></div>
                </>
              : <>No Wikipedia information</>
          }
        </div>
      </div>
      <img className="page-img" src={getDefaultPhotoUrl(taxon)} alt="species" />
    </main>
  )
}

export default SpeciesPage