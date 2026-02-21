import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getTriageList } from '../api/triage'
import { getAppointments } from '../api/appointments'
import { getSurgePrediction } from '../api/prediction'
import { URGENCY_CLASS } from '../utils/constants'
import { DashboardSkeleton } from '../components/Skeleton'
import './Dashboard.css'

export default function PatientDashboard() {
  const [triage, setTriage] = useState([])
  const [appointments, setAppointments] = useState([])
  const [surge, setSurge] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const [t, a, s] = await Promise.all([
          getTriageList().catch(() => []),
          getAppointments().catch(() => []),
          getSurgePrediction(1).catch(() => null),
        ])
        setTriage(Array.isArray(t) ? t : (t && t.results) || [])
        setAppointments(Array.isArray(a) ? a : (a && a.results) || [])
        setSurge(s)
      } catch (e) {
        setError(e.message || 'Failed to load')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <DashboardSkeleton />
  if (error) return <div className="page-error">⚠️ {error}</div>

  const scheduled = appointments.filter((x) => x.status === 'SCHEDULED')
  const latestTriage = triage[0]

  return (
    <div className="dashboard">
      <h1>🏥 Patient Dashboard</h1>
      <section className="dashboard-cards">
        <div className="card stat-card">
          <div className="stat-icon">🩺</div>
          <h3>Triage Assessments</h3>
          <p className="stat-number">{triage.length}</p>
          <p className="muted">Total submissions</p>
          <Link to="/triage">→ New Assessment</Link>
        </div>
        <div className="card stat-card">
          <div className="stat-icon">📅</div>
          <h3>Appointments</h3>
          <p className="stat-number">{scheduled.length}</p>
          <p className="muted">Scheduled visits</p>
          <Link to="/appointments">→ Manage</Link>
        </div>
        {surge != null && (
          <div className="card surge-card">
            <div className="stat-icon">📈</div>
            <h3>Hospital Surge</h3>
            <p className="surge-value">{surge.surge_prediction_percentage > 0 ? '+' : ''}{surge.surge_prediction_percentage}%</p>
            <p className="muted">Next 24 hours prediction</p>
          </div>
        )}
      </section>

      {latestTriage && (
        <section className="latest-assessment">
          <h2>📊 Latest Assessment</h2>
          <div className="card assessment-card">
            <div className="assessment-header">
              <span className={`badge ${URGENCY_CLASS[latestTriage.urgency]}`}>{latestTriage.urgency}</span>
              <span className="assessment-date">{new Date(latestTriage.created_at).toLocaleDateString()}</span>
            </div>
            <div className="assessment-score">
              <div className="score-label">Priority Score</div>
              <div className="score-value">{latestTriage.score}<span>/100</span></div>
              <div className="score-bar">
                <div className="score-fill" style={{ width: `${latestTriage.score}%` }}></div>
              </div>
            </div>
            <div className="assessment-symptoms">
              <strong>Symptoms:</strong> {latestTriage.symptoms?.join(', ').replace(/_/g, ' ') || 'N/A'}
            </div>
          </div>
        </section>
      )}

      <section>
        <h2>📋 Recent Triage History</h2>
        {triage.length === 0 ? (
          <p className="muted">No triage submissions yet. <Link to="/triage">Submit symptoms</Link>.</p>
        ) : (
          <ul className="triage-list">
            {triage.slice(0, 5).map((t) => (
              <li key={t.id}>
                <span className={`badge ${URGENCY_CLASS[t.urgency] || ''}`}>{t.urgency}</span>
                <span className="triage-score">Score: <strong>{t.score}/100</strong></span>
                <span className="triage-date">{new Date(t.created_at).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
