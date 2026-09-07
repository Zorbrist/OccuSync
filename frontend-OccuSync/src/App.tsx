import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import { useState } from 'react';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import './App.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about'>('home');

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
    <>
      {currentPage === 'home' && <Home currentPage={currentPage} onNavigate={(p) => setCurrentPage(p as 'home' | 'about')} />}
      {currentPage === 'about' && <AboutUs currentPage={currentPage} onNavigate={(p) => setCurrentPage(p as 'home' | 'about')} />}
    </>
  );
}
