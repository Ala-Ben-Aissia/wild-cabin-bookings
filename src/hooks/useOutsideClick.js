import React from 'react'

export default function useOutsideClick(
  callback,
  listenDuringCapture = true
) {
  const elementRef = React.useRef()

  React.useEffect(() => {
    function handleClick(event) {
      if (
        elementRef.current &&
        !elementRef.current?.contains(event.target)
      )
        callback()
    }

    document.addEventListener(
      'click',
      handleClick,
      listenDuringCapture
    )

    return () =>
      document.removeEventListener(
        'click',
        handleClick,
        listenDuringCapture
      )
  }, [callback, listenDuringCapture])

  return elementRef
}
