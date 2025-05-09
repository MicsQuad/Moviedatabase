import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

//checking if user is logged in and exists, REMEMBER TO REMOVE BEFORE DEPLOYMENT
const isLoggedIn = !!localStorage.getItem('token')
const user = localStorage.getItem('user')

console.log("Is a user logged in?", isLoggedIn, ". User logged in: ", user)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
