import React from 'react'
import './App.css'
import { Route,BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './Components/Home'
import About from './Components/About'
import Signup from './Components/Signup'

function App() {  
  return (
    <div>      
      <Router>
        <Routes>
          <Route path='/home' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/signup' element={<Signup />} />
          <Route path='*' element={<h3>Default Page</h3>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App