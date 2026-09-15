export default function ServicesGrid() {
  const services = [
    {
      name: "Aircon Repair",
      rating: "4.9 ★",
      price: "From $80",
      desc: "Chemical overhaul, gas top-ups, leaking fixes",
    },
    {
      name: "Aircon Maintenance",
      rating: "4.8 ★",
      price: "From $50",
      desc: "Regular quarterly servicing & filter cleaning",
    },
    {
      name: "Aircon Installation",
      rating: "5.0 ★",
      price: "From $350",
      desc: "Inverter system setups, pipe trunking, multi-split",
    },
    {
      name: "Electrical Wiring",
      rating: "4.9 ★",
      price: "From $90",
      desc: "Short circuit repair, DB box upgrades, lighting",
    },
    {
      name: "Plumbing Unclog",
      rating: "4.7 ★",
      price: "From $70",
      desc: "Drain clearage, pipe leaks, sanitary installations",
    },
    {
      name: "Deep Home Cleaning",
      rating: "4.8 ★",
      price: "From $120",
      desc: "Post-renovation, tenancy handover, disinfection",
    },
  ];

  return (
    <section
      id="services"
      className="relative overflow-hidden py-20"
    >
      {/* ===================================================== */}
      {/* BACKGROUND */}
      {/* ===================================================== */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* Soft atmospheric glows */}

        <div className="absolute top-[-200px] left-[-180px] w-[600px] h-[600px] rounded-full bg-violet-700/[0.07] blur-[160px]" />

        <div className="absolute top-[25%] right-[-220px] w-[650px] h-[650px] rounded-full bg-purple-900/[0.09] blur-[170px]" />

        <div className="absolute bottom-[-250px] left-[35%] w-[700px] h-[500px] rounded-full bg-fuchsia-900/[0.06] blur-[180px]" />

        {/* Central soft glow */}

        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[750px] h-[400px] rounded-full bg-violet-600/[0.035] blur-[130px]" />


        {/* ================================================= */}
        {/* RADIAL RINGS */}
        {/* ================================================= */}

        <div className="absolute top-[-350px] left-1/2 -translate-x-1/2 w-[950px] h-[950px] rounded-full border border-violet-400/[0.03]" />

        <div className="absolute top-[-280px] left-1/2 -translate-x-1/2 w-[780px] h-[780px] rounded-full border border-purple-300/[0.03]" />

        <div className="absolute top-[-210px] left-1/2 -translate-x-1/2 w-[610px] h-[610px] rounded-full border border-fuchsia-300/[0.025]" />


        {/* ================================================= */}
        {/* LEFT NETWORK LINES */}
        {/* ================================================= */}

        <svg
          className="absolute left-[-250px] top-[5%] w-[700px] h-[750px] opacity-45"
          viewBox="0 0 700 700"
          fill="none"
        >
          <path
            d="M0 160 C170 30 340 100 430 250 C510 390 420 520 680 630"
            stroke="rgba(139,92,246,0.09)"
            strokeWidth="1"
          />

          <path
            d="M0 300 C150 180 280 200 360 320 C440 440 360 560 630 700"
            stroke="rgba(217,70,239,0.06)"
            strokeWidth="1"
          />

          <path
            d="M80 0 C190 150 250 230 220 370 C190 500 300 570 510 650"
            stroke="rgba(167,139,250,0.055)"
            strokeWidth="1"
          />
        </svg>


        {/* ================================================= */}
        {/* RIGHT NETWORK LINES */}
        {/* ================================================= */}

        <svg
          className="absolute right-[-250px] top-[5%] w-[700px] h-[750px] opacity-45"
          viewBox="0 0 700 700"
          fill="none"
        >
          <path
            d="M700 160 C530 30 360 100 270 250 C190 390 280 520 20 630"
            stroke="rgba(139,92,246,0.09)"
            strokeWidth="1"
          />

          <path
            d="M700 300 C550 180 420 200 340 320 C260 440 340 560 70 700"
            stroke="rgba(217,70,239,0.06)"
            strokeWidth="1"
          />

          <path
            d="M620 0 C510 150 450 230 480 370 C510 500 400 570 190 650"
            stroke="rgba(167,139,250,0.055)"
            strokeWidth="1"
          />
        </svg>


        {/* ================================================= */}
        {/* SMALL DATA NODES */}
        {/* ================================================= */}

        <div className="absolute top-[20%] left-[10%]">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-violet-500/[0.07] blur-md" />
            <div className="relative w-2 h-2 rounded-full bg-violet-300/35" />
          </div>
        </div>

        <div className="absolute top-[48%] left-[16%]">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-fuchsia-500/[0.06] blur-md" />
            <div className="relative w-1.5 h-1.5 rounded-full bg-fuchsia-300/30" />
          </div>
        </div>

        <div className="absolute bottom-[18%] left-[8%]">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-purple-500/[0.07] blur-md" />
            <div className="relative w-2 h-2 rounded-full bg-purple-300/30" />
          </div>
        </div>

        <div className="absolute top-[23%] right-[10%]">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-violet-500/[0.07] blur-md" />
            <div className="relative w-2 h-2 rounded-full bg-violet-300/35" />
          </div>
        </div>

        <div className="absolute top-[50%] right-[16%]">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-fuchsia-500/[0.06] blur-md" />
            <div className="relative w-1.5 h-1.5 rounded-full bg-fuchsia-300/30" />
          </div>
        </div>


        {/* ================================================= */}
        {/* SUBTLE GRID */}
        {/* ================================================= */}

        <div
          className="absolute inset-0 opacity-[0.016]"
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

        {/* SECTION HEADER */}

        <div className="text-center mb-10">

          <p className="text-xs font-bold tracking-[0.2em] text-violet-300 uppercase">
            SERVICE PROVIDER PORTAL
          </p>

          <h2 className="text-3xl font-black text-white mt-2">
            Services built for real-world needs
          </h2>

          <p className="text-sm text-slate-400 mt-2">
            Book directly or manage scheduled assignments
          </p>

        </div>


        {/* ================================================= */}
        {/* SERVICE CARDS */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {services.map((item, idx) => (
            <div
              key={idx}
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.08]
                bg-white/[0.025]
                backdrop-blur-sm
                p-6
                hover:bg-white/[0.045]
                hover:border-violet-400/20
                hover:-translate-y-1
                transition-all
                duration-300
              "
            >

              {/* Card glow */}

              <div
                className="
                  absolute
                  -top-24
                  -right-24
                  w-48
                  h-48
                  rounded-full
                  bg-violet-600/[0.07]
                  blur-3xl
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                  duration-500
                "
              />


              {/* SERVICE NAME + RATING */}

              <div className="relative flex justify-between items-start gap-3">

                <h3 className="font-bold text-white text-base">
                  {item.name}
                </h3>

                <span
                  className="
                    text-[11px]
                    font-bold
                    text-amber-300
                    bg-amber-400/[0.08]
                    border
                    border-amber-400/[0.10]
                    px-2
                    py-1
                    rounded-md
                    whitespace-nowrap
                  "
                >
                  {item.rating}
                </span>

              </div>


              {/* DESCRIPTION */}

              <p className="relative text-xs text-slate-400 mt-3 leading-relaxed min-h-[40px]">
                {item.desc}
              </p>


              {/* BOTTOM */}

              <div
                className="
                  relative
                  mt-6
                  pt-4
                  border-t
                  border-white/[0.07]
                  flex
                  items-center
                  justify-between
                "
              >

                <span className="text-sm font-bold text-white">
                  {item.price}
                </span>

                <button
                  type="button"
                  className="
                    text-xs
                    font-bold
                    text-violet-300
                    px-3
                    py-2
                    rounded-lg
                    border
                    border-violet-400/20
                    hover:bg-violet-500/[0.10]
                    hover:border-violet-400/30
                    transition-all
                  "
                >
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