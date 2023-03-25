import { useRef } from "react"

import { useOutsideAlerter } from "../hooks";

const OutsideAlerter = (props) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props.sideEffectFn);

  return (
    <div className='outside-alerter' ref={wrapperRef}>
      {props.children}
    </div>
  )
}

export default OutsideAlerter