import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {fetchDataFromServer} from './script.js'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='todo_head'>
        <h1>📝 Todo List</h1>
        <tr>
          <td><input type="text" placeholder='Enter Yout Todos' /></td>
          <td><button>Add</button></td>
        </tr>
      </div>
      <div className='todo_body'>
        <table>
          <tr>
            <th>Todo Item</th>
          </tr>
          <tr>
            <td>
              Title : "Sample Todo Item"
              <br />
              Status : "Incomplete"
            </td>
          </tr>
          <tr>
            <div>
              {fetchDataFromServer()}
            </div>
          </tr>
        </table>
      </div>
    </>
  )
}

export default App
