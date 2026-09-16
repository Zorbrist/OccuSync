export default function ServicesGrid() {
  const services = [
    { name: "Aircon Repair", rating: "4.9 ★", price: "From $80", desc: "Chemical overhaul, gas top-ups, leaking fixes" },
    { name: "Aircon Maintenance", rating: "4.8 ★", price: "From $50", desc: "Regular quarterly servicing & filter cleaning" },
    { name: "Aircon Installation", rating: "5.0 ★", price: "From $350", desc: "Inverter system setups, pipe trunking, multi-split" },
    { name: "Electrical Wiring", rating: "4.9 ★", price: "From $90", desc: "Short circuit repair, DB box upgrades, lighting" },
    { name: "Plumbing Unclog", rating: "4.7 ★", price: "From $70", desc: "Drain clearage, pipe leaks, sanitary installations" },
    { name: "Deep Home Cleaning", rating: "4.8 ★", price: "From $120", desc: "Post-renovation, tenancy handover, disinfection" },
  ];

  return (
    <section id="services" className="relative overflow-hidden py-20 font-sans">
      {/* BACKGROUND (MONOCHROME GALAXY) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-200px] left-[-180px] w-[600px] h-[600px] rounded-full bg-slate-300/40 blur-[160px]" />
        <div className="absolute top-[25%] right-[-220px] w-[650px] h-[650px] rounded-full bg-gray-300/30 blur-[170px]" />

        <div className="absolute top-[-350px] left-1/2 -translate-x-1/2 w-[950px] h-[950px] rounded-full border border-slate-300/40" />
        <div className="absolute top-[-280px] left-1/2 -translate-x-1/2 w-[780px] h-[780px] rounded-full border border-gray-300/30" />

        <svg className="absolute left-[-250px] top-[5%] w-[700px] h-[750px] opacity-60" viewBox="0 0 700 700" fill="none">
          <path d="M0 160 C170 30 340 100 430 250 C510 390 420 520 680 630" stroke="rgba(148,163,184,0.4)" strokeWidth="1" />
        </svg>

        <svg className="absolute right-[-250px] top-[5%] w-[700px] h-[750px] opacity-60" viewBox="0 0 700 700" fill="none">
          <path d="M700 160 C530 30 360 100 270 250 C190 390 280 520 20 630" stroke="rgba(148,163,184,0.4)" strokeWidth="1" />
        </svg>

        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)", backgroundSize: "100px 100px" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Service Provider Portal
          </p>
          <h2 className="text-3xl font-black text-[#1E293B] mt-2">
            Services built for real-world needs
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-3">
            Book directly or manage scheduled assignments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((item, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-[1.5rem] border border-white bg-white/80 backdrop-blur-xl shadow-[0_8px_24px_rgba(149,157,165,0.06)] hover:bg-white hover:shadow-[0_12px_30px_rgba(149,157,165,0.1)] hover:-translate-y-1 p-8 transition-all duration-300">
              <div className="relative flex justify-between items-start gap-3">
                <h3 className="font-bold text-[#1E293B] text-lg">{item.name}</h3>
                <span className="text-[11px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-1 rounded-md whitespace-nowrap">
                  {item.rating}
                </span>
              </div>
              <p className="relative text-sm font-medium text-slate-500 mt-3 leading-relaxed min-h-[40px]">
                {item.desc}
              </p>
              <div className="relative mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-lg font-black text-[#1E293B]">{item.price}</span>
                <button type="button" className="text-[11px] font-bold uppercase tracking-wider text-[#1E293B] bg-[#F1F5F9] shadow-inner px-4 py-2.5 rounded-[1rem] hover:bg-slate-200 transition-all">
                  Book Slot
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}