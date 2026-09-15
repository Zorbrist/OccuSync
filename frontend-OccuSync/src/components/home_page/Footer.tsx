import logo from "../../assets/OccuSync.png";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#030207] text-slate-500">

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>

            <div className="flex items-center gap-3">

              <img
                src={logo}
                alt="OccuSync Logo"
                className="h-9 w-auto object-contain rounded-lg"
              />

              <span className="text-xl font-extrabold text-white">
                OccuSync
              </span>

            </div>

            <p className="text-xs text-slate-500 leading-relaxed mt-4 max-w-xs">
              Smarter service management, all in one place.
            </p>

          </div>

          {/* Platform */}
          <div>

            <h4 className="text-sm font-bold text-white mb-4">
              Platform
            </h4>

            <ul className="space-y-3 text-xs">

              <li>
                <a href="#services" className="hover:text-violet-300 transition">
                  Service Catalog
                </a>
              </li>

              <li>
                <a href="#verification" className="hover:text-violet-300 transition">
                  Business Verification
                </a>
              </li>

              <li>
                <a href="#dashboard" className="hover:text-violet-300 transition">
                  Dispatch Dashboard
                </a>
              </li>

            </ul>

          </div>

          {/* Company */}
          <div>

            <h4 className="text-sm font-bold text-white mb-4">
              Company
            </h4>

            <ul className="space-y-3 text-xs">

              <li>
                <a href="#about" className="hover:text-violet-300 transition">
                  About Us
                </a>
              </li>

              <li>
                <a href="#contact" className="hover:text-violet-300 transition">
                  Contact Us
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-violet-300 transition">
                  Privacy Policy
                </a>
              </li>

            </ul>

          </div>

          {/* Newsletter */}
          <div>

            <h4 className="text-sm font-bold text-white mb-4">
              Newsletter
            </h4>

            <p className="text-xs text-slate-500 mb-4">
              Subscribe for management tips.
            </p>

            <div className="flex gap-2">

              <input
                type="email"
                placeholder="Your email address"
                className="min-w-0 flex-1 bg-white/[0.03] border border-white/10 rounded-lg text-xs px-3 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-400/30"
              />

              <button className="bg-violet-600 hover:bg-violet-500 text-white text-xs px-4 py-2 rounded-lg font-semibold transition-colors">
                Join
              </button>

            </div>

          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-center text-xs text-slate-700">
          © 2026 OccuSync Platform Inc. All rights reserved.
        </div>

      </div>

    </footer>
  );
}