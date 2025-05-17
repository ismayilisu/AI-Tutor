import React from 'react'
import 'react-router-dom'
import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Main from './components/Main'
import Details from './components/Details'
import { AnimatePresence } from 'framer-motion'

function AnimatedRoutes(){
  const location =useLocation()
  return (
  <AnimatePresence
  mode='wait'>
  <Routes location={location} key={location.pathname}>
        <Route path='/main' element={<Main/>}/>
         <Route path='/deltres' element={<Details/>}/>
      </Routes>
  </AnimatePresence>
  )
}


function App() {

  
  
  return (
   
    <Router>
    <AnimatedRoutes/>
    </Router>
    
  )
}

export default App




