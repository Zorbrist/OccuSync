export default function Metrics() {
  const stats = [
    { label: "Active Service Pros", value: "20,000+" },
    { label: "Bookings Completed", value: "85M+" },
    { label: "Average Customer Rating", value: "2.4k+ (4.9★)" },
  ];

  return (
    <section id="about" className="relative overflow-hidden px-6 py-24 scroll-mt-24 font-sans">
      {/* BACKGROUND (MONOCHROME GALAXY) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-slate-300/40 blur-[180px]" />
        <div className="absolute top-[20%] left-[-300px] w-[650px] h-[650px] rounded-full bg-gray-300/30 blur-[180px]" />
        <div className="absolute top-[10%] right-[-300px] w-[650px] h-[650px] rounded-full bg-slate-300/30 blur-[180px]" />

        <div className="absolute top-[-400px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full border border-slate-300/40" />
        <div className="absolute top-[-330px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full border border-gray-300/30" />

        <svg className="absolute left-[-180px] top-[5%] w-[700px] h-[700px] opacity-60" viewBox="0 0 700 700" fill="none">
          <path d="M0 180 C180 40 350 100 430 250 C500 380 420 520 650 620" stroke="rgba(148,163,184,0.4)" strokeWidth="1" />
        </svg>

        <svg className="absolute right-[-180px] top-[5%] w-[700px] h-[700px] opacity-60" viewBox="0 0 700 700" fill="none">
          <path d="M700 180 C520 40 350 100 270 250 C200 380 280 520 50 620" stroke="rgba(148,163,184,0.4)" strokeWidth="1" />
        </svg>

        {/* SUBTLE GRID */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)", backgroundSize: "100px 100px" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            For Users & Service Providers
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-[#1E293B]">
            Everything you need to manage
            <span className="block text-slate-500 font-bold mt-2">service operations</span>
          </h2>
          <p className="text-sm md:text-base text-slate-500 mt-5 max-w-2xl mx-auto leading-relaxed font-medium">
            Whether you are looking for a reliable pro or running a field operations team, OccuSync simplifies your workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, idx) => (
            <div key={idx} className="group relative rounded-[1.5rem] border border-white bg-white/80 backdrop-blur-xl shadow-[0_8px_24px_rgba(149,157,165,0.06)] px-6 py-10 text-center transition-all duration-300 hover:bg-white hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(149,157,165,0.1)]">
              <div className="relative">
                <div className="text-4xl md:text-5xl font-black tracking-tight text-[#1E293B]">
                  {stat.value}
                </div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-4">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-slate-300" />
          <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-slate-300" />
        </div>
      </div>
    </section>
  );
}