import api from './axios'

export const login = (username, password) =>
  api.post('/auth/login/', { username, password }).then((r) => r.data)

export const register = (payload) =>
  api.post('/auth/register/', payload).then((r) => r.data)

export const getProfile = () =>
  api.get('/auth/profile/').then((r) => r.data)

export const updateProfile = (payload) =>
  api.patch('/auth/profile/', payload).then((r) => r.data)
