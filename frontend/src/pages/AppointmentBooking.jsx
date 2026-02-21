import { useState, useEffect } from 'react'
import { getAppointments, createAppointment, cancelAppointment } from '../api/appointments'
import { getHospitals } from '../api/hospital'
import { getDoctors } from '../api/hospital'
import './AppointmentBooking.css'

export default function AppointmentBooking() {
  const [appointments, setAppointments] = useState([])
  const [hospitals, setHospitals] = useState([])
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ hospital: '', doctor: '', scheduled_at: '', notes: '' })
  const [submitting, setSubmitting] = useState(false)

  const load = () => {
    Promise.all([
      getAppointments(),
      getHospitals(),
      getDoctors(),
    ])
      .then(([a, h, d]) => {
        setAppointments(Array.isArray(a) ? a : (a && a.results) || [])
        setHospitals(Array.isArray(h) ? h : (h && h.results) || [])
        setDoctors(Array.isArray(d) ? d : (d && d.results) || [])
      })
      .catch((e) => setError(e.message || 'Failed to load'))
      .finally(() => setLoading(false))
  }

  useEffect(() => load(), [])

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleBook = async (e) => {
    e.preventDefault()
    if (!form.hospital || !form.scheduled_at) {
      setError('Select hospital and date/time')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      await createAppointment({
        hospital: Number(form.hospital),
        doctor: form.doctor ? Number(form.doctor) : null,
        scheduled_at: new Date(form.scheduled_at).toISOString(),
        notes: form.notes,
      })
      setForm({ hospital: '', doctor: '', scheduled_at: '', notes: '' })
      load()
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Booking failed')
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this appointment?')) return
    try {
      await cancelAppointment(id)
      load()
    } catch (e) {
      setError(e.message || 'Cancel failed')
    }
  }

  if (loading) return <div className="page-loading"><div className="spinner" /> Loading…</div>

  const scheduled = appointments.filter((x) => x.status === 'SCHEDULED')

  return (
    <div className="appointment-booking">
      <h1>Appointments</h1>
      {error && <div className="auth-error">{error}</div>}
      <section className="book-form card">
        <h2>Book appointment</h2>
        <form onSubmit={handleBook}>
          <label>
            Hospital
            <select name="hospital" value={form.hospital} onChange={handleChange} required>
              <option value="">Select</option>
              {hospitals.map((h) => (
                <option key={h.id} value={h.id}>{h.name}</option>
              ))}
            </select>
          </label>
          <label>
            Doctor (optional)
            <select name="doctor" value={form.doctor} onChange={handleChange}>
              <option value="">Any</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>{d.name} — {d.specialization || '—'}</option>
              ))}
            </select>
          </label>
          <label>
            Date & time
            <input
              type="datetime-local"
              name="scheduled_at"
              value={form.scheduled_at}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Notes
            <input type="text" name="notes" value={form.notes} onChange={handleChange} placeholder="Optional" />
          </label>
          <button type="submit" disabled={submitting}>{submitting ? 'Booking…' : 'Book'}</button>
        </form>
      </section>
      <section>
        <h2>Your appointments</h2>
        <ul className="appointment-list">
          {scheduled.length === 0 ? (
            <li className="muted">No scheduled appointments.</li>
          ) : (
            scheduled.map((a) => (
              <li key={a.id} className="card appointment-item">
                <div>
                  <strong>{a.hospital_detail?.name || a.hospital}</strong>
                  {a.queue_position != null && (
                    <span className="queue-badge">Queue # {a.queue_position}</span>
                  )}
                </div>
                <div className="muted">{new Date(a.scheduled_at).toLocaleString()}</div>
                <button type="button" className="btn-cancel" onClick={() => handleCancel(a.id)}>Cancel</button>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  )
}
