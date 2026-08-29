import api from '@/api'

export const listRtspsSessions = (page = 0, itemsPerPage = 100) =>
  api.get('/v3/rtspssessions/list', { params: { page, itemsPerPage } })

export const getRtspsSession = (id: string) =>
  api.get(`/v3/rtspssessions/get/${id}`)

export const kickRtspsSession = (id: string) =>
  api.post(`/v3/rtspssessions/kick/${id}`)
