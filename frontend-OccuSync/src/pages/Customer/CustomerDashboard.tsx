// pages/CustomerDashboard.tsx
import {
  Clock,
  Calendar,
  CheckCircle,
  FileText,
  Bell,
  ChevronRight,
  Wrench,
  Sparkles,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDashboardData } from "../../hooks/useDashboardData";
import type { OrderResponse } from "../../types/customerType";

export default function CustomerDashboard() {
  const navigate = useNavigate();

  const {
    customer,
    unpaidInvoices,
    services,
    orders,
    notifications,
    isLoading,
    error,
  } = useDashboardData();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-5 bg-slate-900/60 p-8 rounded-2xl border border-slate-800 backdrop-blur-md shadow-2xl">
          <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
          <p className="text-slate-100 font-medium animate-pulse">
            Loading your workspace...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="bg-slate-900/60 p-8 rounded-2xl shadow-2xl text-center max-w-md border border-slate-800 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50"></div>
          <h3 className="text-slate-100 text-xl font-semibold mb-2">
            Oops! Something went wrong.
          </h3>
          <p className="text-slate-400 text-sm mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-slate-800 text-slate-100 border border-slate-700 rounded-xl text-sm font-medium hover:bg-slate-700 hover:border-slate-600 transition-all duration-200 w-full"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const activeOrders = orders.filter(
    (o) => o.status !== "COMPLETED" && o.status !== "CANCELLED",
  );
  const completedOrders = orders.filter((o) => o.status === "COMPLETED");
  const unreadNotifications = notifications.filter((n) => !n.is_read).length;
  const suggestedServices = services.slice(0, 4);

  // Helper to get status indicators
  const getStatusIndicator = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]";
      case "CONFIRMED":
        return "bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.6)]";
      case "COMPLETED":
        return "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]";
      default:
        return "bg-slate-600";
    }
  };

  // Group active orders by date for the calendar view
  const groupedOrders = activeOrders.reduce((acc: Record<string, OrderResponse[]>, order) => {
    const dateKey = order.service_date ? new Date(order.service_date).toISOString().split('T')[0] : 'TBD';
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(order);
    return acc;
  }, {});

  // Sort dates chronologically
  const sortedDates = Object.keys(groupedOrders).sort((a, b) => {
    if (a === 'TBD') return 1;
    if (b === 'TBD') return -1;
    return new Date(a).getTime() - new Date(b).getTime();
  });

  return (
    <div className="flex h-screen bg-slate-950 font-sans text-slate-100 selection:bg-indigo-500/30 relative overflow-hidden">
      <div className="fixed top-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-[35rem] h-[35rem] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="flex-1 h-full overflow-y-auto relative z-10">
        <div className="flex-1 p-6 md:p-10 lg:pl-12 max-w-7xl mx-auto z-10">
          
          {/* Header Section */}
          <div className="mb-10 relative overflow-hidden bg-slate-900/60 rounded-2xl p-8 shadow-2xl border border-slate-800 backdrop-blur-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800/50 rounded-lg text-indigo-300 text-xs font-semibold tracking-wide uppercase mb-4 border border-slate-700/50">
                <Sparkles size={14} className="text-indigo-400" />
                Welcome to OccuSync
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-2 tracking-tight text-slate-100">
                Hello, {customer?.name || "Guest"} 👋
              </h1>
              <p className="text-slate-400 text-sm font-medium">
                {new Date().toLocaleDateString("en-MY", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <button
              onClick={() => navigate("/customer/services")}
              className="relative z-10 bg-indigo-600 border border-indigo-500 text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 group"
            >
              <Zap size={18} className="text-indigo-200 group-hover:text-white transition-colors" />
              Request New Service
            </button>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { label: "Active Jobs", value: activeOrders.length, icon: Clock, color: "text-blue-400", bg: "bg-blue-500/10" },
              { label: "Unpaid Invoices", value: unpaidInvoices.length, icon: FileText, color: "text-rose-400", bg: "bg-rose-500/10" },
              { label: "Completed Jobs", value: completedOrders.length, icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/10" },
              { label: "Unread Alerts", value: unreadNotifications, icon: Bell, color: "text-amber-400", bg: "bg-amber-500/10", alert: unreadNotifications > 0 },
            ].map((metric, idx) => (
              <div key={idx} className="bg-slate-900/60 p-6 rounded-2xl shadow-lg border border-slate-800 backdrop-blur-md hover:bg-slate-800/60 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between group">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${metric.bg} border border-slate-700/50`}>
                    <metric.icon size={22} strokeWidth={2} className={metric.color} />
                  </div>
                  {metric.alert && (
                    <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">{metric.label}</p>
                  <h3 className="text-3xl font-semibold text-slate-100 tracking-tight">{metric.value}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN: Calendar Activity Feed */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center px-1">
                <h3 className="text-xl font-semibold text-slate-100 tracking-tight">
                  Upcoming Schedule
                </h3>
                <button
                  onClick={() => navigate("/customer/orders")}
                  className="text-sm font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1 group transition-colors"
                >
                  View All History
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {sortedDates.length === 0 ? (
                <div className="bg-slate-900/60 backdrop-blur-md p-12 rounded-2xl shadow-lg border border-slate-800 flex flex-col items-center justify-center text-center h-[320px]">
                  <div className="w-16 h-16 bg-slate-800 rounded-2xl border border-slate-700 flex items-center justify-center mb-6">
                    <Calendar size={32} className="text-slate-500" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-200 mb-2">No upcoming jobs</h4>
                  <p className="text-slate-400 text-sm max-w-sm mb-8">Your calendar is clear. Book a service to see it scheduled here.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {sortedDates.map((dateString) => {
                    const dateObj = dateString !== 'TBD' ? new Date(dateString) : null;
                    const day = dateObj ? dateObj.getDate() : '-';
                    const month = dateObj ? dateObj.toLocaleString('default', { month: 'short' }).toUpperCase() : 'TBD';

                    return (
                      <div key={dateString} className="flex gap-4 sm:gap-6 relative group">
                        {/* Date Block */}
                        <div className="flex flex-col items-center min-w-[60px] pt-1">
                          <span className="text-xs font-semibold text-indigo-400 tracking-widest">{month}</span>
                          <span className="text-2xl font-bold text-slate-200">{day}</span>
                        </div>

                        {/* Event List */}
                        <div className="flex-1 space-y-3 border-l-2 border-slate-800/80 pl-6 py-1 relative before:absolute before:left-[-5px] before:top-4 before:w-2 before:h-2 before:bg-slate-700 before:rounded-full">
                          {groupedOrders[dateString].map((order) => (
                            <div 
                              key={order.id} 
                              onClick={() => navigate(`/customer/orders/${order.id}`)}
                              className="bg-slate-900/40 backdrop-blur-sm p-4 rounded-xl border border-slate-800/60 hover:bg-slate-800/60 hover:border-slate-700 transition-all duration-200 cursor-pointer flex items-center justify-between gap-4"
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-2 h-2 rounded-full ${getStatusIndicator(order.status)}`}></div>
                                <div>
                                  <h4 className="text-sm font-medium text-slate-200">{order.service_name || "Service Request"}</h4>
                                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                                    <Clock size={12} />
                                    <span>{order.time_slot || "Time pending"}</span>
                                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 ml-2">
                                      {order.business_name}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <ChevronRight size={16} className="text-slate-600" />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Service Discovery Widget */}
            <div className="lg:col-span-1">
              <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl shadow-lg border border-slate-800 overflow-hidden sticky top-6">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-100 mb-5 flex items-center gap-2">
                    <Zap size={18} className="text-emerald-400" />
                    Suggested for you
                  </h3>

                  {suggestedServices.length === 0 ? (
                    <div className="text-center py-10 bg-slate-950/50 rounded-xl border border-slate-800/50">
                      <p className="text-slate-400 text-sm">More services coming soon.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {suggestedServices.map((service) => (
                        <div key={service.id} className="group cursor-pointer p-4 rounded-xl bg-slate-950/30 border border-slate-800/50 hover:bg-slate-800/50 hover:border-slate-700 transition-all duration-200">
                          <div className="flex justify-between items-start mb-1.5 gap-2">
                            <h4 className="text-sm font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors leading-snug">
                              {service.name}
                            </h4>
                            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-md whitespace-nowrap">
                              RM {Number(service.base_price).toFixed(0)}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 font-medium truncate">
                            By {service.business_name}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => navigate("/customer/services")}
                    className="w-full mt-6 bg-slate-800 border border-slate-700 text-slate-200 py-3 rounded-xl text-sm font-medium hover:bg-slate-700 hover:text-white transition-all duration-200 flex items-center justify-center gap-2 group"
                  >
                    Explore Directory
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform text-slate-400 group-hover:text-white" />
                  </button>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}