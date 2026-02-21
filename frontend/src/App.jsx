import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import PatientDashboard from './pages/PatientDashboard'
import AdminDashboard from './pages/AdminDashboard'
import TriageForm from './pages/TriageForm'
import HospitalFinder from './pages/HospitalFinder'
import BedAvailability from './pages/BedAvailability'
import AppointmentBooking from './pages/AppointmentBooking'
import ReportsViewer from './pages/ReportsViewer'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="app-loading">
        <div className="spinner" /> Loading…
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to={user?.role === 'ADMIN' ? '/admin' : '/dashboard'} replace />} />
        <Route path="dashboard" element={<PatientDashboard />} />
        <Route path="admin" element={<ProtectedRoute role="ADMIN"><AdminDashboard /></ProtectedRoute>} />
        <Route path="triage" element={<TriageForm />} />
        <Route path="hospitals" element={<HospitalFinder />} />
        <Route path="beds" element={<BedAvailability />} />
        <Route path="appointments" element={<AppointmentBooking />} />
        <Route path="reports" element={<ReportsViewer />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
