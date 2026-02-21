import api from './axios'

export const getSurgePrediction = (daysAhead = 1) =>
  api.get('/prediction/surge/', { params: { days_ahead: daysAhead } }).then((r) => r.data)
