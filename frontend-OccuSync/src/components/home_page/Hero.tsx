import { useState } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  CheckCircle2,
  CalendarDays,
  MapPin,
  Wrench,
} from "lucide-react";
import SelectProfileModal from "../authentication/SelectProfileModal";

export default function Hero() {
  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden px-6 pt-20 pb-28">

      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* Main atmospheric glows */}

        <div className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] rounded-full bg-purple-700/20 blur-[180px]" />

        <div className="absolute top-[20%] left-[-300px] w-[700px] h-[700px] rounded-full bg-fuchsia-900/20 blur-[180px]" />

        <div className="absolute top-[10%] right-[-300px] w-[700px] h-[700px] rounded-full bg-violet-900/25 blur-[180px]" />

        <div className="absolute bottom-[-350px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full bg-purple-950/50 blur-[170px]" />

        {/* =====================================================
            LARGE RADIAL RINGS
        ===================================================== */}

        <div className="absolute top-[-220px] left-1/2 -translate-x-1/2 w-[850px] h-[850px] rounded-full border border-violet-400/[0.08]" />

        <div className="absolute top-[-160px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full border border-purple-300/[0.07]" />

        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full border border-fuchsia-300/[0.06]" />

        {/* =====================================================
            LEFT CURVED NETWORK
        ===================================================== */}

        <svg
          className="absolute left-[-120px] top-[5%] w-[700px] h-[700px] opacity-60"
          viewBox="0 0 700 700"
          fill="none"
        >
          <path
            d="M0 180 C180 40 350 100 430 250 C500 380 420 520 650 620"
            stroke="rgba(139,92,246,0.16)"
            strokeWidth="1"
          />

          <path
            d="M0 300 C150 180 270 190 350 310 C430 430 360 560 600 700"
            stroke="rgba(217,70,239,0.10)"
            strokeWidth="1"
          />

          <path
            d="M80 0 C190 160 250 220 220 370 C190 500 300 570 500 650"
            stroke="rgba(167,139,250,0.10)"
            strokeWidth="1"
          />

          <path
            d="M0 500 C150 400 270 420 390 500 C500 575 560 610 700 590"
            stroke="rgba(139,92,246,0.08)"
            strokeWidth="1"
          />
        </svg>

        {/* =====================================================
            RIGHT CURVED NETWORK
        ===================================================== */}

        <svg
          className="absolute right-[-120px] top-[3%] w-[700px] h-[700px] opacity-60"
          viewBox="0 0 700 700"
          fill="none"
        >
          <path
            d="M700 160 C520 40 350 100 270 250 C200 380 280 520 50 620"
            stroke="rgba(139,92,246,0.16)"
            strokeWidth="1"
          />

          <path
            d="M700 290 C550 170 430 190 350 310 C270 430 340 560 100 700"
            stroke="rgba(217,70,239,0.10)"
            strokeWidth="1"
          />

          <path
            d="M620 0 C510 160 450 220 480 370 C510 500 400 570 200 650"
            stroke="rgba(167,139,250,0.10)"
            strokeWidth="1"
          />

          <path
            d="M700 500 C550 400 430 420 310 500 C200 575 140 610 0 590"
            stroke="rgba(139,92,246,0.08)"
            strokeWidth="1"
          />
        </svg>

        {/* =====================================================
            CONNECTION LINES ACROSS HERO
        ===================================================== */}

        <svg
          className="absolute inset-0 w-full h-full opacity-50"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* Left → center */}

          <path
            d="M0 250 C220 190 300 300 470 270 C560 255 610 230 720 250"
            stroke="rgba(139,92,246,0.09)"
            strokeWidth="1"
          />

          {/* Center → right */}

          <path
            d="M720 250 C830 220 900 255 980 270 C1140 300 1220 190 1440 250"
            stroke="rgba(139,92,246,0.09)"
            strokeWidth="1"
          />

          {/* Lower network */}

          <path
            d="M0 600 C250 530 340 670 520 620 C620 590 670 570 720 590"
            stroke="rgba(217,70,239,0.07)"
            strokeWidth="1"
          />

          <path
            d="M720 590 C770 570 820 590 920 620 C1100 670 1190 530 1440 600"
            stroke="rgba(217,70,239,0.07)"
            strokeWidth="1"
          />
        </svg>

        {/* =====================================================
            GLOWING NODES
        ===================================================== */}

        {/* Left nodes */}

        <div className="absolute top-[25%] left-[8%]">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-violet-500/10 blur-md" />
            <div className="relative w-2 h-2 rounded-full bg-violet-300/70" />
          </div>
        </div>

        <div className="absolute top-[37%] left-[17%]">
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-fuchsia-500/10 blur-md" />
            <div className="relative w-1.5 h-1.5 rounded-full bg-fuchsia-300/60" />
          </div>
        </div>

        <div className="absolute top-[58%] left-[7%]">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-purple-500/10 blur-md" />
            <div className="relative w-2 h-2 rounded-full bg-purple-300/60" />
          </div>
        </div>

        <div className="absolute top-[70%] left-[20%]">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-violet-500/10 blur-md" />
            <div className="relative w-1.5 h-1.5 rounded-full bg-violet-300/50" />
          </div>
        </div>

        {/* Right nodes */}

        <div className="absolute top-[23%] right-[8%]">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-violet-500/10 blur-md" />
            <div className="relative w-2 h-2 rounded-full bg-violet-300/70" />
          </div>
        </div>

        <div className="absolute top-[38%] right-[17%]">
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-fuchsia-500/10 blur-md" />
            <div className="relative w-1.5 h-1.5 rounded-full bg-fuchsia-300/60" />
          </div>
        </div>

        <div className="absolute top-[57%] right-[7%]">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-purple-500/10 blur-md" />
            <div className="relative w-2 h-2 rounded-full bg-purple-300/60" />
          </div>
        </div>

        <div className="absolute top-[70%] right-[20%]">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-violet-500/10 blur-md" />
            <div className="relative w-1.5 h-1.5 rounded-full bg-violet-300/50" />
          </div>
        </div>

        {/* =====================================================
            SMALL FLOATING DATA POINTS
        ===================================================== */}

        <div className="absolute top-[18%] left-[25%] w-1 h-1 rounded-full bg-white/20" />

        <div className="absolute top-[29%] left-[30%] w-1 h-1 rounded-full bg-violet-300/30" />

        <div className="absolute top-[48%] left-[26%] w-1 h-1 rounded-full bg-fuchsia-300/20" />

        <div className="absolute top-[63%] left-[30%] w-1 h-1 rounded-full bg-white/20" />

        <div className="absolute top-[18%] right-[25%] w-1 h-1 rounded-full bg-white/20" />

        <div className="absolute top-[29%] right-[30%] w-1 h-1 rounded-full bg-violet-300/30" />

        <div className="absolute top-[48%] right-[26%] w-1 h-1 rounded-full bg-fuchsia-300/20" />

        <div className="absolute top-[63%] right-[30%] w-1 h-1 rounded-full bg-white/20" />

        {/* =====================================================
            CENTRAL LIGHT BEHIND OCCUSYNC
        ===================================================== */}

        <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-violet-600/[0.08] blur-[100px]" />

        {/* =====================================================
            VERTICAL LIGHT BEAMS
        ===================================================== */}

        <div className="absolute top-0 left-[12%] w-px h-[65%] bg-gradient-to-b from-transparent via-violet-400/[0.08] to-transparent" />

        <div className="absolute top-0 right-[12%] w-px h-[65%] bg-gradient-to-b from-transparent via-violet-400/[0.08] to-transparent" />

        {/* =====================================================
            SUBTLE GRID
        ===================================================== */}

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Hero Content */}

        <div className="text-center">

          {/* Small Label */}

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.10] backdrop-blur-xl shadow-lg shadow-purple-950/20 mb-8">

            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>

            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-violet-200">
              Smarter Service Management
            </span>

          </div>

          {/* Main Heading */}

          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-semibold tracking-[-0.06em] leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-violet-300">
            OccuSync
          </h1>

          {/* Tagline */}

          <p className="mt-8 text-base sm:text-lg md:text-xl text-slate-300 font-light tracking-wide">
            “Smarter service management, all in one place.”
          </p>

          {/* Buttons */}

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

            {/* GET STARTED FREE */}

            <button
              type="button"
              onClick={() => setShowProfileModal(true)}
              className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white text-sm font-semibold shadow-xl shadow-purple-950/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-900/50 transition-all duration-300"
            >
              Get Started Free

              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* SCHEDULE LIVE DEMO */}

            <button
              type="button"
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/[0.035] border border-white/[0.12] text-slate-200 text-sm font-medium backdrop-blur-xl hover:bg-white/[0.07] hover:border-violet-400/30 hover:text-white transition-all duration-300"
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

          <div className="hidden lg:block absolute -left-8 top-16 w-56 rounded-2xl border border-white/[0.10] bg-[#0d0916]/80 backdrop-blur-xl p-4 shadow-2xl shadow-black/40 rotate-[-4deg] z-20">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-400/10 flex items-center justify-center">
                <Wrench className="w-5 h-5 text-violet-300" />
              </div>

              <div>
                <p className="text-[10px] text-slate-500">
                  NEW WORK ORDER
                </p>

                <p className="text-xs font-semibold text-white mt-1">
                  Aircon Repair
                </p>
              </div>

            </div>

            <div className="flex items-center gap-2 mt-4 text-[10px] text-slate-400">
              <MapPin className="w-3 h-3 text-violet-300" />
              Shah Alam
            </div>

          </div>

          {/* Right Floating Card */}

          <div className="hidden lg:block absolute -right-8 top-28 w-56 rounded-2xl border border-white/[0.10] bg-[#0d0916]/80 backdrop-blur-xl p-4 shadow-2xl shadow-black/40 rotate-[4deg] z-20">

            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-400/10 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              </div>

              <div>
                <p className="text-[10px] text-slate-500">
                  STATUS
                </p>

                <p className="text-xs font-semibold text-white mt-1">
                  Completed
                </p>
              </div>

            </div>

            <div className="mt-4 flex items-center justify-between text-[10px]">

              <span className="text-slate-500">
                Invoice #INV-2026-08
              </span>

              <span className="text-emerald-300">
                Paid
              </span>

            </div>

          </div>

          {/* Dashboard Preview */}

          <div className="relative max-w-5xl mx-auto">

            <div className="absolute inset-0 bg-purple-600/20 blur-[120px] rounded-full" />

            <div className="relative rounded-[28px] border border-white/[0.10] bg-[#08060d]/90 backdrop-blur-2xl shadow-[0_40px_120px_rgba(0,0,0,0.55)] overflow-hidden">

              {/* Browser Bar */}

              <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08] bg-white/[0.015]">

                <div className="flex items-center gap-2">

                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />

                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />

                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />

                  <span className="hidden sm:block ml-3 text-[10px] font-mono text-slate-600">
                    occusync.app/dashboard
                  </span>

                </div>

                <div className="flex items-center gap-2">

                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />

                  <span className="text-[10px] sm:text-xs text-emerald-300 font-medium">
                    Live System
                  </span>

                </div>

              </div>

              {/* Dashboard */}

              <div className="p-5 md:p-8">

                {/* Dashboard Stats */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                  {/* Active Jobs */}

                  <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-3">

                        <div className="w-9 h-9 rounded-lg bg-violet-500/10 flex items-center justify-center">
                          <Zap className="w-4 h-4 text-violet-300" />
                        </div>

                        <div>

                          <p className="text-[10px] text-slate-500">
                            ACTIVE JOBS
                          </p>

                          <p className="text-xl font-semibold text-white mt-1">
                            24
                          </p>

                        </div>

                      </div>

                      <span className="text-[10px] text-emerald-300">
                        +12%
                      </span>

                    </div>

                  </div>

                  {/* Service Providers */}

                  <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">

                    <div className="flex items-center gap-3">

                      <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <Users className="w-4 h-4 text-blue-300" />
                      </div>

                      <div>

                        <p className="text-[10px] text-slate-500">
                          SERVICE PROVIDERS
                        </p>

                        <p className="text-xl font-semibold text-white mt-1">
                          128
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* Completed */}

                  <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">

                    <div className="flex items-center gap-3">

                      <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                      </div>

                      <div>

                        <p className="text-[10px] text-slate-500">
                          COMPLETED
                        </p>

                        <p className="text-xl font-semibold text-white mt-1">
                          96%
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

                {/* Main Dashboard */}

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mt-4">

                  {/* Activity */}

                  <div className="lg:col-span-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                          Today's Activity
                        </p>

                        <h3 className="text-sm font-semibold text-white mt-1">
                          Service Operations
                        </h3>

                      </div>

                      <CalendarDays className="w-4 h-4 text-slate-600" />

                    </div>

                    <div className="mt-5 space-y-3">

                      {/* Activity 1 */}

                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.025]">

                        <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                          <Wrench className="w-4 h-4 text-violet-300" />
                        </div>

                        <div className="flex-1 text-left">

                          <p className="text-xs font-medium text-white">
                            Aircon Maintenance
                          </p>

                          <p className="text-[10px] text-slate-600 mt-1">
                            Technician assigned
                          </p>

                        </div>

                        <span className="text-[10px] text-violet-300">
                          In Progress
                        </span>

                      </div>

                      {/* Activity 2 */}

                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.025]">

                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                          <CalendarDays className="w-4 h-4 text-amber-300" />
                        </div>

                        <div className="flex-1 text-left">

                          <p className="text-xs font-medium text-white">
                            Plumbing Inspection
                          </p>

                          <p className="text-[10px] text-slate-600 mt-1">
                            Scheduled for 2:30 PM
                          </p>

                        </div>

                        <span className="text-[10px] text-amber-300">
                          Scheduled
                        </span>

                      </div>

                      {/* Activity 3 */}

                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.025]">

                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                        </div>

                        <div className="flex-1 text-left">

                          <p className="text-xs font-medium text-white">
                            Electrical Wiring Fix
                          </p>

                          <p className="text-[10px] text-slate-600 mt-1">
                            Invoice completed
                          </p>

                        </div>

                        <span className="text-[10px] text-emerald-300">
                          Completed
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* Smart Dispatch */}

                  <div className="lg:col-span-2 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-purple-500/[0.08] to-fuchsia-500/[0.03] p-5">

                    <p className="text-[10px] font-semibold tracking-wider text-violet-300 uppercase">
                      Smart Dispatch
                    </p>

                    <h3 className="text-lg font-semibold text-white mt-2">
                      Best match found
                    </h3>

                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      OccuSync automatically matches the right technician
                      based on skills, location and availability.
                    </p>

                    {/* Technician */}

                    <div className="mt-6 p-4 rounded-xl bg-black/20 border border-white/[0.06]">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500/40 to-fuchsia-500/30 flex items-center justify-center text-sm font-semibold text-white">
                          MV
                        </div>

                        <div>

                          <p className="text-xs font-semibold text-white">
                            Marcus V.
                          </p>

                          <p className="text-[10px] text-slate-500 mt-1">
                            HVAC Specialist
                          </p>

                        </div>

                        <div className="ml-auto">
                          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                        </div>

                      </div>

                      <div className="flex items-center gap-2 mt-4 text-[10px] text-slate-500">

                        <MapPin className="w-3 h-3 text-violet-300" />

                        1.8 km away

                        <span className="mx-1 text-slate-700">
                          •
                        </span>

                        <span className="text-emerald-300">
                          Available
                        </span>

                      </div>

                    </div>

                    {/* Assigned Status */}

                    <div className="mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-violet-500/10 border border-violet-400/10 text-xs font-medium text-violet-200">
                      Technician Automatically Assigned
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =========================================================
            FEATURE HIGHLIGHTS
        ========================================================= */}

        <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-3">

          {/* Smart Dispatch */}

          <div className="group p-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl hover:bg-white/[0.04] hover:border-violet-400/[0.15] transition-all">

            <div className="flex items-center gap-4">

              <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-400/10 flex items-center justify-center">
                <Zap className="w-4 h-4 text-violet-300" />
              </div>

              <div>

                <h4 className="text-sm font-semibold text-white">
                  Smart Dispatch
                </h4>

                <p className="text-xs text-slate-500 mt-1">
                  Skill & location matching
                </p>

              </div>

            </div>

          </div>

          {/* Instant Verification */}

          <div className="group p-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl hover:bg-white/[0.04] hover:border-blue-400/[0.15] transition-all">

            <div className="flex items-center gap-4">

              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-400/10 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-blue-300" />
              </div>

              <div>

                <h4 className="text-sm font-semibold text-white">
                  Instant Verification
                </h4>

                <p className="text-xs text-slate-500 mt-1">
                  Automated compliance
                </p>

              </div>

            </div>

          </div>

          {/* Automated CRM */}

          <div className="group p-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl hover:bg-white/[0.04] hover:border-pink-400/[0.15] transition-all">

            <div className="flex items-center gap-4">

              <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-400/10 flex items-center justify-center">
                <Users className="w-4 h-4 text-pink-300" />
              </div>

              <div>

                <h4 className="text-sm font-semibold text-white">
                  Automated CRM
                </h4>

                <p className="text-xs text-slate-500 mt-1">
                  Invoicing & job history
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =========================================================
          SELECT PROFILE MODAL
      ========================================================= */}

      <SelectProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />

    </section>
  );
}