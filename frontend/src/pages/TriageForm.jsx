import { useState } from 'react'
import { submitTriage } from '../api/triage'
import { useToast } from '../context/ToastContext'
import ProgressBar from '../components/ProgressBar'
import { SYMPTOM_OPTIONS, URGENCY_CLASS } from '../utils/constants'
import './TriageForm.css'

export default function TriageForm() {
  const toast = useToast()
  const [formData, setFormData] = useState({
    patient_name: '',
    patient_age: '',
    patient_gender: '',
    contact_number: '',
    symptoms: [],
    notes: ''
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const toggleSymptom = (s) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(s) 
        ? prev.symptoms.filter((x) => x !== s) 
        : [...prev.symptoms, s]
    }))
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.patient_name.trim()) {
      setError('Patient name is required')
      return
    }
    if (!formData.patient_age || formData.patient_age < 0 || formData.patient_age > 150) {
      setError('Valid age (0-150) is required')
      return
    }
    if (formData.symptoms.length === 0) {
      setError('Select at least one symptom')
      return
    }
    setError('')
    setResult(null)
    setLoading(true)
    try {
      const data = await submitTriage(
        formData.symptoms, 
        formData.notes,
        formData.patient_name,
        parseInt(formData.patient_age),
        formData.patient_gender,
        formData.contact_number
      )
      setResult(data)
      toast.success('Triage assessment completed')
      setFormData({
        patient_name: '',
        patient_age: '',
        patient_gender: '',
        contact_number: '',
        symptoms: [],
        notes: ''
      })
    } catch (err) {
      const msg = err.response?.data?.detail || err.message || 'Submission failed'
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const getUrgencyMessage = (urgency) => {
    if (urgency === 'HIGH') return '🚨 Seek emergency care immediately!'
    if (urgency === 'MEDIUM') return '⚠️ Visit a clinic or doctor soon.'
    return '✅ Home care may be sufficient. Monitor symptoms.'
  }

  return (
    <div className="triage-page">
      <h1>🩺 Smart Triage Assessment</h1>
      <p className="muted">Enter patient details and symptoms for AI-powered triage analysis.</p>
      
      {result && (
        <div className={`triage-result card ${URGENCY_CLASS[result.urgency] || ''}`}>
          <h3>📋 Assessment Result</h3>
          <div className="patient-info">
            <strong>{result.patient_name}</strong>, {result.patient_age}y {result.patient_gender && `(${result.patient_gender})`}
          </div>
          <div className="result-grid">
            <div className="result-item">
              <span className="result-label">Urgency Level</span>
              <span className={`badge ${URGENCY_CLASS[result.urgency]}`}>{result.urgency}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Priority Score</span>
              <span className="result-score">{result.score}/100</span>
            </div>
          </div>
          <div className="result-progress">
            <ProgressBar
              value={result.score}
              variant={result.urgency === 'HIGH' ? 'danger' : result.urgency === 'MEDIUM' ? 'warning' : 'success'}
              showLabel
            />
          </div>
          {result.clinical_terminology && (
            <div className="clinical-info">
              <strong>Clinical Terminology:</strong>
              <p>{result.clinical_terminology}</p>
            </div>
          )}
          {result.suggested_department && (
            <div className="department-info">
              <strong>🏥 Suggested Department:</strong>
              <p>{result.suggested_department}</p>
            </div>
          )}
          {result.ai_summary && (
            <div className="ai-summary">
              <strong>AI Summary:</strong>
              <p>{result.ai_summary}</p>
            </div>
          )}
          <p className="result-message">{getUrgencyMessage(result.urgency)}</p>
          <p className="muted small">Submitted: {new Date(result.created_at).toLocaleString()}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="triage-form">
        {error && <div className="auth-error">{error}</div>}
        
        <div className="form-section">
          <h3>👤 Patient Information</h3>
          <div className="form-grid">
            <div className="form-field">
              <label>Patient Name *</label>
              <input
                type="text"
                name="patient_name"
                value={formData.patient_name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="form-field">
              <label>Age *</label>
              <input
                type="number"
                name="patient_age"
                value={formData.patient_age}
                onChange={handleChange}
                min="0"
                max="150"
                placeholder="45"
                required
              />
            </div>
            <div className="form-field">
              <label>Gender</label>
              <select name="patient_gender" value={formData.patient_gender} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-field">
              <label>Contact Number</label>
              <input
                type="tel"
                name="contact_number"
                value={formData.contact_number}
                onChange={handleChange}
                placeholder="+1234567890"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>🩺 Symptoms ({formData.symptoms.length} selected)</h3>
          <div className="symptom-grid">
            {SYMPTOM_OPTIONS.map((s) => (
              <label key={s} className="symptom-chip">
                <input
                  type="checkbox"
                  checked={formData.symptoms.includes(s)}
                  onChange={() => toggleSymptom(s)}
                />
                <span>{s.replace(/_/g, ' ')}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-section">
          <label>
            <strong>Additional Notes</strong>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Describe any additional symptoms, duration, or concerns..."
            />
          </label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? '⏳ Analyzing...' : '🔍 Analyze & Triage'}
        </button>
      </form>
    </div>
  )
}
