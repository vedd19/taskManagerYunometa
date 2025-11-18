
import { Outlet } from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login'
import { Navbar } from './components/Navbar'

function App() {


  return (

    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App
