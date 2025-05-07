import React from 'react';
import './Login.css'
import { FaUserCircle, FaRegArrowAltCircleLeft, FaSignInAlt } from 'react-icons/fa'; // To get icons

function LoginForm() {
    return (
        <div id='loginPage'>
            <div id='topIcons'>
                <a href='./index.html' id='backBtn'>
                    <FaRegArrowAltCircleLeft id='backArrow' />
                </a>
                <FaUserCircle id='userIcon'/>
            </div>
            <form id='loginForm'>
                <h2 id='formTitle'>Sign in</h2>

                <div class='formField'>
                    <label for='userName'>Username:</label>
                    <input type='text' name='userName' id='userName'/>
                </div>
                
                <div class='formField'>
                    <label for='password'>Password:</label>
                    <input type='password' id='password' name='password'/>
                </div>

                <div class='formField'>
                    <button type='submit' id='loginBtn'>
                        <FaSignInAlt id='loginIcon' />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm