import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Clock,
  CheckCircle,
  DollarSign,
  ArrowUpRight,
  CalendarDays,
  Star,
} from 'lucide-react';

import { useBusinessDashboard } from '../../hooks/useBusinessData';

export default function BusinessPage() {
  const navigate = useNavigate();

  const {
    data,
    loading,
    error,
    fetchBusinessDashboard,
  } = useBusinessDashboard();

  useEffect(() => {
    fetchBusinessDashboard();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="p-8">
        <p className="text-slate-500">Loading dashboard...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-8">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-rose-950">
            Hello, {data?.business.name || 'Vendor'}
          </h1>

          <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase mt-1">
            {new Date().toLocaleString('en-MY', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })}
          </p>
        </div>

        <button
          type="button"
          onClick={() => fetchBusinessDashboard()}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-rose-950 transition"
          title="Refresh dashboard"
        >
          <CalendarDays size={17} />
          Today
        </button>

      </div>


      {/* ========================= */}
      {/* BUSINESS STATISTICS */}
      {/* ========================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {/* ACTIVE ORDERS */}
        <button
          type="button"
          onClick={() => navigate('/business/orders')}
          className="text-left bg-white rounded-3xl p-6 border border-rose-100 shadow-xl shadow-rose-950/5 hover:border-rose-300 hover:shadow-2xl transition"
        >
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
            {data?.metrics.active_orders ?? 0}
          </h2>

        </button>


        {/* PENDING */}
        <button
          type="button"
          onClick={() => navigate('/business/orders')}
          className="text-left bg-white rounded-3xl p-6 border border-rose-100 shadow-xl shadow-rose-950/5 hover:border-amber-300 hover:shadow-2xl transition"
        >
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
            {data?.metrics.pending_orders ?? 0}
          </h2>

        </button>


        {/* COMPLETED */}
        <button
          type="button"
          onClick={() => navigate('/business/orders')}
          className="text-left bg-white rounded-3xl p-6 border border-rose-100 shadow-xl shadow-rose-950/5 hover:border-green-300 hover:shadow-2xl transition"
        >
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
            {data?.metrics.completed_orders_this_month ?? 0}
          </h2>

        </button>


        {/* REVENUE */}
        <button
          type="button"
          onClick={() => navigate('/business/orders')}
          className="text-left bg-white rounded-3xl p-6 border border-rose-100 shadow-xl shadow-rose-950/5 hover:border-blue-300 hover:shadow-2xl transition"
        >
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
            RM{data?.metrics.monthly_revenue?.toLocaleString() ?? '0'}
          </h2>

        </button>

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

            <button
              type="button"
              onClick={() => navigate('/business/orders')}
              className="text-xs font-bold text-rose-950 hover:underline"
            >
              View all →
            </button>

          </div>


          {/* ACTIVE ORDER LIST */}
          {data?.active_orders && data.active_orders.length > 0 ? (
            data.active_orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl p-6 border border-rose-100 shadow-xl shadow-rose-950/5"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                  <div>

                    <div className="flex items-center gap-3">

                      <span className="text-xs font-black text-rose-950">
                        #ORD-{order.id}
                      </span>

                      <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">
                        {order.status}
                      </span>

                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mt-3">
                      {order.service_name}
                    </h3>

                    <p className="text-sm text-slate-400 mt-1">
                      Customer: {order.first_name} {order.last_name}
                    </p>

                    <p className="text-xs text-slate-400 mt-2">
                      {new Date(order.scheduled_start).toLocaleString()}
                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={() => navigate(`/business/orders/${order.id}`)}
                    className="px-4 py-2.5 rounded-xl bg-rose-950 text-white text-xs font-bold hover:bg-rose-900 transition"
                  >
                    Manage Order
                  </button>

                </div>

              </div>
            ))
          ) : (
            <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-xl shadow-rose-950/5">
              <p className="text-sm text-slate-400">
                No active orders at the moment.
              </p>
            </div>
          )}

        </div>


        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* INCOMING INQUIRIES */}
          <div>

            <div className="flex items-center justify-between mb-4">

              <button
                type="button"
                onClick={() => navigate('/business/orders')}
                className="text-lg font-bold text-slate-900 hover:text-rose-950 transition"
              >
                Incoming Inquiries
              </button>

              <button
                type="button"
                onClick={() => navigate('/business/orders')}
                className="h-6 min-w-6 px-2 rounded-full bg-rose-950 text-white text-xs font-bold flex items-center justify-center hover:bg-rose-900 transition"
              >
                2
              </button>

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

              <button
                type="button"
                onClick={() => navigate('/business/orders')}
                className="w-full mt-4 py-2.5 rounded-xl bg-rose-950 text-white text-xs font-bold hover:bg-rose-900 transition"
              >
                Send Quotation
              </button>

            </div>

          </div>


          {/* BUSINESS RATING */}
          <button
            type="button"
            onClick={() => navigate('/business/orders')}
            className="w-full text-left bg-gradient-to-br from-rose-950 to-red-900 rounded-3xl p-6 text-white hover:shadow-xl transition"
          >

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

          </button>


          {/* ALERTS */}
          <button
            type="button"
            onClick={() => navigate('/business/notifications')}
            className="w-full text-left bg-white rounded-3xl p-6 border border-rose-100 shadow-xl shadow-rose-950/5 hover:border-rose-300 hover:shadow-2xl transition"
          >

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

          </button>

        </div>

      </div>

    </div>
  );
}