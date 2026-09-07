import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'

function App() {

  return (
    <Router>
      {/*<Routes>
        <Route path="/" element={<Home/>} />
      </Routes>*/}
      <div className="App">
      {/* 
        In the future, you can add React Router here to switch 
        between <Register />, <Login />, and <Dashboard /> 
      */}
      <Register />
    </div>
    </Router>

    
  )
}

export default App
