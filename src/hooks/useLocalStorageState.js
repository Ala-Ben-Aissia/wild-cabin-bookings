import { useState, useEffect, useRef } from 'react'

export function useLocalStorageState(
  defaultValue = '',
  key,
  { serialize = JSON.stringify, deserialize = JSON.parse } = {},
) {
  const [value, setValue] = useState(() => {
    const valueInLocalStorage = localStorage.getItem(key)
    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage)
    }
    return typeof defaultValue === 'function'
      ? defaultValue()
      : defaultValue
  })

  const prevKeyRef = useRef(key)

  useEffect(() => {
    const prevKey = prevKeyRef.current
    if (key !== prevKey) {
      localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    localStorage.setItem(key, serialize(value))
  }, [key, serialize, value])

  return [value, setValue]
}
