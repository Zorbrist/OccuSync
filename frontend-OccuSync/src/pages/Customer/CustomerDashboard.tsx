// pages/CustomerDashboard.tsx
import {
  Clock,
  Calendar,
  CheckCircle,
  Plus,
  ArrowRight,
  MoreHorizontal,
  ClipboardList
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDashboardData } from "../../hooks/useDashboardData";
import type { OrderResponse } from "../../types/customerType";

import { ShimmerButton } from "../../ui/shimmer-button";
import { NumberTicker } from "../../ui/number-ticker";
import { BlurFade } from "../../ui/blur-fade";

export default function CustomerDashboard() {
  const navigate = useNavigate();

  const {
    customer,
    unpaidInvoices,
    services,
    orders,
    isLoading,
    error,
  } = useDashboardData();

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#E8EDF2]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-6 h-6 border-[3px] border-slate-300 border-t-black rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#E8EDF2]">
        <div className="bg-white p-8 rounded-[2rem] shadow-xl text-center max-w-sm">
          <h3 className="text-[#1E293B] text-lg font-semibold mb-2">Connection Error</h3>
          <p className="text-slate-500 text-sm mb-6">{error}</p>
          <button onClick={() => window.location.reload()} className="px-6 py-2.5 bg-black text-white rounded-full text-sm font-medium w-full hover:bg-slate-800 transition-colors">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const activeOrders = orders.filter((o) => o.status !== "COMPLETED" && o.status !== "CANCELLED");
  const completedOrders = orders.filter((o) => o.status === "COMPLETED");
  const suggestedServices = services.slice(0, 4);

  const pendingOrders = activeOrders.filter(o => o.status === "PENDING");
  const confirmedOrders = activeOrders.filter(o => o.status === "CONFIRMED");

  // Get current date formatted simply
  const currentDate = new Date().toLocaleDateString('en-MY', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  // Ultra-minimalist scrollbar matching the theme
  const scrollbarClasses = "[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300";

  return (
    <div className="min-h-full font-sans text-slate-800 selection:bg-slate-200 relative pb-12 bg-[#E8EDF2]">
      
      <div className="relative z-10 max-w-[1450px] mx-auto px-6 lg:px-10 space-y-6 pt-2">
        
        {/* Header Title & Date */}
        <BlurFade delay={0.1}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                <span className="text-2xl">👋</span>
              </div>
              <div>
                <h2 className="text-[28px] font-semibold tracking-tight text-[#1E293B] leading-tight">
                  Welcome back, {customer?.name?.split(" ")[0] || "User"}
                </h2>
                <p className="text-sm font-medium text-slate-500">{currentDate}</p>
              </div>
            </div>
            
            <ShimmerButton
              onClick={() => navigate("/customer/services")}
              shimmerColor="#ffffff"
              shimmerSize="0.05em"
              background="#000000"
              className="px-6 py-2.5 rounded-full shadow-md"
            >
              <span className="flex items-center gap-2 text-sm font-medium text-white whitespace-nowrap">
                <Plus size={16} /> Request New Service
              </span>
            </ShimmerButton>
          </div>
        </BlurFade>

        {/* TOP SECTION: My Active Jobs */}
        <BlurFade delay={0.2}>
          <div className="bg-[#F1F5F9] rounded-[2.5rem] p-8 shadow-[inset_0_2px_10px_rgba(255,255,255,0.7)] border border-white/50">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-semibold text-[#1E293B]">My Active Jobs</h3>
              <button 
                onClick={() => navigate("/customer/orders")}
                className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-400 hover:text-black transition-colors"
                title="View All Orders"
              >
                <MoreHorizontal size={16} />
              </button>
            </div>

            {activeOrders.length === 0 ? (
               <div className="py-16 flex flex-col items-center justify-center bg-white/50 rounded-[2rem] border border-white/60 shadow-sm">
                  <ClipboardList size={32} className="text-slate-300 mb-4" />
                  <p className="text-slate-500 font-medium text-center">You have no active jobs right now.<br/>Click 'Request New Service' to get started.</p>
               </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative px-2">
                {/* Visual Connection Lines (Desktop Only) */}
                <div className="hidden md:block absolute top-[50%] left-[15%] w-[70%] h-[2px] bg-white -z-10 -translate-y-1/2 shadow-sm"></div>

                {/* Column 1: Awaiting Confirmation */}
                <div className="flex flex-col h-[420px]">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-6 text-center shrink-0">
                    Waiting for Confirmation
                  </div>
                  <div className={`space-y-4 overflow-y-auto pr-2 pb-4 ${scrollbarClasses} flex-1`}>
                    {pendingOrders.map(order => (
                      <div 
                        key={order.id} 
                        onClick={() => navigate(`/customer/orders/${order.id}`)}
                        className="bg-white rounded-[1.5rem] p-5 shadow-[0_8px_24px_rgba(149,157,165,0.08)] flex flex-col gap-3 group cursor-pointer hover:shadow-[0_8px_24px_rgba(149,157,165,0.15)] transition-all border border-transparent hover:border-slate-100"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center border border-amber-100 shrink-0">
                             <Clock size={16} className="text-amber-500" />
                          </div>
                          <div className="overflow-hidden">
                            <h4 className="text-sm font-semibold text-[#1E293B] truncate">{order.service_name}</h4>
                            <p className="text-[11px] text-slate-500 truncate">{order.business_name}</p>
                          </div>
                        </div>
                        <div className="pt-3 border-t border-slate-50 text-[11px] font-medium text-slate-400 flex justify-between">
                          <span>Requested</span>
                          <span>{order.time_slot || "Awaiting time"}</span>
                        </div>
                      </div>
                    ))}
                    {pendingOrders.length === 0 && <div className="h-32 border-2 border-dashed border-slate-200 rounded-[1.5rem] flex items-center justify-center text-slate-400 text-sm">None</div>}
                  </div>
                </div>

                {/* Column 2: Scheduled Jobs */}
                <div className="flex flex-col h-[420px]">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-6 text-center shrink-0">
                    Confirmed & Scheduled
                  </div>
                  <div className={`space-y-4 overflow-y-auto pr-2 pb-4 ${scrollbarClasses} flex-1`}>
                    {confirmedOrders.map(order => (
                      <div 
                        key={order.id} 
                        onClick={() => navigate(`/customer/orders/${order.id}`)}
                        className="bg-white rounded-[1.5rem] p-5 shadow-[0_8px_24px_rgba(149,157,165,0.08)] flex flex-col gap-3 group cursor-pointer hover:shadow-[0_8px_24px_rgba(149,157,165,0.15)] transition-all border border-transparent hover:border-blue-50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 shrink-0">
                             <Calendar size={16} className="text-blue-500" />
                          </div>
                          <div className="overflow-hidden">
                            <h4 className="text-sm font-semibold text-[#1E293B] truncate">{order.service_name}</h4>
                            <p className="text-[11px] text-blue-500 font-medium truncate">{order.time_slot}</p>
                          </div>
                        </div>
                        <div className="pt-3 border-t border-slate-50 text-[11px] font-medium text-slate-400 flex justify-between">
                          <span>Status</span>
                          <span className="text-[#1E293B]">Scheduled</span>
                        </div>
                      </div>
                    ))}
                    {confirmedOrders.length === 0 && <div className="h-32 border-2 border-dashed border-slate-200 rounded-[1.5rem] flex items-center justify-center text-slate-400 text-sm">None</div>}
                  </div>
                </div>

                {/* Column 3: Processing (Placeholder to match flow) */}
                <div className="flex flex-col h-[420px] opacity-60">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-6 text-center shrink-0">
                    Jobs In Progress
                  </div>
                  <div className="flex flex-col gap-4">
                     <div className="bg-slate-100 rounded-[1.5rem] p-6 text-center border-2 border-dashed border-slate-200">
                        <CheckCircle size={24} className="text-slate-300 mx-auto mb-2" />
                        <h4 className="text-[13px] font-semibold text-slate-500 mb-1">Awaiting Job Start</h4>
                        <p className="text-[11px] text-slate-400">Scheduled jobs will move here during execution.</p>
                     </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        </BlurFade>

        {/* BOTTOM SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Recommended Services */}
          <BlurFade delay={0.3} className="lg:col-span-2">
            <div className="bg-[#F1F5F9] rounded-[2.5rem] p-8 shadow-[inset_0_2px_10px_rgba(255,255,255,0.7)] h-full border border-white/50">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-semibold text-[#1E293B]">Recommended Services</h3>
                  <button 
                    onClick={() => navigate("/customer/services")} 
                    className="text-[11px] font-bold text-slate-400 hover:text-black uppercase tracking-wider flex items-center gap-1 transition-colors"
                  >
                    View Catalog <ArrowRight size={12} />
                  </button>
               </div>
               
               <div className={`overflow-x-auto ${scrollbarClasses}`}>
                 <table className="w-full text-left border-collapse min-w-[500px]">
                   <thead>
                     <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200/60">
                       <th className="pb-4 pl-2">Service Name</th>
                       <th className="pb-4">Provider</th>
                       <th className="pb-4">Price</th>
                       <th className="pb-4 text-right pr-2">Action</th>
                     </tr>
                   </thead>
                   <tbody className="text-[13px]">
                     {suggestedServices.length > 0 ? suggestedServices.map((service, idx) => (
                       <tr key={service.id} className="hover:bg-white/40 transition-colors border-b border-slate-200/40 group">
                         <td className="py-4 font-semibold text-[#1E293B] pl-2">{service.name}</td>
                         <td className="py-4 text-slate-500 font-medium">{service.business_name}</td>
                         <td className="py-4 font-medium text-slate-700">RM {Number(service.base_price).toFixed(0)}</td>
                         <td className="py-4 text-right pr-2">
                           <button 
                             onClick={() => navigate("/customer/services")}
                             className="px-4 py-2 bg-white text-slate-600 border border-slate-200 rounded-full font-semibold text-[11px] hover:bg-black hover:text-white hover:border-black transition-all shadow-sm"
                           >
                             Book Now
                           </button>
                         </td>
                       </tr>
                     )) : (
                       <tr><td colSpan={4} className="py-8 text-center text-slate-400">No recommendations right now.</td></tr>
                     )}
                   </tbody>
                 </table>
               </div>
            </div>
          </BlurFade>

          {/* Account Summary */}
          <BlurFade delay={0.4} className="lg:col-span-1">
            <div className="bg-[#F1F5F9] rounded-[2.5rem] p-8 shadow-[inset_0_2px_10px_rgba(255,255,255,0.7)] h-full flex flex-col border border-white/50">
              <h3 className="text-lg font-semibold text-[#1E293B] mb-8">My Summary</h3>
              
              <div className="flex flex-col gap-5 flex-1">
                {/* Metric 1: Invoices */}
                <div onClick={() => navigate("/customer/invoices")} className="bg-white rounded-[1.5rem] p-5 shadow-[0_4px_15px_rgba(0,0,0,0.03)] flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow">
                  <div>
                    <p className="text-3xl font-bold text-[#1E293B] leading-none mb-1"><NumberTicker value={unpaidInvoices.length} /></p>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Unpaid Invoices</p>
                  </div>
                  {unpaidInvoices.length > 0 ? (
                    <span className="w-3 h-3 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.5)]"></span>
                  ) : (
                    <span className="w-3 h-3 rounded-full bg-slate-200"></span>
                  )}
                </div>

                {/* Metric 2: History */}
                <div onClick={() => navigate("/customer/orders")} className="bg-white rounded-[1.5rem] p-5 shadow-[0_4px_15px_rgba(0,0,0,0.03)] flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow">
                  <div>
                    <p className="text-3xl font-bold text-[#1E293B] leading-none mb-1"><NumberTicker value={completedOrders.length} /></p>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Completed Jobs</p>
                  </div>
                  <CheckCircle size={20} className="text-emerald-400" />
                </div>
              </div>
            </div>
          </BlurFade>

        </div>
      </div>
    </div>
  );
}