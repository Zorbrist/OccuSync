export default function Metrics() {
  const stats = [
    {
      label: "Active Service Pros",
      value: "20,000+",
    },
    {
      label: "Bookings Completed",
      value: "85M+",
    },
    {
      label: "Average Customer Rating",
      value: "2.4k+ (4.9★)",
    },
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden px-6 py-24 scroll-mt-24"
    >
      {/* =========================================================
          BACKGROUND
      ========================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* Soft purple glow - top center */}
        <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-purple-700/[0.10] blur-[180px]" />

        {/* Left atmospheric glow */}
        <div className="absolute top-[20%] left-[-300px] w-[650px] h-[650px] rounded-full bg-fuchsia-900/[0.10] blur-[180px]" />

        {/* Right atmospheric glow */}
        <div className="absolute top-[10%] right-[-300px] w-[650px] h-[650px] rounded-full bg-violet-900/[0.12] blur-[180px]" />

        {/* Bottom glow */}
        <div className="absolute bottom-[-300px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-purple-950/[0.35] blur-[170px]" />

        {/* =====================================================
            SUBTLE RADIAL RINGS
        ===================================================== */}
        <div className="absolute top-[-400px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full border border-violet-400/[0.045]" />

        <div className="absolute top-[-330px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full border border-purple-300/[0.04]" />

        {/* =====================================================
            LEFT NETWORK LINES
        ===================================================== */}
        <svg
          className="absolute left-[-180px] top-[5%] w-[700px] h-[700px] opacity-50"
          viewBox="0 0 700 700"
          fill="none"
        >
          <path
            d="M0 180 C180 40 350 100 430 250 C500 380 420 520 650 620"
            stroke="rgba(139,92,246,0.10)"
            strokeWidth="1"
          />

          <path
            d="M0 300 C150 180 270 190 350 310 C430 430 360 560 600 700"
            stroke="rgba(217,70,239,0.07)"
            strokeWidth="1"
          />

          <path
            d="M80 0 C190 160 250 220 220 370 C190 500 300 570 500 650"
            stroke="rgba(167,139,250,0.07)"
            strokeWidth="1"
          />
        </svg>

        {/* =====================================================
            RIGHT NETWORK LINES
        ===================================================== */}
        <svg
          className="absolute right-[-180px] top-[5%] w-[700px] h-[700px] opacity-50"
          viewBox="0 0 700 700"
          fill="none"
        >
          <path
            d="M700 180 C520 40 350 100 270 250 C200 380 280 520 50 620"
            stroke="rgba(139,92,246,0.10)"
            strokeWidth="1"
          />

          <path
            d="M700 300 C550 180 430 190 350 310 C270 430 340 560 100 700"
            stroke="rgba(217,70,239,0.07)"
            strokeWidth="1"
          />

          <path
            d="M620 0 C510 160 450 220 480 370 C510 500 400 570 200 650"
            stroke="rgba(167,139,250,0.07)"
            strokeWidth="1"
          />
        </svg>

        {/* =====================================================
            SMALL GLOWING NODES
        ===================================================== */}

        <div className="absolute top-[25%] left-[10%]">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-violet-500/[0.08] blur-md" />
            <div className="relative w-1.5 h-1.5 rounded-full bg-violet-300/50" />
          </div>
        </div>

        <div className="absolute top-[55%] left-[18%]">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-fuchsia-500/[0.08] blur-md" />
            <div className="relative w-1.5 h-1.5 rounded-full bg-fuchsia-300/40" />
          </div>
        </div>

        <div className="absolute top-[30%] right-[10%]">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-violet-500/[0.08] blur-md" />
            <div className="relative w-1.5 h-1.5 rounded-full bg-violet-300/50" />
          </div>
        </div>

        <div className="absolute top-[60%] right-[18%]">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-fuchsia-500/[0.08] blur-md" />
            <div className="relative w-1.5 h-1.5 rounded-full bg-fuchsia-300/40" />
          </div>
        </div>

        {/* =====================================================
            SUBTLE GRID
        ===================================================== */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "100px 100px",
          }}
        />

        {/* =====================================================
            CENTER LIGHT
        ===================================================== */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-violet-600/[0.05] blur-[120px]" />
      </div>

      {/* =========================================================
          CONTENT
      ========================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-14">

          <p className="text-xs font-bold tracking-[0.25em] text-violet-300 uppercase">
            FOR USERS & SERVICE PROVIDERS
          </p>

          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Everything you need to manage
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-fuchsia-300 to-pink-300">
              service operations
            </span>
          </h2>

          <p className="text-sm md:text-base text-slate-400 mt-5 max-w-2xl mx-auto leading-relaxed">
            Whether you are looking for a reliable pro or running a field
            operations team, OccuSync simplifies your workflow.
          </p>

        </div>

        {/* =========================================================
            METRIC CARDS
        ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">

          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.025] backdrop-blur-xl px-6 py-9 text-center transition-all duration-300 hover:bg-white/[0.04] hover:border-violet-400/[0.15]"
            >

              {/* Card glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-violet-500/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative">

                <div className="text-4xl md:text-5xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-fuchsia-300 to-pink-300">
                  {stat.value}
                </div>

                <p className="text-xs md:text-sm text-slate-400 mt-4">
                  {stat.label}
                </p>

              </div>
            </div>
          ))}

        </div>

        {/* Small divider */}
        <div className="mt-16 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-violet-400/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-violet-400/40" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-violet-400/20" />
        </div>

      </div>
    </section>
  );
}