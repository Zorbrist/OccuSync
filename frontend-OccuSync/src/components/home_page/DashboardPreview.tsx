import { Calendar, Users, ClipboardList, CheckCircle, Clock3, TrendingUp, MapPin, ArrowUpRight } from "lucide-react";

export default function DashboardPreview() {
  return (
    <section id="dashboard" className="relative overflow-hidden py-24 font-sans">
      {/* BACKGROUND (MONOCHROME GALAXY) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-200px] left-[-250px] w-[650px] h-[650px] rounded-full bg-slate-300/40 blur-[170px]" />
        <div className="absolute top-[25%] right-[-250px] w-[650px] h-[650px] rounded-full bg-gray-300/30 blur-[180px]" />

        <div className="absolute top-[-350px] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full border border-slate-300/40" />
        <div className="absolute top-[-280px] left-1/2 -translate-x-1/2 w-[820px] h-[820px] rounded-full border border-gray-300/30" />

        <svg className="absolute left-[-280px] top-[5%] w-[700px] h-[750px] opacity-60" viewBox="0 0 700 700" fill="none">
          <path d="M0 180 C180 40 350 100 430 250 C500 380 420 520 680 630" stroke="rgba(148,163,184,0.4)" strokeWidth="1" />
        </svg>

        <svg className="absolute right-[-280px] top-[5%] w-[700px] h-[750px] opacity-60" viewBox="0 0 700 700" fill="none">
          <path d="M700 180 C520 40 350 100 270 250 C200 380 280 520 20 630" stroke="rgba(148,163,184,0.4)" strokeWidth="1" />
        </svg>

        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)", backgroundSize: "100px 100px" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Business Management Portal
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#1E293B] mt-2">
            Everything your team needs, in one place
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-3 max-w-2xl mx-auto">
            Manage work orders, schedules, customers and service operations from a single streamlined dashboard.
          </p>
        </div>

        {/* DASHBOARD WINDOW */}
        <div className="relative rounded-[2.5rem] border border-white bg-white/80 backdrop-blur-2xl shadow-[0_20px_60px_rgba(149,157,165,0.15)] overflow-hidden">
          
          <div className="px-6 md:px-8 py-5 border-b border-slate-100 bg-white/60 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 mr-2">
                <span className="w-3 h-3 rounded-full bg-slate-300 shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-slate-300 shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-slate-300 shadow-sm" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Business Dashboard</p>
                <p className="text-sm font-bold text-[#1E293B] mt-0.5">CoolPro Services</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" /> System operational
              </span>
              <button type="button" className="px-5 py-2.5 rounded-[1rem] bg-black text-white text-[11px] font-bold uppercase tracking-wider shadow-[0_4px_14px_rgba(0,0,0,0.2)] hover:bg-slate-800 transition-colors">
                + New Work Order
              </button>
            </div>
          </div>

          <div className="p-6 md:p-8 bg-[#F1F5F9]/80">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              {[
                { icon: ClipboardList, title: "Active Orders", value: "24", sub: "+12% this week" },
                { icon: Calendar, title: "Scheduled", value: "8", sub: "For today" },
                { icon: Users, title: "Customers", value: "186", sub: "+8 new this month" },
                { icon: TrendingUp, title: "Completion Rate", value: "94%", sub: "Above target" }
              ].map((stat, i) => (
                <div key={i} className="rounded-[1.5rem] border border-white bg-white shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#F1F5F9] shadow-inner text-[#1E293B] flex items-center justify-center">
                      <stat.icon className="w-4 h-4" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 border border-slate-50">
                       <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">{stat.title}</p>
                  <p className="text-2xl font-black text-[#1E293B] mt-1">{stat.value}</p>
                  <p className="text-[11px] text-slate-500 mt-2 font-medium">{stat.sub}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 rounded-[1.5rem] border border-white bg-white shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-[#1E293B]">Recent Work Orders</p>
                  </div>
                  <button type="button" className="text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-black">View all</button>
                </div>
                <div className="p-6 bg-[#F8FAFC]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-50 text-[#1E293B] flex items-center justify-center shrink-0">
                        <WrenchIcon />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="text-sm font-bold text-[#1E293B]">Aircon Repair</h4>
                          <span className="text-[9px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">IN PROGRESS</span>
                        </div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">#WO-9021 · John Doe</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-[1.5rem] border border-white bg-white shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-sm font-bold text-[#1E293B]">Today's Schedule</p>
                    <Calendar className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="space-y-5">
                    <div className="flex gap-4">
                      <div className="text-[11px] font-bold text-slate-400 w-10 mt-0.5">09:00</div>
                      <div className="flex-1 bg-[#F8FAFC] border border-slate-50 p-3 rounded-[1rem]">
                        <p className="text-xs font-bold text-[#1E293B]">Aircon Inspection</p>
                        <p className="text-[10px] text-slate-500 font-medium mt-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> Shah Alam</p>
                      </div>
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

function WrenchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a4.1 4.1 0 0 0-5.4 5.4L3 18a2.1 2.1 0 0 0 3 3l6.3-6.3a4.1 4.1 0 0 0 5.4-5.4l-3 3-3-3 3-3z" />
    </svg>
  );
}