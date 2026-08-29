import api from '@/api'

export const listMoQSessions = (page = 0, itemsPerPage = 100) =>
  api.get('/v3/moqsessions/list', { params: { page, itemsPerPage } })

export const getMoQSession = (id: string) =>
  api.get(`/v3/moqsessions/get/${id}`)

export const kickMoQSession = (id: string) =>
  api.post(`/v3/moqsessions/kick/${id}`)
