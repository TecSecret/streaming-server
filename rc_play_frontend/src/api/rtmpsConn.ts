import api from '@/api'

export const listRtmpsConns = (page = 0, itemsPerPage = 100) =>
  api.get('/v3/rtmpsconns/list', { params: { page, itemsPerPage } })

export const getRtmpsConn = (id: string) =>
  api.get(`/v3/rtmpsconns/get/${id}`)

export const kickRtmpsConn = (id: string) =>
  api.post(`/v3/rtmpsconns/kick/${id}`)
