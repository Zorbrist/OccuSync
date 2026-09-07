import { useState } from 'react';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import './App.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about'>('home');

  return (
    <>
      {currentPage === 'home' && <Home currentPage={currentPage} onNavigate={(p) => setCurrentPage(p as 'home' | 'about')} />}
      {currentPage === 'about' && <AboutUs currentPage={currentPage} onNavigate={(p) => setCurrentPage(p as 'home' | 'about')} />}
    </>
  );
}