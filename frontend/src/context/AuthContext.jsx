import { createContext, useContext, useState, useEffect } from 'react'
import { getProfile } from '../api/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const loginUser = (userData) => {
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    setUser(null)
  }

  const refreshUser = async () => {
    const token = localStorage.getItem('access')
    if (!token) {
      setLoading(false)
      return
    }
    try {
      const profile = await getProfile()
      setUser(profile)
    } catch {
      logout()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('access')
    if (token) {
      getProfile()
        .then(setUser)
        .catch(logout)
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
