import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Clock,
  CheckCircle,
  DollarSign,
  ArrowUpRight,
  CalendarDays,
  Star,
  MoreHorizontal
} from 'lucide-react';

import { useBusinessDashboard } from '../../hooks/useBusinessData';

// =========================
// BLUR FADE STATE WRAPPER
// =========================
const BlurFadeWrapper = ({ children, stateKey }: { children: React.ReactNode, stateKey: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Reset state to trigger the transition whenever the key changes
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, [stateKey]);

  return (
    <div
      className={`transition-all duration-700 ease-out w-full flex-1 ${
        isVisible ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-md translate-y-4'
      }`}
    >
      {children}
    </div>
  );
};

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

  // Determine the current state string to trigger the BlurFadeWrapper correctly
  const currentState = loading ? 'loading' : error ? 'error' : 'content';

  return (
    <div className="min-h-screen bg-[#E8EDF2] flex flex-col [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full overflow-y-auto">
      <BlurFadeWrapper stateKey={currentState}>
        
        {/* ========================= */}
        {/* LOADING STATE */}
        {/* ========================= */}
        {loading && (
          <div className="flex-1 flex items-center justify-center p-8 min-h-screen">
            <p className="text-slate-500 font-medium animate-pulse">Loading dashboard...</p>
          </div>
        )}

        {/* ========================= */}
        {/* ERROR STATE */}
        {/* ========================= */}
        {!loading && error && (
          <div className="flex-1 flex items-center justify-center p-8 min-h-screen">
            <div className="bg-[#FFFFFF] rounded-[1.5rem] p-8 border border-slate-100 shadow-[0_8px_24px_rgba(149,157,165,0.1)] text-center">
              <p className="text-red-400 font-semibold">{error}</p>
              <button
                onClick={() => fetchBusinessDashboard()}
                className="mt-4 px-6 py-2.5 rounded-[1rem] bg-[#000000] text-white text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* ========================= */}
        {/* MAIN DASHBOARD CONTENT */}
        {/* ========================= */}
        {!loading && !error && (
          <div className="p-6 lg:p-10 space-y-8">
            
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-[#1E293B] text-2xl lg:text-3xl font-semibold tracking-tight">
                  Hello, {data?.business.name || 'Vendor'}
                </h1>
                <p className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase mt-2">
                  {new Date().toLocaleString('en-MY', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>

            {/* BUSINESS STATISTICS PANEL */}
            <div className="bg-[#F1F5F9] rounded-[2.5rem] p-6 lg:p-8 shadow-[inset_0_2px_10px_rgba(255,255,255,0.7)]">
              
              <h2 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-6">
                Overview Metrics
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {/* ACTIVE ORDERS */}
                <button
                  type="button"
                  onClick={() => navigate('/business/orders')}
                  className="text-left bg-[#FFFFFF] rounded-[1.5rem] p-6 border border-slate-100 shadow-[0_8px_24px_rgba(149,157,165,0.1)] hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="text-slate-400">
                      <Briefcase size={22} strokeWidth={1.5} />
                    </div>
                    <span className="text-[11px] font-semibold text-blue-500 flex items-center gap-0.5">
                      +12% <ArrowUpRight size={12} />
                    </span>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Active Orders
                    </h3>
                    <p className="text-[#1E293B] text-2xl font-semibold mt-1">
                      {data?.metrics.active_orders ?? 0}
                    </p>
                  </div>
                </button>

                {/* PENDING */}
                <button
                  type="button"
                  onClick={() => navigate('/business/orders')}
                  className="text-left bg-[#FFFFFF] rounded-[1.5rem] p-6 border border-slate-100 shadow-[0_8px_24px_rgba(149,157,165,0.1)] hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="text-slate-400">
                      <Clock size={22} strokeWidth={1.5} />
                    </div>
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      Action needed
                    </span>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Pending Orders
                    </h3>
                    <p className="text-[#1E293B] text-2xl font-semibold mt-1">
                      {data?.metrics.pending_orders ?? 0}
                    </p>
                  </div>
                </button>

                {/* COMPLETED */}
                <button
                  type="button"
                  onClick={() => navigate('/business/orders')}
                  className="text-left bg-[#FFFFFF] rounded-[1.5rem] p-6 border border-slate-100 shadow-[0_8px_24px_rgba(149,157,165,0.1)] hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="text-slate-400">
                      <CheckCircle size={22} strokeWidth={1.5} />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400">
                      This month
                    </span>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Completed
                    </h3>
                    <p className="text-[#1E293B] text-2xl font-semibold mt-1">
                      {data?.metrics.completed_orders_this_month ?? 0}
                    </p>
                  </div>
                </button>

                {/* REVENUE */}
                <button
                  type="button"
                  onClick={() => navigate('/business/orders')}
                  className="text-left bg-[#FFFFFF] rounded-[1.5rem] p-6 border border-slate-100 shadow-[0_8px_24px_rgba(149,157,165,0.1)] hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="text-slate-400">
                      <DollarSign size={22} strokeWidth={1.5} />
                    </div>
                    <span className="text-[11px] font-semibold text-blue-500 flex items-center gap-0.5">
                      +8.4% <ArrowUpRight size={12} />
                    </span>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Monthly Revenue
                    </h3>
                    <p className="text-[#1E293B] text-2xl font-semibold mt-1">
                      RM{data?.metrics.monthly_revenue?.toLocaleString() ?? '0'}
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* LOWER CONTENT SPLIT */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              
              {/* LEFT PANEL: ACTIVE ORDERS */}
              <div className="xl:col-span-3 bg-[#F1F5F9] rounded-[2.5rem] p-6 lg:p-8 shadow-[inset_0_2px_10px_rgba(255,255,255,0.7)] space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-[#1E293B]">
                    Active Orders
                  </h2>
                  <button
                    type="button"
                    onClick={() => navigate('/business/orders')}
                    className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 hover:text-[#1E293B] transition-colors"
                  >
                    View all
                  </button>
                </div>

                <div className="space-y-4">
                  {data?.active_orders && data.active_orders.length > 0 ? (
                    data.active_orders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-[#FFFFFF] rounded-[1.5rem] p-6 border border-slate-100 shadow-[0_8px_24px_rgba(149,157,165,0.1)] flex flex-col md:flex-row md:items-center md:justify-between gap-6 hover:shadow-[0_12px_28px_rgba(149,157,165,0.15)] transition-shadow"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                              #ORD-{order.id}
                            </span>
                            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                              {order.status}
                            </span>
                          </div>

                          <h3 className="text-[#1E293B] text-lg font-semibold">
                            {order.service_name}
                          </h3>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-slate-500">
                            <p>Client: {order.first_name} {order.last_name}</p>
                            <span className="hidden sm:inline text-slate-300">•</span>
                            <p>{new Date(order.scheduled_start).toLocaleString('en-MY', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => navigate(`/business/orders/${order.id}`)}
                          className="shrink-0 px-6 py-2.5 rounded-[1rem] bg-[#000000] text-white text-sm font-medium hover:bg-slate-800 transition-colors"
                        >
                          Manage
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="bg-[#FFFFFF] rounded-[1.5rem] p-8 border border-slate-100 shadow-[0_8px_24px_rgba(149,157,165,0.1)] flex justify-center items-center">
                      <p className="text-sm text-slate-500">
                        No active orders at the moment.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </BlurFadeWrapper>
    </div>
  );
} 