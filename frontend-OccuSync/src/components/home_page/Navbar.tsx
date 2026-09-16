import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../../assets/OccuSync.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    setIsRegisterOpen(false);
    setServicesOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white/70 backdrop-blur-xl shadow-sm border-b border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3 group">
          <img src={logo} alt="OccuSync Logo" className="h-10 w-auto object-contain rounded-lg" />
          <span className="text-2xl font-bold text-[#1E293B] tracking-tight group-hover:text-slate-600 transition-colors">
            OccuSync
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-[#1E293B] transition-colors">Home</Link>
          <button type="button" onClick={() => scrollToSection("about")} className="hover:text-[#1E293B] transition-colors">About Us</button>

          <div className="relative">
            <button type="button" onClick={() => { setServicesOpen(!servicesOpen); setIsRegisterOpen(false); }} className="flex items-center gap-1 hover:text-[#1E293B] transition-colors">
              Services <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            {servicesOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-64 rounded-[1.5rem] bg-white border border-slate-100 shadow-[0_12px_30px_rgba(0,0,0,0.08)] p-2 z-50">
                <button type="button" onClick={() => scrollToSection("categories")} className="block w-full text-left px-4 py-3 rounded-[1rem] hover:bg-[#F1F5F9] transition-all">
                  <p className="text-sm font-bold text-[#1E293B]">For Customers</p>
                  <p className="text-[11px] font-semibold text-slate-400 mt-1">Browse available categories</p>
                </button>
                <button type="button" onClick={() => scrollToSection("services")} className="block w-full text-left px-4 py-3 rounded-[1rem] hover:bg-[#F1F5F9] transition-all">
                  <p className="text-sm font-bold text-[#1E293B]">For Service Providers</p>
                  <p className="text-[11px] font-semibold text-slate-400 mt-1">Explore service offerings</p>
                </button>
              </div>
            )}
          </div>
          <button type="button" onClick={() => scrollToSection("dashboard")} className="hover:text-[#1E293B] transition-colors">Portal</button>
          <button type="button" onClick={() => scrollToSection("contact")} className="hover:text-[#1E293B] transition-colors">Contact Us</button>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className="text-sm font-semibold text-slate-500 hover:text-[#1E293B] px-4 py-2 transition-colors">Sign In</Link>
          <div className="relative">
            <button type="button" onClick={() => { setIsRegisterOpen(!isRegisterOpen); setServicesOpen(false); }} className="flex items-center justify-center gap-2 whitespace-nowrap rounded-[1rem] px-5 py-2.5 text-sm font-bold text-white bg-black shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:bg-slate-800 transition-all duration-300">
              Register <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isRegisterOpen ? "rotate-180" : ""}`} />
            </button>
            {isRegisterOpen && (
              <div className="absolute right-0 top-full mt-3 w-56 rounded-[1.5rem] bg-white border border-slate-100 shadow-[0_12px_30px_rgba(0,0,0,0.08)] p-2 flex flex-col gap-1 z-50">
                <Link to="/register/customer" className="w-full px-4 py-2.5 rounded-[1rem] text-slate-600 font-semibold hover:bg-[#F1F5F9] hover:text-[#1E293B] transition-all text-sm">Register as Customer</Link>
                <Link to="/register/business" className="w-full px-4 py-2.5 rounded-[1rem] text-slate-600 font-semibold hover:bg-[#F1F5F9] hover:text-[#1E293B] transition-all text-sm">Register as Business</Link>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE TOGGLE */}
        <button type="button" className="md:hidden text-slate-500 p-2 rounded-[1rem] hover:bg-slate-100 transition-colors" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-slate-100 p-6 flex flex-col gap-4 shadow-2xl md:hidden z-50">
            <Link to="/" onClick={() => { setIsOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-sm font-bold text-[#1E293B]">Home</Link>
            <button type="button" onClick={() => scrollToSection("about")} className="text-left text-sm font-bold text-slate-500 hover:text-[#1E293B]">About Us</button>
            <button type="button" onClick={() => { setServicesOpen(!servicesOpen); setIsRegisterOpen(false); }} className="flex items-center justify-between text-left text-sm font-bold text-slate-500 hover:text-[#1E293B]">
              <span>Services</span> <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            {servicesOpen && (
              <div className="ml-3 flex flex-col gap-2 border-l border-slate-100 pl-4">
                <button type="button" onClick={() => scrollToSection("categories")} className="rounded-[1rem] px-3 py-2 text-left hover:bg-[#F1F5F9] transition-all"><p className="text-sm font-bold text-[#1E293B]">For Customers</p></button>
                <button type="button" onClick={() => scrollToSection("services")} className="rounded-[1rem] px-3 py-2 text-left hover:bg-[#F1F5F9] transition-all"><p className="text-sm font-bold text-[#1E293B]">For Service Providers</p></button>
              </div>
            )}
            <button type="button" onClick={() => scrollToSection("dashboard")} className="text-left text-sm font-bold text-slate-500 hover:text-[#1E293B]">Portal</button>
            <button type="button" onClick={() => scrollToSection("contact")} className="text-left text-sm font-bold text-slate-500 hover:text-[#1E293B]">Contact Us</button>
            <hr className="my-2 border-slate-100" />
            <Link to="/login" onClick={() => setIsOpen(false)} className="w-full text-center py-2 text-[#1E293B] font-bold">Sign In</Link>
            <button type="button" onClick={() => { setIsRegisterOpen(!isRegisterOpen); setServicesOpen(false); }} className="w-full flex items-center justify-center gap-2 rounded-[1rem] bg-black text-white py-3 text-sm font-bold shadow-md">
              Register <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isRegisterOpen ? "rotate-180" : ""}`} />
            </button>
            {isRegisterOpen && (
              <div className="flex flex-col gap-2 mt-2">
                <Link to="/register/customer" className="w-full text-center py-2.5 rounded-[1rem] bg-[#F1F5F9] text-slate-600 hover:text-[#1E293B] font-bold transition-all">Register as Customer</Link>
                <Link to="/register/business" className="w-full text-center py-2.5 rounded-[1rem] bg-[#F1F5F9] text-slate-600 hover:text-[#1E293B] font-bold transition-all">Register as Business</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}