import api from './axios'

const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
const origin = apiBase.replace(/\/api\/?$/, '')

export const getReports = () =>
  api.get('/records/').then((r) => r.data)

export const getReportDetail = (id) =>
  api.get(`/records/${id}/`).then((r) => r.data)

export const uploadReport = (formData) =>
  api.post('/records/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((r) => r.data)

export const getReportFileUrl = (path) =>
  path ? (path.startsWith('http') ? path : `${origin}${path.startsWith('/') ? '' : '/'}${path}`) : null
