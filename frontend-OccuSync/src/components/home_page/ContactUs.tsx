import { useState } from "react";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import SelectProfileModal from "../authentication/SelectProfileModal";

export default function ContactUs() {
  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24"
    >
      {/* ===================================================== */}
      {/* BACKGROUND */}
      {/* ===================================================== */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* Atmospheric glows */}

        <div className="absolute top-[-220px] left-[-200px] w-[650px] h-[650px] rounded-full bg-violet-700/[0.08] blur-[170px]" />

        <div className="absolute top-[15%] right-[-250px] w-[650px] h-[650px] rounded-full bg-fuchsia-900/[0.08] blur-[180px]" />

        <div className="absolute bottom-[-250px] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-purple-900/[0.08] blur-[180px]" />

        {/* Center glow */}

        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-violet-600/[0.035] blur-[130px]" />

        {/* ================================================= */}
        {/* RADIAL RINGS */}
        {/* ================================================= */}

        <div className="absolute top-[-350px] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full border border-violet-400/[0.03]" />

        <div className="absolute top-[-280px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full border border-purple-300/[0.025]" />

        <div className="absolute top-[-210px] left-1/2 -translate-x-1/2 w-[620px] h-[620px] rounded-full border border-fuchsia-300/[0.02]" />

        {/* ================================================= */}
        {/* LEFT CURVED NETWORK */}
        {/* ================================================= */}

        <svg
          className="absolute left-[-280px] top-[0%] w-[700px] h-[750px] opacity-40"
          viewBox="0 0 700 700"
          fill="none"
        >
          <path
            d="M0 170 C180 40 350 100 430 250 C500 380 420 520 680 630"
            stroke="rgba(139,92,246,0.09)"
            strokeWidth="1"
          />

          <path
            d="M0 310 C150 190 280 200 360 320 C440 440 360 560 630 700"
            stroke="rgba(217,70,239,0.06)"
            strokeWidth="1"
          />
        </svg>

        {/* ================================================= */}
        {/* RIGHT CURVED NETWORK */}
        {/* ================================================= */}

        <svg
          className="absolute right-[-280px] top-[0%] w-[700px] h-[750px] opacity-40"
          viewBox="0 0 700 700"
          fill="none"
        >
          <path
            d="M700 170 C520 40 350 100 270 250 C200 380 280 520 20 630"
            stroke="rgba(139,92,246,0.09)"
            strokeWidth="1"
          />

          <path
            d="M700 310 C550 190 420 200 340 320 C260 440 340 560 70 700"
            stroke="rgba(217,70,239,0.06)"
            strokeWidth="1"
          />
        </svg>

        {/* ================================================= */}
        {/* GLOWING NODES */}
        {/* ================================================= */}

        <div className="absolute top-[25%] left-[9%]">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-violet-500/[0.07] blur-md" />
            <div className="relative w-2 h-2 rounded-full bg-violet-300/35" />
          </div>
        </div>

        <div className="absolute top-[55%] left-[15%]">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-fuchsia-500/[0.06] blur-md" />
            <div className="relative w-1.5 h-1.5 rounded-full bg-fuchsia-300/30" />
          </div>
        </div>

        <div className="absolute top-[28%] right-[9%]">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-violet-500/[0.07] blur-md" />
            <div className="relative w-2 h-2 rounded-full bg-violet-300/35" />
          </div>
        </div>

        <div className="absolute top-[58%] right-[15%]">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-fuchsia-500/[0.06] blur-md" />
            <div className="relative w-1.5 h-1.5 rounded-full bg-fuchsia-300/30" />
          </div>
        </div>

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

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="text-center max-w-3xl mx-auto mb-12">

          <p className="text-xs font-bold tracking-[0.2em] text-violet-300 uppercase">
            CONNECT WITH US
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mt-3 leading-tight">
            Let's transform your
            <span className="block bg-gradient-to-r from-violet-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent">
              business together.
            </span>
          </h2>

          <p className="text-sm md:text-base text-slate-400 mt-4 max-w-xl mx-auto leading-relaxed">
            Have questions about OccuSync or need help getting started?
            Our team is here to help you get the most out of your service
            operations.
          </p>

        </div>

        {/* ================================================= */}
        {/* CONTACT CARDS */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* ================================================= */}
          {/* EMAIL */}
          {/* ================================================= */}

          <a
            href="mailto:support@occusync.com"
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-white/[0.08]
              bg-white/[0.025]
              backdrop-blur-sm
              p-7
              hover:bg-white/[0.045]
              hover:border-violet-400/20
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >

            <div
              className="
                absolute
                -top-20
                -right-20
                w-40
                h-40
                rounded-full
                bg-violet-600/[0.08]
                blur-3xl
                opacity-0
                group-hover:opacity-100
                transition-opacity
                duration-500
              "
            />

            <div className="relative">

              <div className="flex items-center justify-between">

                <div className="w-12 h-12 rounded-xl bg-violet-500/[0.10] border border-violet-400/[0.10] text-violet-300 flex items-center justify-center group-hover:bg-violet-500/[0.16] transition-colors">
                  <Mail className="w-6 h-6" />
                </div>

                <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-violet-300 transition-colors" />

              </div>

              <h3 className="font-bold text-white text-base mt-6">
                Email Support
              </h3>

              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                General enquiries and technical help
              </p>

              <p className="text-sm font-semibold text-violet-300 mt-5">
                support@occusync.com
              </p>

            </div>

          </a>

          {/* ================================================= */}
          {/* PHONE */}
          {/* ================================================= */}

          <a
            href="tel:+18005550199"
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-white/[0.08]
              bg-white/[0.025]
              backdrop-blur-sm
              p-7
              hover:bg-white/[0.045]
              hover:border-fuchsia-400/20
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >

            <div
              className="
                absolute
                -top-20
                -right-20
                w-40
                h-40
                rounded-full
                bg-fuchsia-600/[0.08]
                blur-3xl
                opacity-0
                group-hover:opacity-100
                transition-opacity
                duration-500
              "
            />

            <div className="relative">

              <div className="flex items-center justify-between">

                <div className="w-12 h-12 rounded-xl bg-fuchsia-500/[0.10] border border-fuchsia-400/[0.10] text-fuchsia-300 flex items-center justify-center group-hover:bg-fuchsia-500/[0.16] transition-colors">
                  <Phone className="w-6 h-6" />
                </div>

                <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-fuchsia-300 transition-colors" />

              </div>

              <h3 className="font-bold text-white text-base mt-6">
                Hotline
              </h3>

              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Mon-Fri from 8am to 6pm
              </p>

              <p className="text-sm font-semibold text-fuchsia-300 mt-5">
                +1 (800) 555-0199
              </p>

            </div>

          </a>

          {/* ================================================= */}
          {/* LOCATION */}
          {/* ================================================= */}

          <div
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-white/[0.08]
              bg-white/[0.025]
              backdrop-blur-sm
              p-7
              hover:bg-white/[0.045]
              hover:border-pink-400/20
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >

            <div
              className="
                absolute
                -top-20
                -right-20
                w-40
                h-40
                rounded-full
                bg-pink-600/[0.08]
                blur-3xl
                opacity-0
                group-hover:opacity-100
                transition-opacity
                duration-500
              "
            />

            <div className="relative">

              <div className="flex items-center justify-between">

                <div className="w-12 h-12 rounded-xl bg-pink-500/[0.10] border border-pink-400/[0.10] text-pink-300 flex items-center justify-center group-hover:bg-pink-500/[0.16] transition-colors">
                  <MapPin className="w-6 h-6" />
                </div>

                <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-pink-300 transition-colors" />

              </div>

              <h3 className="font-bold text-white text-base mt-6">
                Head Office
              </h3>

              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                OccuSync HQ Technology Park
              </p>

              <p className="text-sm font-semibold text-pink-300 mt-5">
                San Francisco, CA
              </p>

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* BOTTOM CTA */}
        {/* ================================================= */}

        <div className="mt-10 text-center">

          <p className="text-xs text-slate-500">
            Ready to simplify your service operations?
          </p>

          <button
            type="button"
            onClick={() => setShowProfileModal(true)}
            className="
              mt-3
              inline-flex
              items-center
              gap-2
              text-sm
              font-bold
              text-white
              px-5
              py-2.5
              rounded-xl
              bg-gradient-to-r
              from-violet-600
              to-fuchsia-600
              shadow-lg
              shadow-purple-900/20
              hover:-translate-y-0.5
              hover:shadow-purple-900/30
              transition-all
            "
          >
            Get Started
            <ArrowUpRight className="w-4 h-4" />
          </button>

        </div>

      </div>

      {/* ===================================================== */}
      {/* SELECT PROFILE MODAL */}
      {/* ===================================================== */}

      <SelectProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />

    </section>
  );
}