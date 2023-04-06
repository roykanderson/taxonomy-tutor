import { useRef } from "react"

import useOutsideDetector from '../hooks/useOutsideDetector'

const OutsideDetector = (props) => {
  const wrapperRef = useRef(null);
  useOutsideDetector(wrapperRef, props.sideEffectFn);

  return (
    <div className='outside-detector' ref={wrapperRef}>
      {props.children}
    </div>
  )
}

export default OutsideDetector