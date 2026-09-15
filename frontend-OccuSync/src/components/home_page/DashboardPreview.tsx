import {
  Calendar,
  Users,
  ClipboardList,
  CheckCircle,
  Clock3,
  TrendingUp,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

export default function DashboardPreview() {
  return (
    <section
      id="dashboard"
      className="relative overflow-hidden py-20"
    >
      {/* ===================================================== */}
      {/* BACKGROUND */}
      {/* ===================================================== */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* Atmospheric glows */}

        <div className="absolute top-[-200px] left-[-250px] w-[650px] h-[650px] rounded-full bg-violet-700/[0.08] blur-[170px]" />

        <div className="absolute top-[25%] right-[-250px] w-[650px] h-[650px] rounded-full bg-purple-900/[0.10] blur-[180px]" />

        <div className="absolute bottom-[-250px] left-[30%] w-[700px] h-[500px] rounded-full bg-fuchsia-900/[0.07] blur-[180px]" />

        {/* Center glow */}

        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[800px] h-[450px] rounded-full bg-violet-600/[0.035] blur-[130px]" />


        {/* ================================================= */}
        {/* RADIAL RINGS */}
        {/* ================================================= */}

        <div className="absolute top-[-350px] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full border border-violet-400/[0.03]" />

        <div className="absolute top-[-280px] left-1/2 -translate-x-1/2 w-[820px] h-[820px] rounded-full border border-purple-300/[0.025]" />

        <div className="absolute top-[-210px] left-1/2 -translate-x-1/2 w-[650px] h-[650px] rounded-full border border-fuchsia-300/[0.02]" />


        {/* ================================================= */}
        {/* LEFT NETWORK */}
        {/* ================================================= */}

        <svg
          className="absolute left-[-280px] top-[5%] w-[700px] h-[750px] opacity-40"
          viewBox="0 0 700 700"
          fill="none"
        >
          <path
            d="M0 180 C180 40 350 100 430 250 C500 380 420 520 680 630"
            stroke="rgba(139,92,246,0.09)"
            strokeWidth="1"
          />

          <path
            d="M0 320 C150 190 280 200 360 320 C440 440 360 560 630 700"
            stroke="rgba(217,70,239,0.06)"
            strokeWidth="1"
          />
        </svg>


        {/* ================================================= */}
        {/* RIGHT NETWORK */}
        {/* ================================================= */}

        <svg
          className="absolute right-[-280px] top-[5%] w-[700px] h-[750px] opacity-40"
          viewBox="0 0 700 700"
          fill="none"
        >
          <path
            d="M700 180 C520 40 350 100 270 250 C200 380 280 520 20 630"
            stroke="rgba(139,92,246,0.09)"
            strokeWidth="1"
          />

          <path
            d="M700 320 C550 190 420 200 340 320 C260 440 340 560 70 700"
            stroke="rgba(217,70,239,0.06)"
            strokeWidth="1"
          />
        </svg>


        {/* ================================================= */}
        {/* SUBTLE GRID */}
        {/* ================================================= */}

        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "100px 100px",
          }}
        />

      </div>


      {/* ===================================================== */}
      {/* MAIN CONTENT */}
      {/* ===================================================== */}

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* SECTION INTRO */}

        <div className="text-center mb-10">

          <p className="text-xs font-bold tracking-[0.2em] text-violet-300 uppercase">
            BUSINESS MANAGEMENT PORTAL
          </p>

          <h2 className="text-3xl md:text-4xl font-black text-white mt-2">
            Everything your team needs, in one place
          </h2>

          <p className="text-sm text-slate-400 mt-3 max-w-2xl mx-auto">
            Manage work orders, schedules, customers and service operations
            from a single streamlined dashboard.
          </p>

        </div>


        {/* ===================================================== */}
        {/* DASHBOARD WINDOW */}
        {/* ===================================================== */}

        <div
          className="
            relative
            rounded-3xl
            border
            border-white/[0.10]
            bg-[#080711]/75
            backdrop-blur-2xl
            shadow-2xl
            shadow-black/40
            overflow-hidden
          "
        >

          {/* ================================================= */}
          {/* DASHBOARD TOP BAR */}
          {/* ================================================= */}

          <div className="px-6 md:px-8 py-5 border-b border-white/[0.07] flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div className="flex items-center gap-3">

              {/* Window dots */}

              <div className="hidden sm:flex items-center gap-1.5 mr-2">
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                  Business Dashboard
                </p>

                <p className="text-sm font-bold text-white mt-0.5">
                  CoolPro Services
                </p>
              </div>

            </div>


            <div className="flex items-center gap-3">

              <span className="flex items-center gap-2 text-[11px] text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                System operational
              </span>

              <button
                type="button"
                className="
                  px-4
                  py-2
                  rounded-lg
                  bg-violet-600
                  hover:bg-violet-500
                  text-white
                  text-[11px]
                  font-bold
                  transition-colors
                "
              >
                + New Work Order
              </button>

            </div>

          </div>


          {/* ================================================= */}
          {/* DASHBOARD BODY */}
          {/* ================================================= */}

          <div className="p-5 md:p-7">


            {/* ================================================= */}
            {/* SUMMARY STATISTICS */}
            {/* ================================================= */}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">

              {/* TOTAL ORDERS */}

              <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">

                <div className="flex items-center justify-between">

                  <div className="w-8 h-8 rounded-lg bg-violet-500/10 text-violet-300 flex items-center justify-center">
                    <ClipboardList className="w-4 h-4" />
                  </div>

                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-600" />

                </div>

                <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-3">
                  Active Orders
                </p>

                <p className="text-xl font-black text-white mt-1">
                  24
                </p>

                <p className="text-[10px] text-emerald-400 mt-1">
                  +12% this week
                </p>

              </div>


              {/* SCHEDULED */}

              <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">

                <div className="flex items-center justify-between">

                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-300 flex items-center justify-center">
                    <Calendar className="w-4 h-4" />
                  </div>

                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-600" />

                </div>

                <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-3">
                  Scheduled
                </p>

                <p className="text-xl font-black text-white mt-1">
                  8
                </p>

                <p className="text-[10px] text-slate-500 mt-1">
                  For today
                </p>

              </div>


              {/* CUSTOMERS */}

              <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">

                <div className="flex items-center justify-between">

                  <div className="w-8 h-8 rounded-lg bg-fuchsia-500/10 text-fuchsia-300 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>

                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-600" />

                </div>

                <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-3">
                  Customers
                </p>

                <p className="text-xl font-black text-white mt-1">
                  186
                </p>

                <p className="text-[10px] text-emerald-400 mt-1">
                  +8 new this month
                </p>

              </div>


              {/* COMPLETION RATE */}

              <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">

                <div className="flex items-center justify-between">

                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-300 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>

                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-600" />

                </div>

                <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-3">
                  Completion Rate
                </p>

                <p className="text-xl font-black text-white mt-1">
                  94%
                </p>

                <p className="text-[10px] text-emerald-400 mt-1">
                  Above target
                </p>

              </div>

            </div>


            {/* ================================================= */}
            {/* MAIN DASHBOARD GRID */}
            {/* ================================================= */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">


              {/* ================================================= */}
              {/* LEFT: WORK ORDERS */}
              {/* ================================================= */}

              <div className="lg:col-span-2 rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">

                {/* Header */}

                <div className="px-5 py-4 border-b border-white/[0.07] flex items-center justify-between">

                  <div>

                    <p className="text-xs font-bold text-white">
                      Recent Work Orders
                    </p>

                    <p className="text-[10px] text-slate-500 mt-1">
                      Track your team's latest assignments
                    </p>

                  </div>

                  <button
                    type="button"
                    className="text-[10px] font-bold text-violet-300 hover:text-violet-200"
                  >
                    View all
                  </button>

                </div>


                {/* WORK ORDER 1 */}

                <div className="p-5 border-b border-white/[0.06] hover:bg-white/[0.02] transition-colors">

                  <div className="flex items-start justify-between gap-4">

                    <div className="flex gap-3">

                      <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-300 flex items-center justify-center shrink-0">
                        <WrenchIcon />
                      </div>

                      <div>

                        <div className="flex items-center gap-2 flex-wrap">

                          <h4 className="text-sm font-bold text-white">
                            Aircon Repair
                          </h4>

                          <span className="text-[9px] font-bold text-emerald-300 bg-emerald-400/10 border border-emerald-400/10 px-2 py-0.5 rounded-full">
                            IN PROGRESS
                          </span>

                        </div>

                        <p className="text-[10px] text-slate-500 mt-1">
                          #WO-9021 · John Doe
                        </p>

                      </div>

                    </div>

                    <span className="text-[10px] text-slate-600">
                      Today
                    </span>

                  </div>


                  <div className="mt-4">

                    <div className="flex justify-between text-[10px] mb-1.5">

                      <span className="text-slate-500">
                        Technician: Alex R.
                      </span>

                      <span className="text-emerald-300">
                        68%
                      </span>

                    </div>

                    <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">

                      <div className="h-full w-[68%] bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" />

                    </div>

                  </div>

                </div>


                {/* WORK ORDER 2 */}

                <div className="p-5 border-b border-white/[0.06] hover:bg-white/[0.02] transition-colors">

                  <div className="flex items-start justify-between gap-4">

                    <div className="flex gap-3">

                      <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-300 flex items-center justify-center shrink-0">
                        <Clock3 className="w-4 h-4" />
                      </div>

                      <div>

                        <div className="flex items-center gap-2 flex-wrap">

                          <h4 className="text-sm font-bold text-white">
                            Aircon Maintenance
                          </h4>

                          <span className="text-[9px] font-bold text-amber-300 bg-amber-400/10 border border-amber-400/10 px-2 py-0.5 rounded-full">
                            SCHEDULED
                          </span>

                        </div>

                        <p className="text-[10px] text-slate-500 mt-1">
                          #WO-9022 · Tech Corp Inc
                        </p>

                      </div>

                    </div>

                    <span className="text-[10px] text-slate-600">
                      2:30 PM
                    </span>

                  </div>


                  <div className="flex items-center gap-2 mt-4 text-[10px] text-slate-500">

                    <Calendar className="w-3.5 h-3.5 text-violet-300" />

                    Technician assignment pending

                  </div>

                </div>


                {/* WORK ORDER 3 */}

                <div className="p-5 hover:bg-white/[0.02] transition-colors">

                  <div className="flex items-start justify-between gap-4">

                    <div className="flex gap-3">

                      <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-300 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-4 h-4" />
                      </div>

                      <div>

                        <div className="flex items-center gap-2 flex-wrap">

                          <h4 className="text-sm font-bold text-white">
                            System Installation
                          </h4>

                          <span className="text-[9px] font-bold text-blue-300 bg-blue-400/10 border border-blue-400/10 px-2 py-0.5 rounded-full">
                            COMPLETED
                          </span>

                        </div>

                        <p className="text-[10px] text-slate-500 mt-1">
                          #WO-9020 · Sarah Smith
                        </p>

                      </div>

                    </div>

                    <span className="text-[10px] font-semibold text-white">
                      $450
                    </span>

                  </div>

                </div>

              </div>


              {/* ================================================= */}
              {/* RIGHT SIDE */}
              {/* ================================================= */}

              <div className="space-y-5">


                {/* TODAY'S SCHEDULE */}

                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-xs font-bold text-white">
                        Today's Schedule
                      </p>

                      <p className="text-[10px] text-slate-500 mt-1">
                        3 assignments remaining
                      </p>

                    </div>

                    <Calendar className="w-4 h-4 text-violet-300" />

                  </div>


                  <div className="mt-5 space-y-4">

                    <div className="flex gap-3">

                      <div className="text-[10px] font-bold text-violet-300 w-12">
                        09:00
                      </div>

                      <div className="flex-1">

                        <p className="text-[11px] font-semibold text-white">
                          Aircon Inspection
                        </p>

                        <p className="text-[9px] text-slate-500 mt-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          Shah Alam
                        </p>

                      </div>

                    </div>


                    <div className="flex gap-3">

                      <div className="text-[10px] font-bold text-violet-300 w-12">
                        14:30
                      </div>

                      <div className="flex-1">

                        <p className="text-[11px] font-semibold text-white">
                          Maintenance Service
                        </p>

                        <p className="text-[9px] text-slate-500 mt-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          Petaling Jaya
                        </p>

                      </div>

                    </div>


                    <div className="flex gap-3">

                      <div className="text-[10px] font-bold text-violet-300 w-12">
                        17:00
                      </div>

                      <div className="flex-1">

                        <p className="text-[11px] font-semibold text-white">
                          Electrical Repair
                        </p>

                        <p className="text-[9px] text-slate-500 mt-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          Subang Jaya
                        </p>

                      </div>

                    </div>

                  </div>

                </div>


                {/* TEAM AVAILABILITY */}

                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-xs font-bold text-white">
                        Team Availability
                      </p>

                      <p className="text-[10px] text-slate-500 mt-1">
                        Technician status
                      </p>

                    </div>

                    <Users className="w-4 h-4 text-fuchsia-300" />

                  </div>


                  <div className="mt-5 space-y-3">

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-2">

                        <span className="w-2 h-2 rounded-full bg-emerald-400" />

                        <span className="text-[10px] text-slate-300">
                          Available
                        </span>

                      </div>

                      <span className="text-xs font-bold text-white">
                        5
                      </span>

                    </div>


                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-2">

                        <span className="w-2 h-2 rounded-full bg-amber-400" />

                        <span className="text-[10px] text-slate-300">
                          On Assignment
                        </span>

                      </div>

                      <span className="text-xs font-bold text-white">
                        8
                      </span>

                    </div>


                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-2">

                        <span className="w-2 h-2 rounded-full bg-slate-500" />

                        <span className="text-[10px] text-slate-300">
                          Off Duty
                        </span>

                      </div>

                      <span className="text-xs font-bold text-white">
                        2
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}


/* ========================================================= */
/* SMALL ICON COMPONENT                                      */
/* ========================================================= */

function WrenchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-4 h-4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.7 6.3a4.1 4.1 0 0 0-5.4 5.4L3 18a2.1 2.1 0 0 0 3 3l6.3-6.3a4.1 4.1 0 0 0 5.4-5.4l-3 3-3-3 3-3z" />
    </svg>
  );
}