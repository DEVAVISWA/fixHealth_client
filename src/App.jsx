import React from 'react'
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './Components/Home'
import About from './Components/About'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Patient from './Components/Patient'
import Physio from './Components/Physio'
import Sales from './Components/Sales'
import Navbar from './Components/Navbar'

function App() {
  return (
    <div>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard/patient/:name' element={<Patient />} />
          <Route path='/dashboard/physio/:name' element={<Physio />} />
          <Route path='/dashboard/sales/:name' element={<Sales />} />
          <Route path='*' element={<h3>Default Page</h3>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App