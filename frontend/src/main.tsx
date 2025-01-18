import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import  Navbar  from './components/Navbar'


import Home from './pages/Home'


import './global.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)
