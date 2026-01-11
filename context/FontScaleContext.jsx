import { createContext, useContext, useState, useEffect } from 'react'

const FontScaleContext = createContext()

export function FontScaleProvider({ children }) {
  const [fontScale, setFontScale] = useState(() => {
    const stored = localStorage.getItem('fontScale')
    return stored ? parseFloat(stored) : 100
  })

  useEffect(() => {
    // Apply font scale using CSS variable
    const root = document.documentElement
    root.style.setProperty('--font-scale', `${fontScale}%`)
    
    // Also set as direct fontSize for backward compatibility
    root.style.fontSize = `${fontScale}%`
    
    // Persist font scale preference
    localStorage.setItem('fontScale', fontScale.toString())
  }, [fontScale])

  const value = {
    fontScale,
    setFontScale,
  }

  return <FontScaleContext.Provider value={value}>{children}</FontScaleContext.Provider>
}

export function useFontScale() {
  const context = useContext(FontScaleContext)
  if (!context) {
    throw new Error('useFontScale must be used within FontScaleProvider')
  }
  return context
}
