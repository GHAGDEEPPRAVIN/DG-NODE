import './App.css'
import { Route, Routes } from 'react-router'
import Signin from './Components/Signin.jsx'
import Signup from './Components/Signup.jsx'
import Home from './Components/Home.jsx'

function App() {

  return (
    <div>
      <Routes>
        {/* routes for authenticaion */}
        <Route path='/' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />

        {/* main ui routes */}
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
