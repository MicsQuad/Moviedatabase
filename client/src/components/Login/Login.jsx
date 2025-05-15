import React from 'react';
import { useState } from "react"
import axios from "axios"
import './Login.css'
import { FaUserCircle, FaRegArrowAltCircleLeft, FaSignInAlt } from 'react-icons/fa'
import API_BASE_URL from "../../config.js";

function LoginForm() {
    const [formData, setFormData] = useState({  email: "", password: "" })
    //const navigate = useNavigate
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    //log in and store token locally
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`${API_BASE_URL}/api/login`, formData)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))
            alert("You have successfully logged in!")
            window.location.href = "/index.html"
        } catch (error) {
            console.error(error.response?.data || error)
            alert(error.response?.data?.message || "Login failed")
        }
    }

    //generate DOM content
    return (
        <div id='loginPage'>
            <div id='topIcons'>
                <a href='./index.html' id='backBtn'>
                    <FaRegArrowAltCircleLeft id='backArrow' />
                </a>
                <FaUserCircle id='userIcon'/>
            </div>
            <form id='loginForm' onSubmit={handleSubmit}>
                <h2 id='formTitle'>Sign in</h2>

                <div className='formField'>
                    <label htmlFor='email'>Email:</label>
                    <input type='text' name='email' value={formData.email} onChange={handleChange}/>
                </div>
                
                <div className='formField'>
                    <label htmlFor='password'>Password:</label>
                    <input type='password' name='password' value={formData.password} onChange={handleChange}/>
                </div>

                <div id='loginBtnWrapper'>
                    <button type='submit' id='loginBtn'>
                        <FaSignInAlt id='loginIcon' />
                    </button>
                </div>

                <div className='formField'>
                    <p>Not a member?</p>
                    <a href='./Register.html'>Register here.</a>
                </div>
            </form>
        </div>
    )
}

export default LoginForm