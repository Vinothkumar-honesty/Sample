import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)

const LIGHT_VARS = {
  '--bg': '#f8fafc',
  '--bg-gradient': 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  '--surface': '#ffffff',
  '--surface-hover': '#f1f5f9',
  '--border': '#cbd5e1',
  '--text': '#0f172a',
  '--muted': '#64748b',
  '--card-bg': 'rgba(255, 255, 255, 0.9)',
  '--auth-card-bg': 'rgba(255, 255, 255, 0.95)',
  '--input-bg': 'rgba(241, 245, 249, 0.8)',
}

const DARK_VARS = {
  '--bg': '#0a0e27',
  '--bg-gradient': 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
  '--surface': '#1e293b',
  '--surface-hover': '#2d3748',
  '--border': '#334155',
  '--text': '#f1f5f9',
  '--muted': '#94a3b8',
  '--card-bg': 'rgba(30, 41, 59, 0.6)',
  '--auth-card-bg': 'rgba(30, 41, 59, 0.9)',
  '--input-bg': 'rgba(15, 23, 42, 0.5)',
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme')
      return stored === 'light' ? 'light' : 'dark'
    }
    return 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    const vars = theme === 'light' ? LIGHT_VARS : DARK_VARS
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v))
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setThemeState((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
