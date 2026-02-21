import { useState, useEffect } from 'react'
import { getHospitals, getBedBookings, bookBed, cancelBedBooking } from '../api/hospital'
import { useToast } from '../context/ToastContext'
import './BedAvailability.css'

export default function BedAvailability() {
  const [hospitals, setHospitals] = useState([])
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [bookingInProgress, setBookingInProgress] = useState(null)
  const toast = useToast()

  const loadData = async () => {
    try {
      const [hData, bData] = await Promise.all([
        getHospitals(),
        getBedBookings().catch(() => []),
      ])
      setHospitals(Array.isArray(hData) ? hData : hData.results || [])
      setBookings(Array.isArray(bData) ? bData : [])
      setError('')
    } catch (e) {
      setError(e.message || 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  const handleBookBed = async (hospitalId, bedType) => {
    const key = `${hospitalId}-${bedType}`
    setBookingInProgress(key)
    try {
      await bookBed(hospitalId, bedType)
      toast.success('Bed registered successfully')
      await loadData()
    } catch (e) {
      toast.error(e.response?.data?.detail || e.message || 'Failed to register bed')
    } finally {
      setBookingInProgress(null)
    }
  }

  const handleCancelBooking = async (id) => {
    if (!window.confirm('Cancel this bed registration?')) return
    try {
      await cancelBedBooking(id)
      toast.success('Bed registration cancelled')
      await loadData()
    } catch (e) {
      toast.error(e.message || 'Cancel failed')
    }
  }

  useEffect(() => {
    loadData()
    
    if (autoRefresh) {
      const interval = setInterval(loadData, 10000) // Refresh every 10 seconds
      return () => clearInterval(interval)
    }
  }, [autoRefresh])

  const getBedStatus = (available, total) => {
    const percentage = (available / total) * 100
    if (percentage > 50) return 'available'
    if (percentage > 20) return 'limited'
    return 'critical'
  }

  if (loading) return <div className="page-loading"><div className="spinner" /> Loading bed availability...</div>
  if (error) return <div className="page-error">⚠️ {error}</div>

  return (
    <div className="bed-availability">
      <div className="page-header">
        <h1>🏥 Real-Time Bed Availability</h1>
        <div className="header-actions">
          <label className="auto-refresh">
            <input 
              type="checkbox" 
              checked={autoRefresh} 
              onChange={(e) => setAutoRefresh(e.target.checked)}
            />
            <span>Auto-refresh (10s)</span>
          </label>
          <button onClick={loadData} className="btn-refresh">🔄 Refresh Now</button>
        </div>
      </div>

      <div className="hospitals-grid">
        {hospitals.map((hospital) => (
          <div key={hospital.id} className="hospital-card">
            <div className="hospital-header">
              <h3>{hospital.name}</h3>
              <span className="hospital-location">📍 {hospital.address || 'N/A'}</span>
              <span className="hospital-phone">📞 {hospital.phone || 'N/A'}</span>
            </div>

            <div className="beds-section">
              <h4>Bed Availability</h4>
              {hospital.bed_summary ? (
                <div className="bed-types">
                  {Object.entries(hospital.bed_summary).map(([type, info]) => {
                    const status = getBedStatus(info.available, info.total)
                    return (
                      <div key={type} className={`bed-type-card ${status}`}>
                        <div className="bed-type-header">
                          <span className="bed-icon">
                            {type === 'ICU' ? '🏥' : type === 'OXYGEN' ? '💨' : '🛏️'}
                          </span>
                          <span className="bed-type-name">{type}</span>
                        </div>
                        <div className="bed-stats">
                          <div className="stat-item">
                            <span className="stat-label">Available</span>
                            <span className="stat-value available">{info.available}</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-label">Occupied</span>
                            <span className="stat-value occupied">{info.occupied}</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-label">Total</span>
                            <span className="stat-value total">{info.total}</span>
                          </div>
                        </div>
                        <div className="bed-progress">
                          <div 
                            className="bed-progress-bar" 
                            style={{ width: `${(info.occupied / info.total) * 100}%` }}
                          ></div>
                        </div>
                        <div className="bed-percentage">
                          {Math.round((info.available / info.total) * 100)}% Available
                        </div>
                        <button
                          type="button"
                          className="btn-book-bed"
                          disabled={info.available <= 0 || bookingInProgress === `${hospital.id}-${type}`}
                          onClick={() => handleBookBed(hospital.id, type)}
                        >
                          {bookingInProgress === `${hospital.id}-${type}` ? '...' : info.available <= 0 ? 'No beds' : 'Register bed'}
                        </button>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="no-data">No bed data available</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {bookings.length > 0 && (
        <section className="my-bed-bookings">
          <h3>My bed registrations</h3>
          <ul className="booking-list">
            {bookings.map((b) => (
              <li key={b.id} className="booking-item">
                <span><strong>{b.hospital_name}</strong> – {b.bed_type}</span>
                <button type="button" className="btn-cancel-booking" onClick={() => handleCancelBooking(b.id)}>Cancel</button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {hospitals.length === 0 && (
        <div className="no-hospitals">
          <p>No hospitals found. Run seed command:</p>
          <code>python manage.py seed_hospitals</code>
        </div>
      )}
    </div>
  )
}
