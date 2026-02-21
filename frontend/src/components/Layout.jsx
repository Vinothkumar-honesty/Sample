import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import './Layout.css'

export default function Layout() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="layout">
      <header className="layout-header">
        <Link to="/" className="brand">CareHub</Link>
        <nav className="nav">
          {user?.role === 'ADMIN' && (
            <Link to="/admin">Admin</Link>
          )}
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/triage">Triage</Link>
          <Link to="/beds">Bed Availability</Link>
          <Link to="/hospitals">Hospitals</Link>
          <Link to="/appointments">Appointments</Link>
          <Link to="/reports">Reports</Link>
          <button
            type="button"
            className="btn-theme"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label={`Current: ${theme}. Switch theme`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <span className="user-role">{user?.role}</span>
          <button type="button" className="btn-logout" onClick={handleLogout}>Logout</button>
        </nav>
      </header>
      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  )
}
