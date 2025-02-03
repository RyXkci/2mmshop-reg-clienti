import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { ClientProvider } from './context/ClientContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClientProvider>
    <App />
    </ClientProvider>
  </StrictMode>,
)
