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

import { ShimmerButton } from "../../ui/shimmer-button";
import { BlurFade } from "../../ui/blur-fade";
import { Particles } from "../../ui/particles";

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
        <div className="w-10 h-10 border-[4px] border-slate-300 border-t-violet-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#E8EDF2]">
        <div className="bg-white p-8 rounded-[2rem] shadow-xl text-center max-w-sm">
          <h3 className="text-[#0F172A] text-xl font-bold mb-2">Connection Error</h3>
          <p className="text-slate-600 text-sm mb-6 font-medium">{error}</p>
          <button onClick={() => window.location.reload()} className="px-6 py-3 bg-[#0F172A] text-white rounded-full text-sm font-bold w-full shadow-md">
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

  const scrollbarClasses = "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-400";

  return (
    <div className="min-h-full font-sans text-slate-800 selection:bg-violet-200 relative pb-16 bg-[#E8EDF2]">
      {/* Background Particles matched to Admin styling */}
      <Particles className="absolute inset-0 pointer-events-none z-0 opacity-60" quantity={400} ease={80} size={1} color="#7C3AED" />
      
      <div className="relative z-10 max-w-[1500px] mx-auto px-6 lg:px-12 space-y-8 pt-4">
        
        {/* Header Title & Date */}
        <BlurFade delay={0.1}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-slate-200/50 pb-6 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md shrink-0">
                <span className="text-2xl">👋</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] leading-tight">
                  Welcome back, {customer?.name?.split(" ")[0] || "User"}
                </h2>
                <p className="text-sm font-semibold text-slate-500 mt-1 uppercase tracking-wider">{currentDate}</p>
              </div>
            </div>
            
            <ShimmerButton
              onClick={() => navigate("/customer/services")}
              shimmerColor="#ffffff"
              shimmerSize="0.05em"
              background="#0F172A"
              className="px-6 py-2.5 rounded-full shadow-md hover:shadow-lg transition-shadow"
            >
              <span className="flex items-center gap-2 text-sm font-bold text-white whitespace-nowrap tracking-wide">
                <Plus size={16} /> Request New Service
              </span>
            </ShimmerButton>
          </div>
        </BlurFade>

        {/* TOP SECTION: My Active Jobs */}
        <BlurFade delay={0.2}>
          <div className="bg-[#F1F5F9] rounded-[2.5rem] p-8 shadow-[inset_0_2px_15px_rgba(255,255,255,1)] border border-white/60">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-[#0F172A]">My Active Jobs</h3>
              {/* Removed onClick and hover effects to make this purely visual */}
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-400 border border-slate-100">
                <MoreHorizontal size={18} />
              </div>
            </div>

            {activeOrders.length === 0 ? (
               <div className="py-16 flex flex-col items-center justify-center bg-white/50 rounded-[2rem] border border-white/60 shadow-sm">
                  <ClipboardList size={32} className="text-slate-300 mb-4" />
                  <p className="text-slate-500 font-semibold text-center">You have no active jobs right now.<br/>Click 'Request New Service' to get started.</p>
               </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative px-2">
                {/* Visual Connection Lines (Desktop Only) */}
                <div className="hidden md:block absolute top-[50%] left-[15%] w-[70%] h-[2px] bg-white -z-10 -translate-y-1/2 shadow-sm"></div>

                {/* Column 1: Awaiting Confirmation */}
                <div className="flex flex-col h-[420px]">
                  <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6 text-center shrink-0">
                    Waiting for Confirmation
                  </div>
                  <div className={`space-y-4 overflow-y-auto pr-2 pb-4 ${scrollbarClasses} flex-1`}>
                    {pendingOrders.map(order => (
                      <div 
                        key={order.id} 
                        // Removed onClick, cursor-pointer, and hover animations
                        className="bg-white rounded-[1.5rem] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col gap-3 group border border-slate-50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center border border-amber-100 shrink-0">
                             <Clock size={16} className="text-amber-500" />
                          </div>
                          <div className="overflow-hidden">
                            <h4 className="text-sm font-bold text-[#0F172A] truncate">{order.service_name}</h4>
                            <p className="text-[11px] font-semibold text-slate-500 mt-0.5 truncate">{order.business_name}</p>
                          </div>
                        </div>
                        <div className="pt-3 border-t border-slate-100 text-[11px] font-bold text-slate-400 flex justify-between uppercase tracking-wider">
                          <span>Requested</span>
                          <span className="text-[#0F172A]">{order.time_slot || "Awaiting time"}</span>
                        </div>
                      </div>
                    ))}
                    {pendingOrders.length === 0 && <div className="h-32 border-2 border-dashed border-slate-200 rounded-[1.5rem] flex items-center justify-center text-slate-400 font-semibold text-sm">None</div>}
                  </div>
                </div>

                {/* Column 2: Scheduled Jobs */}
                <div className="flex flex-col h-[420px]">
                  <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6 text-center shrink-0">
                    Confirmed & Scheduled
                  </div>
                  <div className={`space-y-4 overflow-y-auto pr-2 pb-4 ${scrollbarClasses} flex-1`}>
                    {confirmedOrders.map(order => (
                      <div 
                        key={order.id} 
                        // Removed onClick, cursor-pointer, and hover animations
                        className="bg-white rounded-[1.5rem] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col gap-3 group border border-slate-50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-violet-50 flex items-center justify-center border border-violet-100 shrink-0">
                             <Calendar size={16} className="text-violet-600" />
                          </div>
                          <div className="overflow-hidden">
                            <h4 className="text-sm font-bold text-[#0F172A] truncate">{order.service_name}</h4>
                            <p className="text-[11px] font-bold text-violet-600 mt-0.5 truncate">{order.time_slot}</p>
                          </div>
                        </div>
                        <div className="pt-3 border-t border-slate-100 text-[11px] font-bold text-slate-400 flex justify-between uppercase tracking-wider">
                          <span>Status</span>
                          <span className="text-emerald-500">Scheduled</span>
                        </div>
                      </div>
                    ))}
                    {confirmedOrders.length === 0 && <div className="h-32 border-2 border-dashed border-slate-200 rounded-[1.5rem] flex items-center justify-center text-slate-400 font-semibold text-sm">None</div>}
                  </div>
                </div>

                {/* Column 3: Processing */}
                <div className="flex flex-col h-[420px] opacity-60">
                  <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6 text-center shrink-0">
                    Jobs In Progress
                  </div>
                  <div className="flex flex-col gap-4">
                     <div className="bg-white rounded-[1.5rem] p-6 text-center border border-slate-200 shadow-sm">
                        <CheckCircle size={24} className="text-slate-300 mx-auto mb-3" />
                        <h4 className="text-sm font-bold text-slate-500 mb-1">Awaiting Job Start</h4>
                        <p className="text-xs font-medium text-slate-400">Scheduled jobs will move here during execution.</p>
                     </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        </BlurFade>

        {/* BOTTOM SECTION */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Recommended Services */}
          <BlurFade delay={0.3} className="xl:col-span-2 h-full">
            <div className="bg-[#F1F5F9] rounded-[2.5rem] p-8 shadow-[inset_0_2px_15px_rgba(255,255,255,1)] border border-white/60 h-full flex flex-col">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold text-[#0F172A]">Recommended Services</h3>
                  <button 
                    onClick={() => navigate("/customer/services")} 
                    className="text-[11px] font-bold text-slate-400 hover:text-black uppercase tracking-wider flex items-center gap-1 transition-colors"
                  >
                    View Catalog <ArrowRight size={12} />
                  </button>
               </div>
               
               <div className={`overflow-x-auto overflow-y-auto max-h-[350px] bg-white rounded-[1.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-slate-100 flex-1 ${scrollbarClasses}`}>
                 <table className="w-full text-left min-w-[500px]">
                   <thead className="sticky top-0 bg-white z-10">
                     <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200">
                       <th className="py-5 pl-6 bg-white rounded-tl-[1.5rem]">Service Name</th>
                       <th className="py-5 bg-white">Provider</th>
                       <th className="py-5 pr-6 bg-white rounded-tr-[1.5rem]">Price</th>
                     </tr>
                   </thead>
                   <tbody className="text-sm">
                     {suggestedServices.length > 0 ? suggestedServices.map((service) => (
                       <tr key={service.id} className="hover:bg-slate-50 transition-colors border-b border-slate-100 group">
                         <td className="py-5 pl-6">
                           <p className="font-bold text-[#0F172A] group-hover:text-violet-700 transition-colors">{service.name}</p>
                         </td>
                         <td className="py-5 text-slate-600 font-semibold">{service.business_name}</td>
                         <td className="py-5 pr-6">
                           <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[#0F172A] font-black text-xs tracking-wider shadow-sm">
                             RM {Number(service.base_price).toFixed(0)}
                           </span>
                         </td>
                       </tr>
                     )) : (
                       <tr><td colSpan={3} className="py-12 text-center text-slate-500 font-semibold bg-slate-50">No recommendations right now.</td></tr>
                     )}
                   </tbody>
                 </table>
               </div>
            </div>
          </BlurFade>

          {/* Account Summary */}
          <BlurFade delay={0.4} className="xl:col-span-1 h-full">
            <div className="bg-[#F1F5F9] rounded-[2.5rem] p-8 shadow-[inset_0_2px_15px_rgba(255,255,255,1)] border border-white/60 h-full flex flex-col">
              <h3 className="text-xl font-bold text-[#0F172A] mb-8">My Summary</h3>
              
              <div className="flex flex-col gap-6 flex-1">
                
                {/* Metric 1: Invoices */}
                <div 
                  onClick={() => navigate("/customer/invoices")} 
                  className="bg-white rounded-[1.5rem] p-7 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between border border-slate-50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all cursor-pointer flex-1"
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Unpaid Invoices</span>
                    {unpaidInvoices.length > 0 ? (
                      <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span>
                    ) : (
                      <span className="w-3 h-3 rounded-full bg-slate-200"></span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-5xl font-black text-[#0F172A]">{unpaidInvoices.length}</h3>
                  </div>
                </div>

                {/* Metric 2: History */}
                <div 
                  onClick={() => navigate("/customer/orders")} 
                  className="bg-white rounded-[1.5rem] p-7 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between border border-slate-50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all cursor-pointer flex-1"
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Completed Jobs</span>
                    <CheckCircle size={20} className="text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-5xl font-black text-[#0F172A]">{completedOrders.length}</h3>
                  </div>
                </div>

              </div>
            </div>
          </BlurFade>

        </div>
      </div>
    </div>
  );
}