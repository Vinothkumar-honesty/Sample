import { useState, useEffect } from 'react'
import { getHospitals } from '../api/hospital'
import { getSurgePrediction } from '../api/prediction'
import './Dashboard.css'

export default function AdminDashboard() {
  const [hospitals, setHospitals] = useState([])
  const [surge, setSurge] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const [h, s] = await Promise.all([
          getHospitals().catch(() => []),
          getSurgePrediction(1).catch(() => null),
        ])
        setHospitals(Array.isArray(h) ? h : (h && h.results) || [])
        setSurge(s)
      } catch (e) {
        setError(e.message || 'Failed to load')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <div className="page-loading"><div className="spinner" /> Loading…</div>
  if (error) return <div className="page-error">{error}</div>

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      {surge != null && (
        <div className="card surge-card admin-surge">
          <h3>Patient surge prediction (next 24h)</h3>
          <p className="surge-value">{surge.surge_prediction_percentage}%</p>
        </div>
      )}
      <section>
        <h2>Hospitals & bed summary</h2>
        <div className="hospital-grid">
          {hospitals.map((h) => (
            <div key={h.id} className="card hospital-card">
              <h3>{h.name}</h3>
              <p className="muted">{h.address || '—'}</p>
              {h.bed_summary && (
                <ul className="bed-summary">
                  {Object.entries(h.bed_summary).map(([type, info]) => (
                    <li key={type}>
                      {type}: {info.available}/{info.total} available
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
