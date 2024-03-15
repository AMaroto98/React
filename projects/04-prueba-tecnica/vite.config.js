import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// A los 10 minutos se explica a configurar el punto de entrada de la aplicación, se usa tanto este archivo como el main.js que posteriormente se convierte a main.jsx y el index.html pues es en el cual se muestra la app
export default defineConfig({
  plugins: [react()]
})
