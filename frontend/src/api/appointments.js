import api from './axios'

export const getAppointments = () =>
  api.get('/appointments/').then((r) => r.data)

export const createAppointment = (payload) =>
  api.post('/appointments/', payload).then((r) => r.data)

export const cancelAppointment = (id) =>
  api.post(`/appointments/${id}/cancel/`).then((r) => r.data)

export const getAppointmentDetail = (id) =>
  api.get(`/appointments/${id}/`).then((r) => r.data)
