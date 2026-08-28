import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Basic ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api

export * from './system'
export * from './globalConfig'
export * from './pathsConfig'
export * from './auth'
export * from './rtspConn'
export * from './rtspSession'
export * from './rtmpConn'
export * from './srtConn'
export * from './webrtc'
export * from './hlsMuxer'
export * from './recordings'
