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
import CustomerSidebar from "../../components/CustomerSidebar";
import { useDashboardData } from "../../hooks/useDashboardData";

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "CONFIRMED":
        return "bg-sky-500/10 text-sky-400 border-sky-500/20";
      case "ASSIGNED":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
      case "IN_PROGRESS":
        return "bg-violet-500/10 text-violet-400 border-violet-500/20";
      case "COMPLETED":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      default:
        return "bg-slate-800 text-slate-300 border-slate-700";
    }
  };

  return (
   <div className="flex h-screen bg-slate-950 font-sans text-slate-100 selection:bg-indigo-500/30 relative overflow-hidden">
      {/* Subtle Ambient Glows for Depth */}
      <div className="fixed top-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-[35rem] h-[35rem] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <CustomerSidebar />

      {/* 1. Add this new scrolling container */}
<div className="flex-1 h-full overflow-y-auto relative z-10">

      <div className="flex-1 p-6 md:p-10 lg:pl-12 max-w-7xl mx-auto z-10">
        
        {/* Header Section */}
        <div className="mb-10 relative overflow-hidden bg-slate-900/60 rounded-2xl p-8 shadow-2xl border border-slate-800 backdrop-blur-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800/50 rounded-lg text-indigo-300 text-xs font-semibold tracking-wide uppercase mb-4 border border-slate-700/50">
              <Sparkles size={14} className="text-indigo-400" />
              Welcome to Occusync
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
            onClick={() => navigate("/customerServices")}
            className="relative z-10 bg-indigo-600 border border-indigo-500 text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 group"
          >
            <Zap
              size={18}
              className="text-indigo-200 group-hover:text-white transition-colors"
            />
            Request New Service
          </button>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              label: "Active Jobs",
              value: activeOrders.length,
              icon: Clock,
              iconColor: "text-blue-400",
              bgAccent: "bg-blue-500/10",
            },
            {
              label: "Unpaid Invoices",
              value: unpaidInvoices.length,
              icon: FileText,
              iconColor: "text-rose-400",
              bgAccent: "bg-rose-500/10",
            },
            {
              label: "Completed Jobs",
              value: completedOrders.length,
              icon: CheckCircle,
              iconColor: "text-emerald-400",
              bgAccent: "bg-emerald-500/10",
            },
            {
              label: "Unread Alerts",
              value: unreadNotifications,
              icon: Bell,
              iconColor: "text-amber-400",
              bgAccent: "bg-amber-500/10",
              hasAlert: unreadNotifications > 0,
            },
          ].map((metric, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 p-6 rounded-2xl shadow-lg border border-slate-800 backdrop-blur-md hover:bg-slate-800/60 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${metric.bgAccent} border border-slate-700/50`}>
                  <metric.icon size={22} strokeWidth={2} className={metric.iconColor} />
                </div>
                {metric.hasAlert && (
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                  </div>
                )}
              </div>
              
              <div>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                  {metric.label}
                </p>
                <h3 className="text-3xl font-semibold text-slate-100 tracking-tight">
                  {metric.value}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Activity Feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center px-1">
              <h3 className="text-xl font-semibold text-slate-100 tracking-tight">
                Activity Feed
              </h3>
              <button
                onClick={() => navigate("/customerOrders")}
                className="text-sm font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1 group transition-colors"
              >
                View All History
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {orders.length === 0 ? (
              <div className="bg-slate-900/60 backdrop-blur-md p-12 rounded-2xl shadow-lg border border-slate-800 flex flex-col items-center justify-center text-center h-[320px]">
                <div className="w-16 h-16 bg-slate-800 rounded-2xl border border-slate-700 flex items-center justify-center mb-6">
                  <Wrench size={32} className="text-slate-500" />
                </div>
                <h4 className="text-lg font-semibold text-slate-200 mb-2">
                  No active requests
                </h4>
                <p className="text-slate-400 text-sm max-w-sm mb-8">
                  Your workspace is clear. Let's get things moving by booking your first service.
                </p>
                <button
                  onClick={() => navigate("/services")}
                  className="px-6 py-2.5 bg-slate-100 text-slate-900 rounded-xl text-sm font-semibold hover:bg-white hover:shadow-lg hover:shadow-white/10 transition-all duration-200"
                >
                  Browse Services
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.slice(0, 4).map((order) => (
                  <div
                    key={order.id}
                    className="bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/40 transition-all duration-200 group"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 font-semibold shadow-inner">
                          {order.business_name?.charAt(0) || "S"}
                        </div>
                        <div>
                          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest block mb-0.5">
                            Order #{order.id}
                          </span>
                          <h4 className="text-base font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors">
                            {order.business_name || "Service Provider"}
                          </h4>
                        </div>
                      </div>
                      <span
                        className={`text-[11px] font-semibold px-3 py-1.5 rounded-lg border ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status.replace("_", " ")}
                      </span>
                    </div>

                    {order.notes && (
                      <p className="text-slate-400 text-sm mb-5 bg-slate-950/50 p-4 rounded-xl border border-slate-800/50 line-clamp-2">
                        "{order.notes}"
                      </p>
                    )}

                    <div className="flex flex-wrap gap-6 pt-4 border-t border-slate-800/50">
                      <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
                        <Calendar size={15} className="text-indigo-400" />
                        <span>
                          {new Date(order.scheduled_start).toLocaleString(
                            "en-MY",
                            { dateStyle: "medium", timeStyle: "short" },
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
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
                    <p className="text-slate-400 text-sm">
                      More services coming soon.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {suggestedServices.map((service) => (
                      <div
                        key={service.id}
                        className="group cursor-pointer p-4 rounded-xl bg-slate-950/30 border border-slate-800/50 hover:bg-slate-800/50 hover:border-slate-700 transition-all duration-200"
                      >
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
                  onClick={() => navigate("/customerServices")}
                  className="w-full mt-6 bg-slate-800 border border-slate-700 text-slate-200 py-3 rounded-xl text-sm font-medium hover:bg-slate-700 hover:text-white transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  Explore Directory
                  <ChevronRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform text-slate-400 group-hover:text-white"
                  />
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