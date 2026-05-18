import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl'

export default defineConfig({
  plugins: [glsl()],
  resolve: {
    alias: {
      '@assets': '/src/assets',
      '@webgl': '/src/webgl',
      '@data': '/src/data',
      '@utils': '/src/utils',
      '@ui': '/src/ui',
    },
  },
})
