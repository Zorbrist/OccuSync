import {
  Briefcase,
  Clock,
  CheckCircle,
  DollarSign,
  ArrowUpRight,
  CalendarDays,
  Star,
} from 'lucide-react';

export default function BusinessPage() {
  return (
    <div className="p-8 space-y-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-rose-950">
            Hello, CoolPro Vendor
          </h1>

          <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase mt-1">
            Monday, 8 September 2026 · 1:35 PM
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays size={17} />
          Today
        </div>

      </div>


      {/* ========================= */}
      {/* BUSINESS STATISTICS */}
      {/* ========================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {/* ACTIVE ORDERS */}
        <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-xl shadow-rose-950/5">

          <div className="flex items-center justify-between">

            <div className="h-11 w-11 rounded-2xl bg-rose-100 text-rose-950 flex items-center justify-center">
              <Briefcase size={21} />
            </div>

            <span className="text-xs font-bold text-green-600 flex items-center gap-1">
              +12%
              <ArrowUpRight size={14} />
            </span>

          </div>

          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-5">
            Active Orders
          </p>

          <h2 className="text-3xl font-black text-rose-950 mt-1">
            12
          </h2>

        </div>


        {/* PENDING */}
        <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-xl shadow-rose-950/5">

          <div className="flex items-center justify-between">

            <div className="h-11 w-11 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Clock size={21} />
            </div>

            <span className="text-xs font-bold text-amber-600">
              Action needed
            </span>

          </div>

          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-5">
            Pending Orders
          </p>

          <h2 className="text-3xl font-black text-rose-950 mt-1">
            4
          </h2>

        </div>


        {/* COMPLETED */}
        <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-xl shadow-rose-950/5">

          <div className="flex items-center justify-between">

            <div className="h-11 w-11 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">
              <CheckCircle size={21} />
            </div>

            <span className="text-xs font-bold text-green-600">
              This month
            </span>

          </div>

          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-5">
            Completed
          </p>

          <h2 className="text-3xl font-black text-rose-950 mt-1">
            38
          </h2>

        </div>


        {/* REVENUE */}
        <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-xl shadow-rose-950/5">

          <div className="flex items-center justify-between">

            <div className="h-11 w-11 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <DollarSign size={21} />
            </div>

            <span className="text-xs font-bold text-green-600 flex items-center gap-1">
              +8.4%
              <ArrowUpRight size={14} />
            </span>

          </div>

          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-5">
            Monthly Revenue
          </p>

          <h2 className="text-3xl font-black text-rose-950 mt-1">
            RM8,420
          </h2>

        </div>

      </div>


      {/* ========================= */}
      {/* MAIN DASHBOARD CONTENT */}
      {/* ========================= */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">


        {/* ACTIVE ORDERS */}
        <div className="xl:col-span-2 space-y-4">

          <div className="flex items-center justify-between">

            <h2 className="text-lg font-bold text-slate-900">
              Active Orders
            </h2>

            <button className="text-xs font-bold text-rose-950 hover:underline">
              View all →
            </button>

          </div>


          {/* ORDER 1 */}
          <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-xl shadow-rose-950/5">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

              <div>

                <div className="flex items-center gap-3">

                  <span className="text-xs font-black text-rose-950">
                    #ORD-9021
                  </span>

                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">
                    Pending Acceptance
                  </span>

                </div>

                <h3 className="text-lg font-bold text-slate-900 mt-3">
                  Aircond Repair
                </h3>

                <p className="text-sm text-slate-400 mt-1">
                  Customer: Natas
                </p>

              </div>

              <button className="px-4 py-2.5 rounded-xl bg-rose-950 text-white text-xs font-bold hover:bg-rose-900">
                Manage Order
              </button>

            </div>

          </div>


          {/* ORDER 2 */}
          <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-xl shadow-rose-950/5">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

              <div>

                <div className="flex items-center gap-3">

                  <span className="text-xs font-black text-rose-950">
                    #ORD-8900
                  </span>

                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                    Scheduled
                  </span>

                </div>

                <h3 className="text-lg font-bold text-slate-900 mt-3">
                  Chemical Cleaning
                </h3>

                <p className="text-sm text-slate-400 mt-1">
                  Customer: Sarah
                </p>

              </div>

              <button className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200">
                View Order
              </button>

            </div>

          </div>


          {/* ORDER 3 */}
          <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-xl shadow-rose-950/5">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

              <div>

                <div className="flex items-center gap-3">

                  <span className="text-xs font-black text-rose-950">
                    #ORD-8872
                  </span>

                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                    Completed
                  </span>

                </div>

                <h3 className="text-lg font-bold text-slate-900 mt-3">
                  Aircond Installation
                </h3>

                <p className="text-sm text-slate-400 mt-1">
                  Customer: Daniel
                </p>

              </div>

              <span className="text-sm font-bold text-slate-500">
                RM450.00
              </span>

            </div>

          </div>

        </div>


        {/* RIGHT SIDE */}
        <div className="space-y-6">


          {/* INCOMING INQUIRIES */}
          <div>

            <div className="flex items-center justify-between mb-4">

              <h2 className="text-lg font-bold text-slate-900">
                Incoming Inquiries
              </h2>

              <span className="h-6 min-w-6 px-2 rounded-full bg-rose-950 text-white text-xs font-bold flex items-center justify-center">
                2
              </span>

            </div>


            <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-xl shadow-rose-950/5">

              <div className="flex items-center justify-between">

                <h3 className="font-bold text-sm">
                  Natas
                </h3>

                <span className="text-xs text-slate-400">
                  2h ago
                </span>

              </div>

              <p className="text-sm italic text-slate-600 mt-3">
                "Can you arrange a technician tomorrow for aircond repair?"
              </p>

              <button className="w-full mt-4 py-2.5 rounded-xl bg-rose-950 text-white text-xs font-bold hover:bg-rose-900">
                Send Quotation
              </button>

            </div>

          </div>


          {/* BUSINESS RATING */}
          <div className="bg-gradient-to-br from-rose-950 to-red-900 rounded-3xl p-6 text-white">

            <div className="flex items-center gap-2">

              <Star
                size={20}
                className="fill-current"
              />

              <span className="text-sm font-bold">
                Business Rating
              </span>

            </div>

            <div className="flex items-end gap-2 mt-4">

              <span className="text-4xl font-black">
                4.9
              </span>

              <span className="text-rose-200 text-sm mb-1">
                / 5.0
              </span>

            </div>

            <p className="text-xs text-rose-200 mt-2">
              Based on 126 customer reviews
            </p>

          </div>


          {/* ALERTS */}
          <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-xl shadow-rose-950/5">

            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Business Alerts
            </h3>

            <div className="space-y-4">

              <div className="flex items-start gap-3">

                <span className="text-lg">
                  💳
                </span>

                <div>
                  <p className="text-sm font-semibold">
                    Payout Processed
                  </p>

                  <p className="text-xs text-slate-400">
                    RM1,250.00 · Today
                  </p>
                </div>

              </div>

              <div className="flex items-start gap-3">

                <span className="text-lg">
                  ⭐
                </span>

                <div>
                  <p className="text-sm font-semibold">
                    New Review
                  </p>

                  <p className="text-xs text-slate-400">
                    5 Stars · Yesterday
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}