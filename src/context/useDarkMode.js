import { useContext } from 'react'
import { DarkModeContext } from './DarkModeContext'

export function useDarkMode() {
  const context = useContext(DarkModeContext)
  if (!context)
    throw new Error(
      'DarkModeContext must be used within (as a child of) DarkModeProvider!',
    )

  return context
}
