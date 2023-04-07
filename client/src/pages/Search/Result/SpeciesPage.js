import { useState } from "react"
import { useLocation } from "react-router-dom"

import useWikiSummary from '../../../hooks/useWikiSummary'
import getDefaultPhotoUrl from '../../../utils/getDefaultPhotoUrl'
import LoadingIcon from "../../../components/LoadingIcon"
import SpeciesAddModal from "./SpeciesAddModal"

const SpeciesPage = () => {
  const location = useLocation()
  const taxon = location.state
  
  const { data, isFetching } = useWikiSummary(taxon.wikipedia_url)

  const [showModal, setShowModal] = useState(false)

  return (
    <main className="page-container">
      <div className="page-left">
        <div>
          <div className="page-title">
            <div className="page-names">
              <div className="page-common-name">{taxon.preferred_common_name}</div>
              <div className="page-sci-name">{taxon.name}</div>
            </div>
            <button className="page-button" onClick={() => setShowModal(true)}>
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
      {getDefaultPhotoUrl(taxon)
        ? <img className="page-img" src={getDefaultPhotoUrl(taxon)} alt="species" />
        : <div className="page-noimage">No image available.</div>
      }
      {showModal &&
        <SpeciesAddModal setShowModal={setShowModal} taxon={taxon} />
      }
    </main>
  )
}

export default SpeciesPage