import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const apiUrl = process.env.VITE_API_URL || 'http://127.0.0.1:5189'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
<<<<<<< HEAD
        target: process.env.VITE_API_URL || 'http://localhost:5000',
=======
        target: apiUrl,
>>>>>>> 2026/05/27-ChangedAPI_Db
        changeOrigin: true,
        secure: false,
      },
    },
  },
});