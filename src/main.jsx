import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { enablePrintPageNumbers } from './utils/printPageNumbers'

// Nomor di setiap lembar cetak (Chrome + Firefox)
enablePrintPageNumbers()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
