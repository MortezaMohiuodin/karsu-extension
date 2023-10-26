import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 9090,
    proxy: {
      '/api/': {
        // target: 'http://172.16.21.100/',
        target: 'https://stage2.karsu.ir/',
        changeOrigin: true,
        secure: false,
      },
      '/Upload/': {
        // target: 'http://172.16.21.100/',
        target: 'https://stage2.karsu.ir/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
