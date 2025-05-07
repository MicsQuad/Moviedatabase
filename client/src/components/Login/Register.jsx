import React from 'react';
import './Login.css'
import { FaUserCircle, FaRegArrowAltCircleLeft, FaSignInAlt } from 'react-icons/fa'; // To get icons

function RegisterForm() {
    return (
        <div id='loginPage'>
            <div id='topIcons'>
                <a href='./Login.html' id='backBtn'>
                    <FaRegArrowAltCircleLeft id='backArrow' />
                </a>
                <FaUserCircle id='userIcon'/>
            </div>
            <form id='loginForm'>
                <h2 id='formTitle'>Register</h2>

                <div className='formField'>
                    <label for='userName'>Username:</label>
                    <input type='text' name='userName' id='userName'/>
                </div>
                
                <div className='formField'>
                    <label for='password'>Password:</label>
                    <input type='password' id='password' name='password'/>
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