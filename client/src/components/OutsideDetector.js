import { useRef } from "react"

import useOutsideDetector from '../hooks/useOutsideDetector'

import styles from './OutsideDetector.module.css'

const OutsideDetector = (props) => {
  const wrapperRef = useRef(null);
  useOutsideDetector(wrapperRef, props.sideEffectFn);

  return (
    <div className={styles.OutsideDetector} ref={wrapperRef}>
      {props.children}
    </div>
  )
}

export default OutsideDetector