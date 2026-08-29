import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: { title: 'Login' }
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: { title: 'Painel', requiresAuth: true }
    },
    {
      path: '/paths',
      name: 'paths',
      component: () => import('@/views/Paths.vue'),
      meta: { title: 'Status das Rotas' }
    },
    {
      path: '/paths/config',
      name: 'pathsConfig',
      component: () => import('@/views/PathsConfig.vue'),
      meta: { title: 'Configuração das Rotas' }
    },
    {
      path: '/rtsp/connections',
      name: 'rtspConnections',
      component: () => import('@/views/RtspConnections.vue'),
      meta: { title: 'Conexões RTSP' }
    },
    {
      path: '/rtsp/sessions',
      name: 'rtspSessions',
      component: () => import('@/views/RtspSessions.vue'),
      meta: { title: 'Sessões RTSP' }
    },
    {
      path: '/rtmp/connections',
      name: 'rtmpConnections',
      component: () => import('@/views/RtmpConnections.vue'),
      meta: { title: 'Conexões RTMP' }
    },
    {
      path: '/rtmps/connections',
      name: 'rtmpsConnections',
      component: () => import('@/views/RtmpsConnections.vue'),
      meta: { title: 'Conexões RTMPS' }
    },
    {
      path: '/webrtc/sessions',
      name: 'webrtcSessions',
      component: () => import('@/views/WebRTCSessions.vue'),
      meta: { title: 'Sessões WebRTC' }
    },
    {
      path: '/hls/muxers',
      name: 'hlsMuxers',
      component: () => import('@/views/HlsMuxers.vue'),
      meta: { title: 'HLS Muxers' }
    },
    {
      path: '/hls/sessions',
      name: 'hlsSessions',
      component: () => import('@/views/HlsSessions.vue'),
      meta: { title: 'Sessões HLS' }
    },
    {
      path: '/moq/sessions',
      name: 'moqSessions',
      component: () => import('@/views/MoQSessions.vue'),
      meta: { title: 'Sessões MoQ' }
    },
    {
      path: '/srt/connections',
      name: 'srtConnections',
      component: () => import('@/views/SrtConnections.vue'),
      meta: { title: 'Conexões SRT' }
    },
    {
      path: '/recordings',
      name: 'recordings',
      component: () => import('@/views/Recordings.vue'),
      meta: { title: 'Gravações' }
    },
    {
      path: '/config',
      name: 'config',
      component: () => import('@/views/Config.vue'),
      meta: { title: 'Configuração do Sistema' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || 'MediaMTX'} - MediaMTX Admin`
  
  const isAuthenticated = !!(localStorage.getItem('authToken') || sessionStorage.getItem('authToken'))
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth !== false)
  
  if (to.path !== '/login' && !isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
