import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/OccuSync.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);

    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative z-50">

      {/* Brand Logo */}
      <Link
        to="/"
        onClick={() => setIsOpen(false)}
        className="flex items-center gap-3"
      >
        <img
          src={logo}
          alt="OccuSync Logo"
          className="h-10 w-auto object-contain rounded-lg"
        />

        <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
          OccuSync
        </span>
      </Link>


      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">

        <Link
          to="/"
          className="hover:text-blue-600 transition"
        >
          Home
        </Link>

        <Link
          to="/about"
          className="hover:text-blue-600 transition"
        >
          About Us
        </Link>

        <button
          onClick={() => scrollToSection('services')}
          className="hover:text-blue-600 transition"
        >
          Services
        </button>

        <button
          onClick={() => scrollToSection('dashboard')}
          className="hover:text-blue-600 transition"
        >
          Portal
        </button>

        <button
          onClick={() => scrollToSection('contact')}
          className="hover:text-blue-600 transition"
        >
          Contact Us
        </button>

      </div>


      {/* Desktop Actions */}
      <div className="hidden md:flex items-center gap-4">

        <Link
          to="/login"
          className="text-sm font-semibold text-slate-700 hover:text-blue-600 px-4 py-2"
        >
          Sign In
        </Link>

        <Link
          to="/register"
          className="btn-primary text-sm"
        >
          Register Business
        </Link>

      </div>


      {/* Mobile Drawer Button */}
      <button
        className="md:hidden text-slate-700"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>


      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-slate-200 p-6 flex flex-col gap-4 shadow-xl md:hidden z-50">

          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="text-left font-medium text-slate-700 hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="text-left font-medium text-slate-700 hover:text-blue-600"
          >
            About Us
          </Link>

          <button
            onClick={() => scrollToSection('services')}
            className="text-left font-medium text-slate-700 hover:text-blue-600"
          >
            Services
          </button>

          <button
            onClick={() => scrollToSection('dashboard')}
            className="text-left font-medium text-slate-700 hover:text-blue-600"
          >
            Portal
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="text-left font-medium text-slate-700 hover:text-blue-600"
          >
            Contact Us
          </button>

          <hr className="my-2 border-slate-100" />

          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="w-full text-center py-2 text-blue-600 font-semibold"
          >
            Sign In
          </Link>

          <Link
            to="/register"
            onClick={() => setIsOpen(false)}
            className="btn-primary w-full text-center"
          >
            Register Business
          </Link>

        </div>
      )}

    </nav>
  );
}