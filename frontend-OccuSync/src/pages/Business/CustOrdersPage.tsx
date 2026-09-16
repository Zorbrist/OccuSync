import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBusinessOrders } from '../../hooks/useBusinessData';

export default function CustomerOrdersPage() {
  const navigate = useNavigate();
  const { data: orders, loading, error, fetchBusinessOrders } = useBusinessOrders();
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'PENDING' | 'COMPLETED' | 'SCHEDULED'>('ALL');

  useEffect(() => {
    fetchBusinessOrders();
  }, []);

  const handleFilterChange = (filter: 'ALL' | 'PENDING' | 'COMPLETED' | 'SCHEDULED') => {
    setActiveFilter(filter);
    if (filter === 'ALL') return fetchBusinessOrders();
    if (filter === 'PENDING') return fetchBusinessOrders('PENDING');
    if (filter === 'COMPLETED') return fetchBusinessOrders('COMPLETED');
    if (filter === 'SCHEDULED') return fetchBusinessOrders();
  };

  const displayedOrders = activeFilter === 'SCHEDULED'
    ? orders.filter((order) => ['CONFIRMED', 'ASSIGNED', 'IN_PROGRESS'].includes(order.status))
    : orders;

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'IN_PROGRESS': return 'In Progress';
      case 'COMPLETED': return 'Completed';
      case 'CANCELLED': return 'Cancelled';
      case 'CONFIRMED': return 'Confirmed';
      case 'ASSIGNED': return 'Assigned';
      case 'PENDING': return 'Pending';
      default: return status;
    }
  };

  const getDotColor = (value: string) => {
    switch (value) {
      case 'COMPLETED': return 'bg-emerald-400';
      case 'IN_PROGRESS': return 'bg-blue-500';
      case 'CONFIRMED': return 'bg-indigo-400';
      case 'ASSIGNED': return 'bg-blue-400';
      case 'CANCELLED': return 'bg-red-400';
      default: return 'bg-amber-400';
    }
  };

  return (
    <div className="min-h-screen bg-[#E8EDF2] p-6 lg:p-10 font-sans [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
      <div className="max-w-7xl mx-auto bg-[#F1F5F9] rounded-[2.5rem] shadow-[inset_0_2px_10px_rgba(255,255,255,0.7)] p-6 md:p-10">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-xl font-semibold text-[#1E293B]">Customer Orders</h1>
          <p className="text-sm text-slate-500 mt-1">Track and manage all inbound service requests.</p>
        </div>

        {/* Filters */}
        <div className="inline-flex flex-wrap gap-2 bg-[#F1F5F9] shadow-inner p-2 rounded-[1.5rem] mb-8">
          {(['ALL', 'PENDING', 'SCHEDULED', 'COMPLETED'] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => handleFilterChange(filter)}
              className={`px-5 py-2.5 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 ${activeFilter === filter
                  ? 'bg-black text-white shadow-md'
                  : 'bg-transparent text-slate-400 hover:text-[#1E293B] hover:bg-white hover:shadow-sm'
                }`}
            >
              {filter === 'ALL' ? 'All Orders' : filter}
            </button>
          ))}
        </div>

        {/* Status Handling */}
        {loading && (
          <div className="bg-white rounded-[1.5rem] p-12 text-center shadow-[0_8px_24px_rgba(149,157,165,0.1)] border border-slate-50">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Loading directory...</p>
          </div>
        )}

        {error && (
          <div className="bg-white rounded-[1.5rem] p-8 shadow-[0_8px_24px_rgba(149,157,165,0.1)] border border-red-50 text-center">
            <p className="text-sm text-red-500 font-medium">{error}</p>
            <button
              type="button"
              onClick={() => handleFilterChange(activeFilter)}
              className="mt-4 px-5 py-2 rounded-[1rem] bg-[#F1F5F9] text-[#1E293B] text-sm font-medium hover:bg-slate-200 transition-colors shadow-inner"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && displayedOrders.length === 0 && (
          <div className="bg-white rounded-[1.5rem] p-16 text-center shadow-[0_8px_24px_rgba(149,157,165,0.1)] border border-slate-50">
            <p className="text-sm text-slate-400">No records found for this category.</p>
          </div>
        )}

        {/* List */}
        {!loading && !error && displayedOrders.length > 0 && (
          <div className="space-y-5">
            {displayedOrders.map((order) => (
              <div
                key={order.id}
                className="group bg-white rounded-[1.5rem] p-6 lg:p-8 border border-slate-50 shadow-[0_8px_24px_rgba(149,157,165,0.05)] hover:shadow-[0_12px_30px_rgba(149,157,165,0.1)] transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                  <div className="flex-1">
                    <div className="flex items-center gap-4 flex-wrap mb-3">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        #{order.id}
                      </span>
                      <div className="flex items-center gap-2 bg-[#F1F5F9] px-3 py-1 rounded-full shadow-inner">
                        <div className={`w-1.5 h-1.5 rounded-full ${getDotColor(order.status)}`} />
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                          {getStatusLabel(order.status)}
                        </span>
                      </div>
                      {order.proposal_status === 'PENDING' && (
                        <div className="flex items-center gap-2 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-500">Awaiting Time Confirmation</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-[#1E293B] mb-1">{order.service_name}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-slate-500">
                      <p>Client: <span className="font-medium text-[#1E293B]">{order.first_name} {order.last_name}</span></p>
                      <span className="hidden sm:inline text-slate-300">•</span>
                      <p>
                        Dated:{" "}
                        <span className="font-medium text-[#1E293B]">
                          {order.scheduled_start
                            ? new Date(order.scheduled_start).toLocaleDateString()
                            : "To be determined"}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-8 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <div className="text-left md:text-right">
                      <p className="text-[11px] uppercase font-semibold text-slate-400 tracking-wider">Order Value</p>
                      <p className="text-xl font-semibold text-[#1E293B]">
                        RM{Number(order.base_price).toLocaleString()}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate(`/business/orders/${order.id}`)}
                      className="w-10 h-10 rounded-full bg-white shadow-[0_4px_14px_0_rgba(149,157,165,0.2)] flex items-center justify-center text-slate-400 hover:text-black hover:-translate-y-1 transition-all border border-slate-50"
                      aria-label="Manage Order"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}