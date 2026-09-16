import { useState } from "react";
import { ArrowRight, ShieldCheck, Zap, Users, CheckCircle2, CalendarDays, MapPin, Wrench } from "lucide-react";
import SelectProfileModal from "../authentication/SelectProfileModal";

export default function Hero() {
  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden px-6 pt-20 pb-28 font-sans">
      
      {/* =========================================================
          BACKGROUND (MONOCHROME GALAXY)
      ========================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Main atmospheric glows */}
        <div className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] rounded-full bg-slate-300/40 blur-[180px]" />
        <div className="absolute top-[20%] left-[-300px] w-[700px] h-[700px] rounded-full bg-gray-300/30 blur-[180px]" />
        <div className="absolute top-[10%] right-[-300px] w-[700px] h-[700px] rounded-full bg-slate-300/30 blur-[180px]" />

        {/* LARGE RADIAL RINGS */}
        <div className="absolute top-[-220px] left-1/2 -translate-x-1/2 w-[850px] h-[850px] rounded-full border border-slate-300/40" />
        <div className="absolute top-[-160px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full border border-gray-300/30" />
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full border border-slate-300/30" />

        {/* CURVED NETWORK SVGs */}
        <svg className="absolute left-[-120px] top-[5%] w-[700px] h-[700px] opacity-60" viewBox="0 0 700 700" fill="none">
          <path d="M0 180 C180 40 350 100 430 250 C500 380 420 520 650 620" stroke="rgba(148,163,184,0.3)" strokeWidth="1" />
          <path d="M0 300 C150 180 270 190 350 310 C430 430 360 560 600 700" stroke="rgba(148,163,184,0.2)" strokeWidth="1" />
          <path d="M80 0 C190 160 250 220 220 370 C190 500 300 570 500 650" stroke="rgba(148,163,184,0.2)" strokeWidth="1" />
        </svg>
        <svg className="absolute right-[-120px] top-[3%] w-[700px] h-[700px] opacity-60" viewBox="0 0 700 700" fill="none">
          <path d="M700 160 C520 40 350 100 270 250 C200 380 280 520 50 620" stroke="rgba(148,163,184,0.3)" strokeWidth="1" />
          <path d="M700 290 C550 170 430 190 350 310 C270 430 340 560 100 700" stroke="rgba(148,163,184,0.2)" strokeWidth="1" />
        </svg>

        <svg className="absolute inset-0 w-full h-full opacity-50" viewBox="0 0 1440 900" preserveAspectRatio="none" fill="none">
          <path d="M0 250 C220 190 300 300 470 270 C560 255 610 230 720 250" stroke="rgba(148,163,184,0.3)" strokeWidth="1" />
          <path d="M720 250 C830 220 900 255 980 270 C1140 300 1220 190 1440 250" stroke="rgba(148,163,184,0.3)" strokeWidth="1" />
          <path d="M0 600 C250 530 340 670 520 620 C620 590 670 570 720 590" stroke="rgba(148,163,184,0.2)" strokeWidth="1" />
          <path d="M720 590 C770 570 820 590 920 620 C1100 670 1190 530 1440 600" stroke="rgba(148,163,184,0.2)" strokeWidth="1" />
        </svg>

        {/* GLOWING NODES */}
        <div className="absolute top-[25%] left-[8%] relative">
          <div className="absolute -inset-3 rounded-full bg-slate-300/40 blur-md" />
          <div className="relative w-2 h-2 rounded-full bg-slate-400" />
        </div>
        <div className="absolute top-[37%] left-[17%] relative">
          <div className="absolute -inset-4 rounded-full bg-gray-300/40 blur-md" />
          <div className="relative w-1.5 h-1.5 rounded-full bg-gray-400" />
        </div>
        <div className="absolute top-[58%] left-[7%] relative">
          <div className="absolute -inset-3 rounded-full bg-slate-300/40 blur-md" />
          <div className="relative w-2 h-2 rounded-full bg-slate-400" />
        </div>
        <div className="absolute top-[70%] left-[20%] relative">
          <div className="absolute -inset-3 rounded-full bg-slate-300/40 blur-md" />
          <div className="relative w-1.5 h-1.5 rounded-full bg-slate-400" />
        </div>
        <div className="absolute top-[23%] right-[8%] relative">
          <div className="absolute -inset-3 rounded-full bg-slate-300/40 blur-md" />
          <div className="relative w-2 h-2 rounded-full bg-slate-400" />
        </div>
        <div className="absolute top-[38%] right-[17%] relative">
          <div className="absolute -inset-4 rounded-full bg-gray-300/40 blur-md" />
          <div className="relative w-1.5 h-1.5 rounded-full bg-gray-400" />
        </div>

        {/* SMALL FLOATING DATA POINTS */}
        <div className="absolute top-[18%] left-[25%] w-1 h-1 rounded-full bg-slate-400/40" />
        <div className="absolute top-[29%] left-[30%] w-1 h-1 rounded-full bg-slate-400/40" />
        <div className="absolute top-[48%] left-[26%] w-1 h-1 rounded-full bg-gray-400/40" />
        <div className="absolute top-[18%] right-[25%] w-1 h-1 rounded-full bg-slate-400/40" />

        {/* CENTRAL LIGHT BEHIND OCCUSYNC */}
        <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-white/60 blur-[100px]" />

        {/* SUBTLE GRID */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)", backgroundSize: "100px 100px" }} />
      </div>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-white backdrop-blur-xl shadow-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-slate-500" />
            </span>
            <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-slate-500">
              Smarter Service Management
            </span>
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-bold tracking-tight leading-[0.9] text-[#1E293B]">
            OccuSync
          </h1>

          <p className="mt-8 text-base sm:text-lg md:text-xl text-slate-500 font-medium tracking-wide">
            “Smarter service management, all in one place.”
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setShowProfileModal(true)}
              className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-[1rem] bg-black text-white text-sm font-bold shadow-[0_4px_14px_rgba(0,0,0,0.2)] hover:-translate-y-1 hover:bg-slate-800 transition-all duration-300"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              type="button"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="w-full sm:w-auto px-8 py-4 rounded-[1rem] bg-white border border-slate-200 text-slate-600 text-sm font-bold shadow-sm hover:bg-slate-50 hover:text-black transition-all duration-300"
            >
              Schedule Live Demo
            </button>
          </div>
        </div>

        {/* =========================================================
            FLOATING CARDS + DASHBOARD
        ========================================================= */}
        <div className="relative mt-20 md:mt-24">
          
          {/* Left Floating Card */}
          <div className="hidden lg:block absolute -left-8 top-16 w-56 rounded-[1.5rem] border border-slate-50 bg-white/90 backdrop-blur-xl p-5 shadow-[0_12px_40px_rgba(149,157,165,0.15)] rotate-[-4deg] z-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F1F5F9] shadow-inner flex items-center justify-center border border-slate-50">
                <Wrench className="w-4 h-4 text-[#1E293B]" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">New Work Order</p>
                <p className="text-sm font-bold text-[#1E293B] mt-0.5">Aircon Repair</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <MapPin className="w-3 h-3 text-slate-400" /> Shah Alam
            </div>
          </div>

          {/* Right Floating Card */}
          <div className="hidden lg:block absolute -right-8 top-28 w-56 rounded-[1.5rem] border border-slate-50 bg-white/90 backdrop-blur-xl p-5 shadow-[0_12px_40px_rgba(149,157,165,0.15)] rotate-[4deg] z-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F1F5F9] shadow-inner flex items-center justify-center border border-slate-50">
                <CheckCircle2 className="w-5 h-5 text-[#1E293B]" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</p>
                <p className="text-sm font-bold text-[#1E293B] mt-0.5">Completed</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider">
              <span className="text-slate-500">#INV-2026-08</span>
              <span className="text-slate-700">Paid</span>
            </div>
          </div>

          {/* Dashboard Preview UI Window */}
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-white/60 blur-[120px] rounded-full" />
            <div className="relative rounded-[2.5rem] border border-white bg-white/80 backdrop-blur-2xl shadow-[0_20px_60px_rgba(149,157,165,0.1)] overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/50">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-slate-300 shadow-sm" />
                  <span className="w-3 h-3 rounded-full bg-slate-300 shadow-sm" />
                  <span className="w-3 h-3 rounded-full bg-slate-300 shadow-sm" />
                  <span className="hidden sm:block ml-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400">occusync.app/dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <span className="text-[11px] sm:text-xs text-slate-600 font-bold uppercase tracking-wider">Live System</span>
                </div>
              </div>

              <div className="p-6 md:p-10 bg-[#F1F5F9]/80">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="rounded-[1.5rem] border border-white bg-white shadow-sm p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#F1F5F9] shadow-inner flex items-center justify-center">
                        <Zap className="w-5 h-5 text-[#1E293B]" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Active Jobs</p>
                        <p className="text-2xl font-bold text-[#1E293B] mt-1">24</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-[1.5rem] border border-white bg-white shadow-sm p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#F1F5F9] shadow-inner flex items-center justify-center">
                        <Users className="w-5 h-5 text-[#1E293B]" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Service Pros</p>
                        <p className="text-2xl font-bold text-[#1E293B] mt-1">128</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-[1.5rem] border border-white bg-white shadow-sm p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#F1F5F9] shadow-inner flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-[#1E293B]" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Completed</p>
                        <p className="text-2xl font-bold text-[#1E293B] mt-1">96%</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mt-5">
                  <div className="lg:col-span-3 rounded-[1.5rem] border border-white bg-white shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Today's Activity</p>
                        <h3 className="text-sm font-bold text-[#1E293B] mt-1">Service Operations</h3>
                      </div>
                      <CalendarDays className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 rounded-[1rem] bg-[#F1F5F9] shadow-inner border border-slate-50">
                        <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
                          <Wrench className="w-4 h-4 text-[#1E293B]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-[#1E293B]">Aircon Maintenance</p>
                          <p className="text-[11px] font-medium text-slate-500 mt-1">Technician assigned</p>
                        </div>
                        <span className="text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-1 rounded-full uppercase tracking-wider">In Progress</span>
                      </div>
                      <div className="flex items-center gap-4 p-4 rounded-[1rem] bg-[#F1F5F9] shadow-inner border border-slate-50">
                        <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
                          <CalendarDays className="w-4 h-4 text-[#1E293B]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-[#1E293B]">Plumbing Inspection</p>
                          <p className="text-[11px] font-medium text-slate-500 mt-1">Scheduled for 2:30 PM</p>
                        </div>
                        <span className="text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-1 rounded-full uppercase tracking-wider">Scheduled</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-2 rounded-[1.5rem] border border-white bg-white shadow-sm p-6">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Smart Dispatch</p>
                    <h3 className="text-lg font-bold text-[#1E293B] mt-1">Best match found</h3>
                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                      OccuSync matches the right technician based on skills, location and availability.
                    </p>
                    <div className="mt-6 p-5 rounded-[1rem] bg-[#F1F5F9] shadow-inner border border-slate-50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-sm font-bold text-[#1E293B]">MV</div>
                        <div>
                          <p className="text-sm font-bold text-[#1E293B]">Marcus V.</p>
                          <p className="text-[11px] font-semibold text-slate-500 mt-1">HVAC Specialist</p>
                        </div>
                        <div className="ml-auto"><CheckCircle2 className="w-5 h-5 text-emerald-500" /></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FEATURE HIGHLIGHTS */}
        <div className="max-w-4xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="group p-6 rounded-[1.5rem] border border-white bg-white/80 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:bg-white hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#F1F5F9] shadow-inner flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#1E293B]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1E293B]">Smart Dispatch</h4>
                <p className="text-[11px] text-slate-500 mt-1 font-semibold uppercase tracking-wider">Skill & Location</p>
              </div>
            </div>
          </div>
          <div className="group p-6 rounded-[1.5rem] border border-white bg-white/80 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:bg-white hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#F1F5F9] shadow-inner flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#1E293B]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1E293B]">Verification</h4>
                <p className="text-[11px] text-slate-500 mt-1 font-semibold uppercase tracking-wider">Automated compliance</p>
              </div>
            </div>
          </div>
          <div className="group p-6 rounded-[1.5rem] border border-white bg-white/80 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:bg-white hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#F1F5F9] shadow-inner flex items-center justify-center">
                <Users className="w-5 h-5 text-[#1E293B]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1E293B]">Automated CRM</h4>
                <p className="text-[11px] text-slate-500 mt-1 font-semibold uppercase tracking-wider">Invoicing & History</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SelectProfileModal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} />
    </section>
  );
}