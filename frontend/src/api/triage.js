import api from './axios'

export const submitTriage = (symptoms, notes, patient_name, patient_age, patient_gender, contact_number) =>
  api.post('/triage/', { 
    symptoms, 
    notes, 
    patient_name, 
    patient_age, 
    patient_gender, 
    contact_number 
  }).then((r) => r.data)

export const getTriageList = () =>
  api.get('/triage/').then((r) => r.data)

export const getTriageDetail = (id) =>
  api.get(`/triage/${id}/`).then((r) => r.data)
