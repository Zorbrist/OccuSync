// pages/CustomerOrders.tsx
import { Search, ClipboardList, Sparkles, Calendar, ArrowRight } from 'lucide-react';
import { useOrdersData } from '../../hooks/useOrdersData';
import OrderDetailsModal from '../../components/OrderDetailsModal';

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
      case 'PENDING': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'CONFIRMED': return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
      case 'COMPLETED': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 font-sans text-slate-100 selection:bg-indigo-500/30 relative overflow-hidden">
      
      {/* Subtle Ambient Glows for Depth */}
      <div className="fixed top-[-10%] left-[10%] w-[40rem] h-[40rem] bg-indigo-900/15 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-[35rem] h-[35rem] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="flex-1 h-full overflow-y-auto relative z-10">
        <div className="flex-1 p-6 md:p-10 lg:pl-12 max-w-7xl mx-auto relative z-10">
          
          {/* Premium Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-indigo-400 text-xs font-semibold tracking-wide uppercase mb-2 flex items-center gap-2">
                <Sparkles size={16} className="text-indigo-500" /> Track & Manage
              </p>
              <h1 className="text-3xl md:text-4xl font-semibold text-slate-100 tracking-tight">
                My Orders
              </h1>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-3.5 text-slate-500" size={18} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ID, provider, or service..." 
                className="w-full pl-11 pr-4 py-3 bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200 font-medium text-sm text-slate-100 placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Custom Tabs with Indicators */}
          <div className="mb-8 overflow-x-auto pb-2 -mx-6 px-6 md:mx-0 md:px-0">
            <div className="flex gap-3 min-w-max border-b border-slate-800/50 pb-3">
              {availableStatuses.map(status => {
                const isActive = statusFilter === status;
                const count = statusCounts[status] || 0;
                
                return (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`
                      relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2.5
                      ${isActive 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 transform -translate-y-0.5 border border-indigo-500' 
                        : 'bg-slate-900/60 text-slate-400 border border-slate-800 backdrop-blur-md hover:bg-slate-800/80 hover:text-slate-200 hover:border-slate-700'}
                    `}
                  >
                    {status === 'ALL' ? 'All Orders' : status.replace('_', ' ')}
                    
                    <span className={`
                      px-2 py-0.5 rounded-full text-[11px] font-bold
                      ${isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-500'}
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
            <div className="flex flex-col items-center justify-center py-20 bg-slate-900/40 rounded-2xl border border-slate-800 backdrop-blur-sm">
               <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
               <p className="text-slate-300 font-medium animate-pulse">Loading your orders...</p>
            </div>
          )}
          
          {error && (
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-red-500/20 backdrop-blur-md text-center max-w-md mx-auto my-10">
              <p className="text-slate-300 font-medium">{error}</p>
            </div>
          )}

          {!isLoading && !error && filteredOrders.length === 0 && (
            <div className="bg-slate-900/60 backdrop-blur-md p-12 rounded-2xl shadow-lg border border-slate-800 text-center max-w-2xl mx-auto mt-10">
              <div className="w-16 h-16 bg-slate-800/50 border border-slate-700/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ClipboardList size={28} className="text-slate-500" />
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-2">No orders found</h3>
              <p className="text-slate-400 text-sm mb-6">You don't have any orders matching the current filter.</p>
              {statusFilter !== 'ALL' && (
                <button 
                  onClick={() => setStatusFilter('ALL')}
                  className="px-6 py-2.5 bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-sm font-medium hover:bg-slate-700 hover:text-white transition-all duration-200"
                >
                  View All Orders
                </button>
              )}
            </div>
          )}

          {/* Refined Orders List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredOrders.map((order) => (
              <div 
                key={order.id} 
                onClick={() => setSelectedOrder(order)}
                className="bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-indigo-500/5 transition-all duration-200 cursor-pointer border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/60 group flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div>
                  <div className="flex justify-between items-start mb-5 gap-2">
                    <div>
                      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block mb-1">
                        Order #{order.id}
                      </span>
                      <h3 className="text-lg font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors duration-200 leading-tight">
                        {order.service_name || 'Service Request'}
                      </h3>
                    </div>
                    <span className={`text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider border whitespace-nowrap ${getStatusColor(order.status)}`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </div>
                  
                  <p className="text-slate-400 text-sm mb-6 bg-slate-950/50 border border-slate-800/50 p-4 rounded-xl leading-relaxed">
                    Provider: <strong className="text-slate-300 font-medium">{order.business_name || 'Pending'}</strong>
                  </p>
                </div>

                <div className="pt-5 mt-auto border-t border-slate-800/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-950/50 border border-slate-800/50 rounded-lg">
                      <Calendar size={16} className="text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-slate-500 uppercase leading-none mb-1.5">Scheduled For</p>
                      <p className={`text-sm font-medium leading-none ${!order.date ? 'text-slate-500 italic' : 'text-slate-300'}`}>
                        {order.date ? new Date(order.date).toLocaleDateString('en-MY', { 
                          month: 'short', day: 'numeric', year: 'numeric'
                        }) : 'To be determined'}
                      </p>
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all duration-200">
                     <ArrowRight size={16} className="text-slate-400 group-hover:text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedOrder && (
            <OrderDetailsModal 
              order={selectedOrder}
              isOpen={!!selectedOrder}
              onClose={() => setSelectedOrder(null)}
            />
          )}

        </div>
      </div>
    </div>
  );
}