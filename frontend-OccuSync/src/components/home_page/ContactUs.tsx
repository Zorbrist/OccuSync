import { useState } from "react";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import SelectProfileModal from "../authentication/SelectProfileModal";

export default function ContactUs() {
  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <section id="contact" className="relative overflow-hidden py-24 font-sans">
      {/* BACKGROUND (MONOCHROME GALAXY) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-220px] left-[-200px] w-[650px] h-[650px] rounded-full bg-slate-300/40 blur-[170px]" />
        <div className="absolute top-[15%] right-[-250px] w-[650px] h-[650px] rounded-full bg-gray-300/30 blur-[180px]" />

        <div className="absolute top-[-350px] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full border border-slate-300/40" />
        <div className="absolute top-[-280px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full border border-gray-300/30" />

        <svg className="absolute left-[-280px] top-[0%] w-[700px] h-[750px] opacity-60" viewBox="0 0 700 700" fill="none">
          <path d="M0 170 C180 40 350 100 430 250 C500 380 420 520 680 630" stroke="rgba(148,163,184,0.4)" strokeWidth="1" />
        </svg>

        <svg className="absolute right-[-280px] top-[0%] w-[700px] h-[750px] opacity-60" viewBox="0 0 700 700" fill="none">
          <path d="M700 170 C520 40 350 100 270 250 C200 380 280 520 20 630" stroke="rgba(148,163,184,0.4)" strokeWidth="1" />
        </svg>

        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)", backgroundSize: "100px 100px" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Connect With Us
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1E293B] mt-4 leading-tight">
            Let's transform your <span className="text-slate-500">business together.</span>
          </h2>
          <p className="text-sm md:text-base font-medium text-slate-500 mt-5 max-w-xl mx-auto leading-relaxed">
            Have questions about OccuSync or need help getting started? Our team is here to help you get the most out of your service operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="mailto:support@occusync.com" className="group rounded-[1.5rem] border border-white bg-white/80 backdrop-blur-xl shadow-[0_8px_24px_rgba(149,157,165,0.06)] p-8 hover:bg-white hover:shadow-[0_12px_30px_rgba(149,157,165,0.1)] hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-full bg-[#F1F5F9] shadow-inner text-[#1E293B] flex items-center justify-center transition-colors">
                <Mail className="w-6 h-6" />
              </div>
              <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 border border-slate-50 group-hover:text-black transition-colors">
                 <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            <h3 className="font-bold text-[#1E293B] text-lg">Email Support</h3>
            <p className="text-sm font-medium text-slate-500 mt-2 leading-relaxed">General enquiries and technical help</p>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#1E293B] mt-6">support@occusync.com</p>
          </a>

          <a href="tel:+18005550199" className="group rounded-[1.5rem] border border-white bg-white/80 backdrop-blur-xl shadow-[0_8px_24px_rgba(149,157,165,0.06)] p-8 hover:bg-white hover:shadow-[0_12px_30px_rgba(149,157,165,0.1)] hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-full bg-[#F1F5F9] shadow-inner text-[#1E293B] flex items-center justify-center transition-colors">
                <Phone className="w-6 h-6" />
              </div>
              <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 border border-slate-50 group-hover:text-black transition-colors">
                 <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            <h3 className="font-bold text-[#1E293B] text-lg">Hotline</h3>
            <p className="text-sm font-medium text-slate-500 mt-2 leading-relaxed">Mon-Fri from 8am to 6pm</p>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#1E293B] mt-6">+1 (800) 555-0199</p>
          </a>

          <div className="group rounded-[1.5rem] border border-white bg-white/80 backdrop-blur-xl shadow-[0_8px_24px_rgba(149,157,165,0.06)] p-8 hover:bg-white hover:shadow-[0_12px_30px_rgba(149,157,165,0.1)] hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-full bg-[#F1F5F9] shadow-inner text-[#1E293B] flex items-center justify-center transition-colors">
                <MapPin className="w-6 h-6" />
              </div>
            </div>
            <h3 className="font-bold text-[#1E293B] text-lg">Head Office</h3>
            <p className="text-sm font-medium text-slate-500 mt-2 leading-relaxed">OccuSync HQ Technology Park</p>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#1E293B] mt-6">San Francisco, CA</p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-4">Ready to simplify your service operations?</p>
          <button type="button" onClick={() => setShowProfileModal(true)} className="inline-flex items-center gap-2 text-sm font-bold text-white px-8 py-4 rounded-[1rem] bg-black shadow-[0_4px_14px_rgba(0,0,0,0.2)] hover:-translate-y-1 hover:bg-slate-800 transition-all duration-300">
            Get Started <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <SelectProfileModal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} />
    </section>
  );
}