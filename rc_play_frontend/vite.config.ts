import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://rc_play_server:9997',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/playback': {
        target: 'http://rc_play_server:9996',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/playback/, '')
      },
      '/webrtc': {
        target: 'http://rc_play_server:8889',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/webrtc/, '')
      }
    }
  }
})
