import { useState } from 'react'
import './App.css'
import Tweets from './Components/Main/Tweets'
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='mainApp'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='tweets'>
        <Tweets />
      </div>
      <div className='home'>
        <Home />
      </div>
    </div>
  )
}

export default App
