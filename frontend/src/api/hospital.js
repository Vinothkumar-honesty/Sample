import api from './axios'

export const getHospitals = () =>
  api.get('/hospital/hospitals/').then((r) => r.data)

export const getHospitalDetail = (id) =>
  api.get(`/hospital/hospitals/${id}/`).then((r) => r.data)

export const getBeds = () =>
  api.get('/hospital/beds/').then((r) => r.data)

export const getDoctors = () =>
  api.get('/hospital/doctors/').then((r) => r.data)

export const getBedBookings = () =>
  api.get('/hospital/bed-bookings/').then((r) => r.data)

export const bookBed = (hospitalId, bedType) =>
  api.post('/hospital/bed-bookings/', { hospital_id: hospitalId, bed_type: bedType }).then((r) => r.data)

export const cancelBedBooking = (id) =>
  api.post(`/hospital/bed-bookings/${id}/cancel/`).then((r) => r.data)
