import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { useEffect } from 'react'
function App() {
  const [jokes, setJokes] = useState([])
  useEffect(()=>{
    axios.get('/api/jokes')
    .then((response)=>{
     setJokes(response.data)
    })
    .catch((error)=>{
      console.log("Error is",error)
    })
  })
  return (
    <>
      <h1 className='text-3xl font-bold bg-gray-800 text-white p-4'>I am Mayank Rouniyar</h1>
      <p>JOKES:{jokes.length}</p>
      {
        jokes.map((joke)=>(
          <div key={joke.id}>
            <h2>{joke.title}</h2>
            <p>{joke.content}</p>
          </div>
        ))
      }
    </>
  )
}

export default App
