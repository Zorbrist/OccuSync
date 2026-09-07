import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Register from './pages/Register'
import AboutUs from './pages/AboutUs';
import './App.css';

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}


