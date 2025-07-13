import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // equivale a '0.0.0.0'
    port: 5173,  // pode mudar se quiser outra porta
  }
  
})
