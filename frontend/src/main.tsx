import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import  Navbar  from './components/Navbar'

import Home from './pages/Home' 
import KeyFeatures from './pages/KeyFeatures'
import Info from './pages/Info'


import './styles/global.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route 
          path = '/'
          element= {
            <>
              <Home />
              <KeyFeatures />
              <Info />
            </>
          }
        />
      </Routes>

    </BrowserRouter>
  </StrictMode>,
)
