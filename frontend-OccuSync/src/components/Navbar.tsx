import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/OccuSync.png';

interface NavbarProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export default function Navbar({ currentPage = 'home', onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (page: string, sectionId?: string) => {
    setIsOpen(false);
    if (onNavigate) {
      onNavigate(page);
    }
    if (sectionId && page === 'home') {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <nav className="w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative z-50">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('home')}>
        <img 
          src={logo} 
          alt="OccuSync Logo" 
          className="h-10 w-auto object-contain rounded-lg" 
        />
        <span className="text-2xl font-extrabold text-slate-900 tracking-tight">OccuSync</span>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
        <button 
          onClick={() => handleNavClick('home')} 
          className={`transition ${currentPage === 'home' ? 'text-blue-600 font-bold' : 'hover:text-blue-600'}`}
        >
          Home
        </button>
        <button 
          onClick={() => handleNavClick('about')} 
          className={`transition ${currentPage === 'about' ? 'text-blue-600 font-bold' : 'hover:text-blue-600'}`}
        >
          About Us
        </button>
        <button onClick={() => handleNavClick('home', 'services')} className="hover:text-blue-600 transition">
          Services
        </button>
        <button onClick={() => handleNavClick('home', 'dashboard')} className="hover:text-blue-600 transition">
          Portal
        </button>
        <button onClick={() => handleNavClick('home', 'contact')} className="hover:text-blue-600 transition">
          Contact Us
        </button>
      </div>

      <div className="hidden md:flex items-center gap-4">
        <button className="text-sm font-semibold text-slate-700 hover:text-blue-600 px-4 py-2">Sign In</button>
        <button className="btn-primary text-sm">Register Business</button>
      </div>

      {/* Mobile Drawer Button */}
      <button className="md:hidden text-slate-700" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-slate-200 p-6 flex flex-col gap-4 shadow-xl md:hidden z-50">
          <button onClick={() => handleNavClick('home')} className="text-left font-medium text-slate-700">Home</button>
          <button onClick={() => handleNavClick('about')} className="text-left font-medium text-slate-700">About Us</button>
          <button onClick={() => handleNavClick('home', 'services')} className="text-left font-medium text-slate-700">Services</button>
          <button onClick={() => handleNavClick('home', 'dashboard')} className="text-left font-medium text-slate-700">Portal</button>
          <button onClick={() => handleNavClick('home', 'contact')} className="text-left font-medium text-slate-700">Contact Us</button>
          <hr className="my-2 border-slate-100" />
          <button className="w-full text-center py-2 text-blue-600 font-semibold">Sign In</button>
          <button className="btn-primary w-full text-center">Register Business</button>
        </div>
      )}
    </nav>
  );
}