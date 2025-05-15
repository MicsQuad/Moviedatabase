import React from 'react'
import { useState } from "react"
import axios from "axios"
//import { useNavigate } from "react-router-dom" //might be user later
import './Login.css'
import { FaUserCircle, FaRegArrowAltCircleLeft, FaSignInAlt } from 'react-icons/fa'; // To get icons

function RegisterForm() {
    const [formData, setFormData] = useState({ username: "", password: "", email: "" })
    //const navigate = useNavigate

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await axios.post("http://localhost:5000/api/register", formData)
            alert("You have successfully been registered!")
            window.location.href = "/Login.html"
        } catch (error) {
            console.error(error)
            alert("An error occurred while trying to register your account.")
        }
    }

    return (
        <div id='loginPage'>
            <div id='topIcons'>
                <a href='./Login.html' id='backBtn'>
                    <FaRegArrowAltCircleLeft id='backArrow' />
                </a>
                <FaUserCircle id='userIcon'/>
            </div>
            <form id='loginForm' onSubmit={handleSubmit}>
                <h2 id='formTitle'>Register</h2>

                <div className='formField'>
                    <label htmlFor='username'>Username:</label>
                    <input type='text' name='username' id='userName' value={formData.username} onChange={handleChange}/>
                </div>
                
                <div className='formField'>
                    <label htmlFor='password'>Password:</label>
                    <input type='password' id='password' name='password' value={formData.password} onChange={handleChange}/>
                </div>

                <div className='formField'>
                    <label htmlFor='email'>Email:</label>
                    <input type='text' id='email' name='email' value={formData.email} onChange={handleChange}/>
                </div>

                <div className='formField'>
                    <button type='submit' id='loginBtn'>
                        <FaSignInAlt id='loginIcon' />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm