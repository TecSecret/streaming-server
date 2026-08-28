import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000
})

api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('apiUser')
    const pass = localStorage.getItem('apiPass')
    if (user && pass) {
      config.auth = { username: user, password: pass }
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('apiUser')
      localStorage.removeItem('apiPass')
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
