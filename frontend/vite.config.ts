

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   
  server: {
    host: '0.0.0.0',  // equivale a '0.0.0.0'
    port: 5173,  // pode mudar se quiser outra porta
    strictPort: true // Dá erro se a porta estiver ocupada, ao invés de trocar
  }
  
})
