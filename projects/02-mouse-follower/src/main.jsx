import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // Strict mode no funciona en producción, sólo en desarrollo
  // La explicación del strictMode va ligado a la limpieza de efectos de los componentes. 1 hora y 42 minutos del video se explica
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
