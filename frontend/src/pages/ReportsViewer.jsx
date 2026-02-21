import { useState, useEffect } from 'react'
import { getReports, getReportFileUrl } from '../api/records'
import './ReportsViewer.css'

export default function ReportsViewer() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getReports()
      .then((data) => setReports(Array.isArray(data) ? data : data.results || []))
      .catch((e) => setError(e.message || 'Failed to load'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="page-loading"><div className="spinner" /> Loading…</div>
  if (error) return <div className="page-error">{error}</div>

  return (
    <div className="reports-viewer">
      <h1>Medical reports</h1>
      <p className="muted">Your uploaded reports and history</p>
      <ul className="reports-list">
        {reports.length === 0 ? (
          <li className="muted">No reports yet.</li>
        ) : (
          reports.map((r) => (
            <li key={r.id} className="card report-item">
              <div>
                <strong>{r.title}</strong>
                {r.notes && <p className="muted small">{r.notes}</p>}
                <span className="date">{new Date(r.created_at).toLocaleDateString()}</span>
              </div>
              {r.file && (
                <a href={getReportFileUrl(r.file)} target="_blank" rel="noopener noreferrer" className="btn-download">
                  Open file
                </a>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
