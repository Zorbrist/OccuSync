import logo from "../../assets/OccuSync.png";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-500 font-sans mt-10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="OccuSync Logo" className="h-9 w-auto object-contain rounded-lg" />
              <span className="text-xl font-bold text-[#1E293B]">OccuSync</span>
            </div>
            <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-xs">
              Smarter service management, all in one place.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#1E293B] mb-5">Platform</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#services" className="hover:text-black transition-colors">Service Catalog</a></li>
              <li><a href="#verification" className="hover:text-black transition-colors">Business Verification</a></li>
              <li><a href="#dashboard" className="hover:text-black transition-colors">Dispatch Dashboard</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#1E293B] mb-5">Company</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#about" className="hover:text-black transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-black transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#1E293B] mb-5">Newsletter</h4>
            <p className="text-sm font-medium text-slate-500 mb-5">Subscribe for management tips.</p>
            <div className="flex gap-3">
              <input type="email" placeholder="Your email address" className="min-w-0 flex-1 bg-[#F1F5F9] shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] border-none rounded-[1rem] text-sm px-4 py-3.5 text-[#1E293B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all" />
              <button className="bg-black hover:bg-slate-800 text-white text-sm px-5 py-3.5 rounded-[1rem] font-bold shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition-all">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-100 text-center flex flex-col md:flex-row items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            © 2026 OccuSync Platform Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}