// pages/CustomerOrders.tsx
import { Search, ClipboardList, Sparkles, Calendar, ArrowRight, Briefcase } from 'lucide-react';
import { useOrdersData } from '../../hooks/useOrdersData';
import OrderDetailsModal from '../../components/OrderDetailsModal';

import { BlurFade } from '../../ui/blur-fade';
import { Particles } from '../../ui/particles';

export default function CustomerOrders() {
  const {
    filteredOrders,
    availableStatuses,
    statusCounts,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    isLoading,
    error,
    selectedOrder,
    setSelectedOrder
  } = useOrdersData();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-amber-50 text-amber-500 border-amber-100 shadow-[0_0_10px_rgba(251,191,36,0.1)]';
      case 'CONFIRMED': return 'bg-violet-50 text-violet-600 border-violet-200 shadow-[0_0_10px_rgba(124,58,237,0.1)]';
      case 'COMPLETED': return 'bg-emerald-50 text-emerald-500 border-emerald-100 shadow-[0_0_10px_rgba(16,185,129,0.1)]';
      case 'CANCELLED': return 'bg-red-50 text-red-500 border-red-100 shadow-[0_0_10px_rgba(239,68,68,0.1)]';
      default: return 'bg-slate-50 text-slate-500 border-slate-200';
    }
  };

  const scrollbarClasses = "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-400";

  return (
    <div className="min-h-full font-sans text-slate-800 selection:bg-violet-200 relative pb-32 bg-[#E8EDF2]">
      <Particles className="absolute inset-0 pointer-events-none z-0 opacity-40" quantity={50} ease={80} color="#7C3AED" />

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 lg:px-12 space-y-8 pt-4">
        
        {/* ==============================
            Header
        ============================== */}
        <BlurFade delay={0.1}>
          <div className="flex items-center justify-between py-2 border-b border-slate-200/50 pb-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-[#0F172A]">My Orders</h2>
              <p className="text-sm font-semibold text-slate-500 mt-1.5 uppercase tracking-wider">
                Track and manage requested services
              </p>
            </div>
          </div>
        </BlurFade>

        {/* ==============================
            Main Panel
        ============================== */}
        <BlurFade delay={0.2}>
          <div className="bg-[#F1F5F9] rounded-[2.5rem] p-8 shadow-[inset_0_2px_15px_rgba(255,255,255,1)] border border-white/60 flex flex-col min-h-[600px]">
            
            {/* Search Bar */}
            <div className="relative w-full max-w-lg mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by ID, provider, or service name..."
                className="w-full bg-white border border-slate-200 rounded-full pl-11 pr-5 py-3 text-sm text-[#0F172A] outline-none placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-50 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.02)]"
              />
            </div>

            {/* Custom Tabs / Status Filter */}
            <div className={`overflow-x-auto pb-4 mb-4 ${scrollbarClasses}`}>
              <div className="flex gap-3 min-w-max border-b border-slate-200/60 pb-4">
                {availableStatuses.map(status => {
                  const isActive = statusFilter === status;
                  const count = statusCounts[status] || 0;

                  return (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`
                        relative px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2.5
                        ${isActive
                          ? 'bg-[#0F172A] text-white shadow-md'
                          : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 hover:text-[#0F172A]'}
                      `}
                    >
                      {status === 'ALL' ? 'All Orders' : status.replace('_', ' ')}

                      <span className={`
                        px-2 py-0.5 rounded-full text-[10px] font-black
                        ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}
                      `}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* State Handling */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-64 bg-white/50 rounded-[2rem] border border-slate-100">
                 <div className="w-10 h-10 border-[3px] border-slate-200 border-t-violet-600 rounded-full animate-spin mb-4"></div>
                 <p className="text-slate-500 font-semibold text-sm">Loading orders...</p>
              </div>
            )}

            {error && (
              <div className="flex items-center justify-center h-64 bg-red-50/50 rounded-[2rem] border border-red-100">
                <p className="text-red-500 font-semibold text-sm">{error}</p>
              </div>
            )}

            <BlurFade key={statusFilter} delay={0.3}>
              {!isLoading && !error && filteredOrders.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 bg-white/50 rounded-[2rem] border border-slate-100">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <ClipboardList size={24} className="text-slate-400" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-1">No orders found</h3>
                  <p className="text-sm font-medium text-slate-500 mb-4">No records match your current filter.</p>
                  {statusFilter !== 'ALL' && (
                    <button
                      onClick={() => setStatusFilter('ALL')}
                      className="px-6 py-2 bg-white border border-slate-200 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors shadow-sm"
                    >
                      View All Orders
                    </button>
                  )}
                </div>
              )}

              {/* Orders Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all flex flex-col justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-5 gap-2">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                            Order #{order.id}
                          </span>
                          <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-violet-700 transition-colors duration-200 leading-tight">
                            {order.service_name || 'Service Request'}
                          </h3>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span
                            className={`text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border whitespace-nowrap ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>

                      <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl mb-6 flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 border border-slate-100">
                           <Briefcase size={14} className="text-slate-400" />
                         </div>
                         <div className="overflow-hidden">
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Assigned Provider</p>
                           <p className="text-sm font-bold text-[#0F172A] truncate">
                             {order.business_name || 'Pending Assignment'}
                           </p>
                         </div>
                      </div>
                    </div>

                    <div className="pt-5 mt-auto border-t border-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-violet-50 rounded-full">
                          <Calendar size={14} className="text-violet-600" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                            {order.proposal_status === 'PENDING' ? 'Proposed For' : 'Scheduled For'}
                          </p>

                          <p className={`text-sm font-bold leading-none ${(!order.date && !order.proposed_date) ? 'text-slate-400 italic' : 'text-[#0F172A]'}`}>
                            {order.proposal_status === 'PENDING' && order.proposed_date
                              ? new Date(order.proposed_date).toLocaleDateString('en-MY', {
                                month: 'short', day: 'numeric', year: 'numeric'
                              })
                              : order.date
                                ? new Date(order.date).toLocaleDateString('en-MY', {
                                  month: 'short', day: 'numeric', year: 'numeric'
                                })
                                : 'To be determined'}
                          </p>
                        </div>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-[#0F172A] group-hover:border-black transition-all duration-200">
                        <ArrowRight size={14} className="text-slate-400 group-hover:text-white" />
                      </div>
                    </div>
                    
                    {/* Compact Pending Alert */}
                    {order.status === 'PENDING' && order.proposal_status === 'PENDING' && (
                      <div className="mt-4 pt-3 border-t border-amber-100 text-center">
                        <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest whitespace-nowrap">
                          Waiting for time slot approval
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </BlurFade>
          </div>
        </BlurFade>

        {/* Modal Injection */}
        {selectedOrder && (
          <OrderDetailsModal
            order={selectedOrder}
            isOpen={!!selectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
        )}

      </div>
    </div>
  );
}