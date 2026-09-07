import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import RegisterBusiness from './pages/RegisterBusiness';
import RegisterCustomer from './pages/RegisterCustomer';
import AboutUs from './pages/AboutUs';
import './App.css';

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/register/business" element={<RegisterBusiness />} />
        <Route path="/register/customer" element={<RegisterCustomer />} />
      </Routes>
    </Router>
  )
}


