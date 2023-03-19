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
      <LoadingIcon />
    )
  }

  return (
    <>
      <StudyCardContent data={data} set={set} />
    </>
  )
}

export default StudyCardContainer