import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '@assets': '/src/assets',
      '@webgl': '/src/webgl',
      '@data': '/src/data',
    },
  },
})
