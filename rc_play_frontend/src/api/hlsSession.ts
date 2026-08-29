import api from '@/api'

export const listHlsSessions = (page = 0, itemsPerPage = 100) =>
  api.get('/v3/hlssessions/list', { params: { page, itemsPerPage } })

export const getHlsSession = (id: string) =>
  api.get(`/v3/hlssessions/get/${id}`)

export const kickHlsSession = (id: string) =>
  api.post(`/v3/hlssessions/kick/${id}`)
