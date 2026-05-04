import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/react-variant-explorer/',
  resolve: {
    alias: {
      'react-variant-explorer': resolve(__dirname, '../src/index.ts'),
    },
  },
})
