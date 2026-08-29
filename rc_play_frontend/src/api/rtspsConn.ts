import api from '@/api'

export const listRtspsConns = (page = 0, itemsPerPage = 100) =>
  api.get('/v3/rtspsconns/list', { params: { page, itemsPerPage } })

export const getRtspsConn = (id: string) =>
  api.get(`/v3/rtspsconns/get/${id}`)
