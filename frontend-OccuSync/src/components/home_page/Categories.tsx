import { ShieldCheck, Wrench, Building, Home, Zap, Brush } from "lucide-react";

export default function Categories() {
  const categories = [
    { title: "Residential Repairs", icon: Home, count: "1.2k Providers" },
    { title: "HVAC & Air Conditioning", icon: Zap, count: "850 Providers" },
    { title: "Commercial Plumbing", icon: Wrench, count: "620 Providers" },
    { title: "Facility Maintenance", icon: Building, count: "410 Providers" },
    { title: "Electrical Installations", icon: ShieldCheck, count: "930 Providers" },
    { title: "Landscaping & Cleaning", icon: Brush, count: "1.5k Providers" },
  ];

  return (
    <section id="categories" className="relative overflow-hidden py-20 font-sans">
      {/* BACKGROUND (MONOCHROME GALAXY) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-180px] left-[10%] w-[550px] h-[550px] rounded-full bg-slate-300/40 blur-[150px]" />
        <div className="absolute top-[30%] right-[-200px] w-[600px] h-[600px] rounded-full bg-gray-300/30 blur-[170px]" />

        <div className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full border border-slate-300/40" />
        <div className="absolute top-[-230px] left-1/2 -translate-x-1/2 w-[750px] h-[750px] rounded-full border border-gray-300/30" />

        <svg className="absolute left-[-250px] top-[5%] w-[650px] h-[700px] opacity-60" viewBox="0 0 700 700" fill="none">
          <path d="M0 180 C180 50 340 100 430 250 C500 380 420 520 650 620" stroke="rgba(148,163,184,0.4)" strokeWidth="1" />
        </svg>

        <svg className="absolute right-[-250px] top-[8%] w-[650px] h-[700px] opacity-60" viewBox="0 0 700 700" fill="none">
          <path d="M700 180 C520 50 360 100 270 250 C200 380 280 520 50 620" stroke="rgba(148,163,184,0.4)" strokeWidth="1" />
        </svg>

        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)", backgroundSize: "100px 100px" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Customer Categories
            </p>
            <h2 className="text-3xl font-black text-[#1E293B] mt-2">
              Find the right service
            </h2>
            <p className="text-sm text-slate-500 font-medium mt-2">
              Browse verified service categories near you
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div key={idx} className="group relative overflow-hidden p-8 rounded-[1.5rem] border border-white bg-white/80 backdrop-blur-xl shadow-[0_8px_24px_rgba(149,157,165,0.06)] hover:bg-white hover:shadow-[0_12px_30px_rgba(149,157,165,0.1)] hover:-translate-y-1 transition-all duration-300">
                <div className="relative w-14 h-14 rounded-full bg-[#F1F5F9] shadow-inner border border-slate-50 text-[#1E293B] flex items-center justify-center transition-all duration-300">
                  <Icon className="w-6 h-6 text-slate-700" />
                </div>
                <div className="relative mt-6">
                  <h3 className="font-bold text-[#1E293B] text-lg">{cat.title}</h3>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-2">{cat.count}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}