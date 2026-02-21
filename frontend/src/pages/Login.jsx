import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { useTheme } from '../context/ThemeContext'
import { login } from '../api/auth'
import { sendEmergencySOS } from '../api/emergency'
import './Auth.css'

export default function Login() {
  const { theme, toggleTheme } = useTheme()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sosLoading, setSosLoading] = useState(false)
  const { loginUser } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await login(username, password)
      localStorage.setItem('access', data.access)
      localStorage.setItem('refresh', data.refresh)
      loginUser(data.user)
      toast.success('Signed in successfully')
      navigate(data.user?.role === 'ADMIN' ? '/admin' : '/dashboard')
    } catch (err) {
      const msg = err.response?.data?.detail || err.message || 'Login failed'
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleSOS = async () => {
    if (sosLoading) return
    
    setSosLoading(true)
    
    if (!navigator.geolocation) {
      toast.error('Geolocation not supported')
      setSosLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          await sendEmergencySOS(latitude, longitude)
          toast.success('🚨 Emergency services notified! Ambulance on the way.')
          
          // Show emergency info
          alert(
            `🚨 EMERGENCY ALERT\n\n` +
            `✓ Ambulance dispatched to your location\n` +
            `✓ ETA: 5-10 minutes\n` +
            `✓ Emergency Number: 911\n\n` +
            `Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}\n\n` +
            `Stay calm. Help is on the way.`
          )
        } catch (err) {
          toast.error('Failed to send SOS. Call 911 directly.')
        } finally {
          setSosLoading(false)
        }
      },
      (err) => {
        toast.error('Location access denied. Please enable location.')
        setSosLoading(false)
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  return (
    <div className="auth-page">
      <button
        type="button"
        className="auth-theme-toggle"
        onClick={toggleTheme}
        title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
      
      <button
        type="button"
        className="sos-button"
        onClick={handleSOS}
        disabled={sosLoading}
        title="Emergency SOS - Call Ambulance"
      >
        {sosLoading ? '📡' : '🚨'}
        <span>SOS</span>
      </button>

      <div className="auth-card">
        <h1>CareHub</h1>
        <p className="auth-subtitle">Sign in</p>
        <form onSubmit={handleSubmit}>
          {error && <div className="auth-error">{error}</div>}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  )
}
