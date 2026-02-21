import { Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './DashboardLayout.css'

export default function DashboardLayout() {
  const { user } = useAuth()

  return (
    <div className="dashboard-layout">
      <div className="dashboard-header">
        <div className="user-info">
          <div className="user-avatar">
            {user?.first_name?.[0] || user?.username?.[0] || 'U'}
          </div>
          <div className="user-details">
            <h2>{user?.first_name} {user?.last_name || user?.username}</h2>
            <span className="user-role-badge">{user?.role}</span>
          </div>
        </div>
      </div>
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  )
}
