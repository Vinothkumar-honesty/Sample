import { useState, useEffect } from 'react'
import { getHospitals } from '../api/hospital'
import './HospitalFinder.css'

export default function HospitalFinder() {
  const [hospitals, setHospitals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getHospitals()
      .then((data) => setHospitals(Array.isArray(data) ? data : data.results || []))
      .catch((e) => setError(e.message || 'Failed to load'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="page-loading"><div className="spinner" /> Loading…</div>
  if (error) return <div className="page-error">{error}</div>

  return (
    <div className="hospital-finder">
      <h1>Hospital finder</h1>
      <p className="muted">Real-time bed availability</p>
      <div className="hospital-cards">
        {hospitals.map((h) => (
          <div key={h.id} className="card bed-card">
            <h3>{h.name}</h3>
            <p className="address">{h.address || '—'}</p>
            {h.beds && h.beds.length > 0 ? (
              <div className="bed-status">
                {h.beds.map((b) => (
                  <div key={b.id} className="bed-row">
                    <span className="bed-type">{b.bed_type}</span>
                    <span className="bed-available">{b.available} / {b.total} available</span>
                  </div>
                ))}
              </div>
            ) : h.bed_summary && (
              <div className="bed-status">
                {Object.entries(h.bed_summary).map(([type, info]) => (
                  <div key={type} className="bed-row">
                    <span className="bed-type">{type}</span>
                    <span className="bed-available">{info.available} / {info.total} available</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
