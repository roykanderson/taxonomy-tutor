import { useLocation } from "react-router-dom"

import { useTaxa } from "../hooks"

import StudyCardContent from "./StudyCardContent"
import LoadingIcon from "./LoadingIcon"

const StudyCardContainer = () => {
  const location = useLocation()
  const set = location.state

  const { data, isFetching } = useTaxa(set.taxonIds)

  if (isFetching) {
    return (
      <div className='study-card-loading-icon-container'>
        <LoadingIcon />
      </div>
    )
  }

  return (
    <>
      <StudyCardContent data={data} set={set} />
    </>
  )
}

export default StudyCardContainer