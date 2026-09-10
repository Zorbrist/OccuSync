import logo from "../../assets/OccuSync.png";
export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className=" p-1.5 ">
              <img
                src={logo}
                alt="OccuSync Logo"
                className="h-10 w-auto object-contain rounded-lg"
              />
            </div>
            <span className="text-xl font-extrabold text-white">OccuSync</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Smarter service management, all in one place.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white mb-4">Platform</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#services" className="hover:text-white transition">Service Catalog</a></li>
            <li><a href="#verification" className="hover:text-white transition">Business Verification</a></li>
            <li><a href="#dashboard" className="hover:text-white transition">Dispatch Dashboard</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white mb-4">Company</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#about" className="hover:text-white transition">About Us</a></li>
            <li><a href="#contact" className="hover:text-white transition">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white mb-4">Newsletter</h4>
          <p className="text-xs text-slate-400 mb-3">Subscribe for management tips.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-slate-900 border border-slate-800 rounded-lg text-xs px-3 py-2 text-white focus:outline-none w-full"
            />
            <button className="bg-blue-600 text-white text-xs px-3 py-2 rounded-lg font-medium hover:bg-blue-500">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-slate-900 pt-6 text-center text-xs text-slate-600">
        © 2026 OccuSync Platform Inc. All rights reserved.
      </div>
    </footer>
  );
}