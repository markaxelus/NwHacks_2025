import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import  Navbar  from './components/Navbar'
import UpArrow from './components/UpArrow'
import { DarkModeProvider } from './components/DarkMode'

import Home from './pages/Home' 
import Process from './pages/Process'
import KeyFeatures from './pages/KeyFeatures'
import Info from './pages/Info'
import Upload from './pages/Upload'
import Generation from './pages/Generation'

import './styles/global.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DarkModeProvider>
      <BrowserRouter>

        <Navbar />

        <Routes>
          <Route 
            path = '/'
            element= {
              <>
                <Home />
                <Process />
                <KeyFeatures />
                <Info />
              </>
            }
          />
          <Route path = '/upload' element = {<Upload />} />
          <Route path = '/generation' element = {<Generation />} />
        </Routes>
        <UpArrow />
      </BrowserRouter>
    </DarkModeProvider>
  </StrictMode>,
)
