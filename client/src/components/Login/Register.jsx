import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaUserCircle, FaRegArrowAltCircleLeft, FaSignInAlt } from 'react-icons/fa'
import API_BASE_URL from '../../config.js'
import './Login.css'

function RegisterForm() {
  const [formData, setFormData] = useState({ username: '', password: '', email: '' })
  const [errors, setErrors] = useState([])
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    validateForm()
  }, [formData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const hasNumber = (string) => /\d/.test(string)

  const validateForm = () => {
    const messages = []
    let valid = true

    if (!formData.email || !formData.email.includes('@') || !formData.email.includes('.')) {
      messages.push('Please enter a valid email.')
      valid = false
    }

    if (!formData.username || hasNumber(formData.username)) {
      messages.push('Name cannot be empty or include numbers.')
      valid = false
    }

    if (!formData.password || formData.password.length < 8 || !hasNumber(formData.password)) {
      messages.push('Password must be at least 8 characters long and contain at least one number.')
      valid = false
    }

    setErrors(messages)
    setIsFormValid(valid)
    return valid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      await axios.post(`${API_BASE_URL}/api/register`, formData)
      alert('You have successfully been registered!')
      window.location.href = '/Login.html'
    } catch (error) {
      console.error(error)
      alert('An error occurred while trying to register your account.')
    }
  }

  return (
    <div id='loginPage'>
      <div id='topIcons'>
        <a href='./Login.html' id='backBtn'>
          <FaRegArrowAltCircleLeft id='backArrow' />
        </a>
        <FaUserCircle id='userIcon' />
      </div>
      <form id='loginForm' onSubmit={handleSubmit}>
        <h2 id='formTitle'>Register</h2>

        <div className='formField'>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            name='username'
            id='userName'
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className='formField'>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className='formField'>
          <label htmlFor='email'>Email:</label>
          <input
            type='text'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {errors.length > 0 && (
          <div className='errorMessages'>
            {errors.map((err, index) => (
              <div key={index}>{err}</div>
            ))}
          </div>
        )}

        <div className='formField'>
          <button type='submit' id='loginBtn' disabled={!isFormValid}>
            <FaSignInAlt id='loginIcon' />
          </button>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm
