import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import {Routes,Route} from 'react-router-dom'
import Register from './pages/Register.jsx'
import { useEffect } from 'react'
import Login from './pages/Login.jsx'
function App() {
  return (
    <Routes>
       <Route path="/" element={<Register />} />
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
  )
}
export default App
