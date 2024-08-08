import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function getData() {
      const response = await fetch('http://localhost:3000/users');
      const json = await response.json();
      setUsers(json)
      console.log(json)

    }
    getData()
  },[])


  return (
    <ul>
      {users.map((user) => {
        return <li>{user.name}</li>
      })}
    </ul>
  )
}

export default App
