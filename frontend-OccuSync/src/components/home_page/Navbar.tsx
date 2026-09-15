import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../../assets/OccuSync.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  // Smooth scroll to homepage sections
  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    setIsRegisterOpen(false);
    setServicesOpen(false);

    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
<nav className="fixed top-0 left-0 z-50 w-full bg-gradient-to-b from-[#05030a]/75 via-[#080510]/45 to-transparent backdrop-blur-xl shadow-[0_10px_40px_rgba(88,28,135,0.10)]">      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">

        {/* ================= LOGO ================= */}
        <Link
          to="/"
          onClick={() => {
            setIsOpen(false);
            setIsRegisterOpen(false);
            setServicesOpen(false);

            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          className="flex items-center gap-3 group"
        >
          <img
            src={logo}
            alt="OccuSync Logo"
            className="h-10 w-auto object-contain rounded-lg"
          />

          <span className="text-2xl font-extrabold text-slate-100 tracking-tight group-hover:text-violet-300 transition-colors">
            OccuSync
          </span>
        </Link>


        {/* ================= DESKTOP NAVIGATION ================= */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">

          {/* HOME */}
          <Link
            to="/"
            onClick={() => {
              setIsRegisterOpen(false);
              setServicesOpen(false);

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="hover:text-violet-300 transition-colors"
          >
            Home
          </Link>


          {/* ABOUT US */}
          <button
            type="button"
            onClick={() => scrollToSection("about")}
            className="hover:text-violet-300 transition-colors"
          >
            About Us
          </button>


          {/* ================= SERVICES DROPDOWN ================= */}
          <div className="relative">

            <button
              type="button"
              onClick={() => {
                setServicesOpen(!servicesOpen);
                setIsRegisterOpen(false);
              }}
              className="flex items-center gap-1 hover:text-violet-300 transition-colors"
            >
              Services

              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  servicesOpen ? "rotate-180" : ""
                }`}
              />
            </button>


            {/* SERVICES DROPDOWN MENU */}
            {servicesOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-64 rounded-xl bg-[#0b0a14]/95 border border-white/10 backdrop-blur-xl shadow-2xl p-2 z-50">

                {/* FOR CUSTOMERS */}
                <button
                  type="button"
                  onClick={() => scrollToSection("categories")}
                  className="block w-full text-left px-4 py-3 rounded-lg hover:bg-white/5 transition-all"
                >
                  <p className="text-sm font-semibold text-white">
                    For Customers
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Browse available service categories
                  </p>
                </button>


                {/* FOR SERVICE PROVIDERS */}
                <button
                  type="button"
                  onClick={() => scrollToSection("services")}
                  className="block w-full text-left px-4 py-3 rounded-lg hover:bg-white/5 transition-all"
                >
                  <p className="text-sm font-semibold text-white">
                    For Service Providers
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Explore our service offerings
                  </p>
                </button>

              </div>
            )}
          </div>


          {/* PORTAL */}
          <button
            type="button"
            onClick={() => scrollToSection("dashboard")}
            className="hover:text-violet-300 transition-colors"
          >
            Portal
          </button>


          {/* CONTACT US */}
          <button
            type="button"
            onClick={() => scrollToSection("contact")}
            className="hover:text-violet-300 transition-colors"
          >
            Contact Us
          </button>

        </div>


        {/* ================= DESKTOP RIGHT SIDE ================= */}
        <div className="hidden md:flex items-center gap-4">

          {/* SIGN IN */}
          <Link
            to="/login"
            className="text-sm font-semibold text-slate-300 hover:text-violet-300 px-4 py-2 transition-colors"
          >
            Sign In
          </Link>


          {/* REGISTER DROPDOWN */}
          <div className="relative">

            <button
              type="button"
              onClick={() => {
                setIsRegisterOpen(!isRegisterOpen);
                setServicesOpen(false);
              }}
className="flex items-center justify-center gap-2 whitespace-nowrap rounded-xl px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 shadow-[0_0_20px_rgba(139,92,246,0.25)] hover:shadow-[0_0_28px_rgba(168,85,247,0.40)] hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500 transition-all duration-300"            >
              Register

              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isRegisterOpen ? "rotate-180" : ""
                }`}
              />
            </button>


            {/* REGISTER MENU */}
            {isRegisterOpen && (
              <div className="absolute right-0 top-full mt-3 w-56 rounded-xl bg-[#0b0a14]/95 border border-white/10 backdrop-blur-xl shadow-2xl p-2 flex flex-col gap-1 z-50">

                {/* CUSTOMER */}
                <Link
                  to="/register/customer"
                  onClick={() => setIsRegisterOpen(false)}
                  className="w-full px-4 py-2.5 rounded-lg text-slate-200 font-medium hover:bg-white/5 hover:text-violet-300 transition-all text-sm"
                >
                  Register as Customer
                </Link>


                {/* BUSINESS */}
                <Link
                  to="/register/business"
                  onClick={() => setIsRegisterOpen(false)}
                  className="w-full px-4 py-2.5 rounded-lg text-slate-200 font-medium hover:bg-white/5 hover:text-violet-300 transition-all text-sm"
                >
                  Register as Business
                </Link>

              </div>
            )}

          </div>

        </div>


        {/* ================= MOBILE MENU BUTTON ================= */}
        <button
          type="button"
          className="md:hidden text-slate-200 p-2 rounded-lg hover:bg-white/5 hover:text-violet-300 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>


        {/* ================= MOBILE NAVIGATION ================= */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-[#080711]/95 border border-white/10 backdrop-blur-2xl p-6 flex flex-col gap-4 shadow-2xl md:hidden z-50">

            {/* HOME */}
            <Link
              to="/"
              onClick={() => {
                setIsOpen(false);

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className="text-sm font-medium text-slate-300 hover:text-white"
            >
              Home
            </Link>


            {/* ABOUT US */}
            <button
              type="button"
              onClick={() => scrollToSection("about")}
              className="text-left text-sm font-medium text-slate-300 hover:text-violet-300"
            >
              About Us
            </button>


            {/* ================= MOBILE SERVICES ================= */}
            <button
              type="button"
              onClick={() => {
                setServicesOpen(!servicesOpen);
                setIsRegisterOpen(false);
              }}
              className="flex items-center justify-between text-left text-sm font-medium text-slate-300 hover:text-violet-300"
            >
              <span>Services</span>

              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  servicesOpen ? "rotate-180" : ""
                }`}
              />
            </button>


            {/* MOBILE SERVICES OPTIONS */}
            {servicesOpen && (
              <div className="ml-3 flex flex-col gap-2 border-l border-white/10 pl-4">

                {/* CUSTOMER */}
                <button
                  type="button"
                  onClick={() => scrollToSection("categories")}
                  className="rounded-lg px-3 py-2.5 text-left hover:bg-white/5 transition-all"
                >
                  <p className="text-sm font-medium text-white">
                    For Customers
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Browse available service categories
                  </p>
                </button>


                {/* SERVICE PROVIDER */}
                <button
                  type="button"
                  onClick={() => scrollToSection("services")}
                  className="rounded-lg px-3 py-2.5 text-left hover:bg-white/5 transition-all"
                >
                  <p className="text-sm font-medium text-white">
                    For Service Providers
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Explore our service offerings
                  </p>
                </button>

              </div>
            )}


            {/* PORTAL */}
            <button
              type="button"
              onClick={() => scrollToSection("dashboard")}
              className="text-left text-sm font-medium text-slate-300 hover:text-violet-300"
            >
              Portal
            </button>


            {/* CONTACT US */}
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="text-left text-sm font-medium text-slate-300 hover:text-violet-300"
            >
              Contact Us
            </button>


            {/* DIVIDER */}
            <hr className="my-2 border-white/10" />


            {/* SIGN IN */}
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2 text-violet-300 font-semibold"
            >
              Sign In
            </Link>


            {/* REGISTER */}
            <button
              type="button"
              onClick={() => {
                setIsRegisterOpen(!isRegisterOpen);
                setServicesOpen(false);
              }}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              Register

              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isRegisterOpen ? "rotate-180" : ""
                }`}
              />
            </button>


            {/* MOBILE REGISTER OPTIONS */}
            {isRegisterOpen && (
              <div className="flex flex-col gap-2">

                {/* CUSTOMER */}
                <Link
                  to="/register/customer"
                  onClick={() => {
                    setIsOpen(false);
                    setIsRegisterOpen(false);
                  }}
                  className="w-full text-center py-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-200 hover:text-violet-300 transition-all"
                >
                  Register as Customer
                </Link>


                {/* BUSINESS */}
                <Link
                  to="/register/business"
                  onClick={() => {
                    setIsOpen(false);
                    setIsRegisterOpen(false);
                  }}
                  className="w-full text-center py-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-200 hover:text-violet-300 transition-all"
                >
                  Register as Business
                </Link>

              </div>
            )}

          </div>
        )}

      </div>
    </nav>
  );
}