import { useEffect } from 'react'

// useOutsideAlerter accepts a ref and a sideEffectFn. It binds a mousedown event listener to the document, and
// fires the sideEffectFn if a mousedown event occurs within the ref element.

// This hook is utilized to detect clicks outside of an element.

const useOutsideAlerter = (ref, sideEffectFn) => {
  useEffect(() => {
    // Fire sideEffectFn if click occurs outside element
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        sideEffectFn()
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref, sideEffectFn])
}

export default useOutsideAlerter