import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppLogin from './AppLogin.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppLogin />
  </StrictMode>,
)
