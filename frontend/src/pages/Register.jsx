import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register as apiRegister } from '../api/auth'
import { useToast } from '../context/ToastContext'
import { useTheme } from '../context/ThemeContext'
import './Auth.css'

export default function Register() {
  const toast = useToast()
  const { theme, toggleTheme } = useTheme()
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    role: 'PATIENT',
    phone: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await apiRegister(form)
      toast.success('Account created. Please sign in.')
      navigate('/login')
    } catch (err) {
      const data = err.response?.data
      const msg = typeof data === 'object' ? JSON.stringify(data) : (data?.detail || err.message || 'Registration failed')
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
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
      <div className="auth-card">
        <h1>CareHub</h1>
        <p className="auth-subtitle">Create account</p>
        <form onSubmit={handleSubmit}>
          {error && <div className="auth-error">{error}</div>}
          <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required minLength={8} />
          <input name="first_name" placeholder="First name" value={form.first_name} onChange={handleChange} />
          <input name="last_name" placeholder="Last name" value={form.last_name} onChange={handleChange} />
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="PATIENT">Patient</option>
            <option value="DOCTOR">Doctor</option>
            <option value="ADMIN">Admin</option>
          </select>
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
          <button type="submit" disabled={loading}>
            {loading ? 'Creating…' : 'Register'}
          </button>
        </form>
        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
