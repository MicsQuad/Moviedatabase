import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react';
import About from './components/About/About.jsx'; 
import Header from './components/Header/Header.jsx';

function RenderAbout() {
  return (
    <>
    <div className='spacemaker'></div>
    <About />
    <div className='spacemaker'></div>
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <RenderAbout />
  </StrictMode>,
)
