import {
  ShieldCheck,
  Wrench,
  Building,
  Home,
  Zap,
  Brush,
} from "lucide-react";

export default function Categories() {
  const categories = [
    {
      title: "Residential Repairs",
      icon: Home,
      count: "1.2k Providers",
    },
    {
      title: "HVAC & Air Conditioning",
      icon: Zap,
      count: "850 Providers",
    },
    {
      title: "Commercial Plumbing",
      icon: Wrench,
      count: "620 Providers",
    },
    {
      title: "Facility Maintenance",
      icon: Building,
      count: "410 Providers",
    },
    {
      title: "Electrical Installations",
      icon: ShieldCheck,
      count: "930 Providers",
    },
    {
      title: "Landscaping & Cleaning",
      icon: Brush,
      count: "1.5k Providers",
    },
  ];

  return (
    <section
      id="categories"
      className="relative overflow-hidden py-20"
    >
      {/* ===================================================== */}
      {/* BACKGROUND */}
      {/* ===================================================== */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* Soft atmospheric glows */}

        <div className="absolute top-[-180px] left-[10%] w-[550px] h-[550px] rounded-full bg-purple-700/[0.08] blur-[150px]" />

        <div className="absolute top-[30%] right-[-200px] w-[600px] h-[600px] rounded-full bg-violet-900/[0.10] blur-[170px]" />

        <div className="absolute bottom-[-250px] left-[20%] w-[650px] h-[500px] rounded-full bg-fuchsia-900/[0.07] blur-[170px]" />

        {/* Subtle central glow */}

        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-violet-600/[0.04] blur-[120px]" />


        {/* ================================================= */}
        {/* RADIAL RINGS */}
        {/* ================================================= */}

        <div className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full border border-violet-400/[0.035]" />

        <div className="absolute top-[-230px] left-1/2 -translate-x-1/2 w-[750px] h-[750px] rounded-full border border-purple-300/[0.035]" />

        <div className="absolute top-[-170px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full border border-fuchsia-300/[0.025]" />


        {/* ================================================= */}
        {/* LEFT CURVED LINES */}
        {/* ================================================= */}

        <svg
          className="absolute left-[-250px] top-[5%] w-[650px] h-[700px] opacity-50"
          viewBox="0 0 700 700"
          fill="none"
        >
          <path
            d="M0 180 C180 50 340 100 430 250 C500 380 420 520 650 620"
            stroke="rgba(139,92,246,0.10)"
            strokeWidth="1"
          />

          <path
            d="M0 320 C150 190 280 210 360 320 C440 430 370 560 620 700"
            stroke="rgba(217,70,239,0.07)"
            strokeWidth="1"
          />

          <path
            d="M80 0 C190 160 250 220 220 370 C190 500 300 570 500 650"
            stroke="rgba(167,139,250,0.06)"
            strokeWidth="1"
          />
        </svg>


        {/* ================================================= */}
        {/* RIGHT CURVED LINES */}
        {/* ================================================= */}

        <svg
          className="absolute right-[-250px] top-[8%] w-[650px] h-[700px] opacity-50"
          viewBox="0 0 700 700"
          fill="none"
        >
          <path
            d="M700 180 C520 50 360 100 270 250 C200 380 280 520 50 620"
            stroke="rgba(139,92,246,0.10)"
            strokeWidth="1"
          />

          <path
            d="M700 320 C550 190 420 210 340 320 C260 430 330 560 80 700"
            stroke="rgba(217,70,239,0.07)"
            strokeWidth="1"
          />

          <path
            d="M620 0 C510 160 450 220 480 370 C510 500 400 570 200 650"
            stroke="rgba(167,139,250,0.06)"
            strokeWidth="1"
          />
        </svg>


        {/* ================================================= */}
        {/* SMALL GLOWING NODES */}
        {/* ================================================= */}

        <div className="absolute top-[18%] left-[9%]">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-violet-500/[0.08] blur-md" />
            <div className="relative w-2 h-2 rounded-full bg-violet-300/40" />
          </div>
        </div>

        <div className="absolute top-[42%] left-[16%]">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-fuchsia-500/[0.07] blur-md" />
            <div className="relative w-1.5 h-1.5 rounded-full bg-fuchsia-300/35" />
          </div>
        </div>

        <div className="absolute bottom-[20%] left-[8%]">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-purple-500/[0.08] blur-md" />
            <div className="relative w-2 h-2 rounded-full bg-purple-300/35" />
          </div>
        </div>

        <div className="absolute top-[22%] right-[9%]">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-violet-500/[0.08] blur-md" />
            <div className="relative w-2 h-2 rounded-full bg-violet-300/40" />
          </div>
        </div>

        <div className="absolute top-[46%] right-[16%]">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-fuchsia-500/[0.07] blur-md" />
            <div className="relative w-1.5 h-1.5 rounded-full bg-fuchsia-300/35" />
          </div>
        </div>


        {/* ================================================= */}
        {/* SUBTLE GRID */}
        {/* ================================================= */}

        <div
          className="absolute inset-0 opacity-[0.018]"
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

        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">

          <div>

            <p className="text-xs font-bold tracking-[0.2em] text-violet-300 uppercase">
              CUSTOMER CATEGORIES
            </p>

            <h2 className="text-3xl font-black text-white mt-2">
              Find the right service
            </h2>

            <p className="text-sm text-slate-400 mt-2">
              Browse verified service categories near you
            </p>

          </div>

        </div>


        {/* ================================================= */}
        {/* CATEGORY CARDS */}
        {/* ================================================= */}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

          {categories.map((cat, idx) => {
            const Icon = cat.icon;

            return (
              <div
                key={idx}
                className="
                  group
                  relative
                  overflow-hidden
                  p-6
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-white/[0.025]
                  backdrop-blur-sm
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
                    -top-20
                    -right-20
                    w-40
                    h-40
                    rounded-full
                    bg-violet-600/[0.06]
                    blur-3xl
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-500
                  "
                />


                {/* Icon */}

                <div
                  className="
                    relative
                    w-11
                    h-11
                    rounded-xl
                    bg-violet-500/[0.08]
                    border
                    border-violet-400/[0.10]
                    text-violet-300
                    flex
                    items-center
                    justify-center
                    group-hover:bg-violet-500/[0.15]
                    group-hover:border-violet-400/20
                    transition-all
                    duration-300
                  "
                >
                  <Icon className="w-5 h-5" />
                </div>


                {/* Text */}

                <div className="relative">

                  <h3 className="font-bold text-white text-sm mt-5">
                    {cat.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1">
                    {cat.count}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}