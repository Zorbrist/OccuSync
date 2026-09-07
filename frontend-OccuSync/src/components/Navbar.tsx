import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/OccuSync.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);

    // Already on Home
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }

      return;
    }

    // On another page → go Home first
    navigate('/', {
      state: { scrollTo: sectionId },
    });
  };

  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;

      setTimeout(() => {
        const element = document.getElementById(sectionId);

        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 100);

      // Clear the state so it doesn't scroll again
      navigate('/', { replace: true, state: {} });
    }
  }, [location, navigate]);

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

        <button onClick={() => scrollToSection('services')}>
          Services
        </button>

        <button onClick={() => scrollToSection('dashboard')}>
          Portal
        </button>

        <button onClick={() => scrollToSection('contact')}>
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

        {/* Desktop Register Dropdown Fix */}
        <div className="relative">
          <button
            onClick={() => setIsRegisterOpen(!isRegisterOpen)}
            className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap"
          >
            Register
            <span className={`transition-transform ${isRegisterOpen ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>

          {isRegisterOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl p-2 flex flex-col gap-1 z-50">
              <Link
                to="/register/customer"
                onClick={() => setIsRegisterOpen(false)}
                className="w-full text-left px-4 py-2.5 rounded-lg text-slate-700 font-medium hover:bg-slate-50 hover:text-blue-600 transition text-sm"
              >
                Register as Customer
              </Link>

              <Link
                to="/register/business"
                onClick={() => setIsRegisterOpen(false)}
                className="w-full text-left px-4 py-2.5 rounded-lg text-slate-700 font-medium hover:bg-slate-50 hover:text-blue-600 transition text-sm"
              >
                Register as Business
              </Link>
            </div>
          )}
        </div>

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
          <button onClick={() => scrollToSection('services')} className="text-left font-medium text-slate-700 hover:text-blue-600">
            Services
          </button>

          <button onClick={() => scrollToSection('dashboard')} className="text-left font-medium text-slate-700 hover:text-blue-600">
            Portal
          </button>

          <button onClick={() => scrollToSection('contact')} className="text-left font-medium text-slate-700 hover:text-blue-600">
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

          <div className="w-full">
            <button
              onClick={() => setIsRegisterOpen(!isRegisterOpen)}
              className="btn-primary w-full text-center flex items-center justify-center gap-2"
            >
              Register
              <span className={`transition-transform ${isRegisterOpen ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            {isRegisterOpen && (
              <div className="mt-2 flex flex-col gap-2">
                <Link
                  to="/register/customer"
                  onClick={() => {
                    setIsOpen(false);
                    setIsRegisterOpen(false);
                  }}
                  className="w-full text-center py-2.5 rounded-lg bg-slate-50 text-slate-700 font-medium hover:bg-slate-100 transition"
                >
                  Register as Customer
                </Link>

                <Link
                  to="/register/business"
                  onClick={() => {
                    setIsOpen(false);
                    setIsRegisterOpen(false);
                  }}
                  className="w-full text-center py-2.5 rounded-lg bg-slate-50 text-slate-700 font-medium hover:bg-slate-100 transition"
                >
                  Register as Business
                </Link>
              </div>
            )}
          </div>

        </div>
      )}

    </nav>
  );
}