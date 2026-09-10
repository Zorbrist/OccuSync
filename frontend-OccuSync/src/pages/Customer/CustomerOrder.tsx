import { Search, Filter, ClipboardList } from 'lucide-react';
import CustomerSidebar from '../../components/CustomerSidebar';
import { useOrdersData } from '../../hooks/useOrdersData';
import OrderDetailsModal from '../../components/OrderDetailsModal';

export default function CustomerOrders() {
  const {
    filteredOrders,
    availableStatuses,
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
      case 'PENDING': return 'bg-yellow-100 text-yellow-700';
      case 'CONFIRMED': return 'bg-blue-100 text-blue-700';
      case 'ASSIGNED': return 'bg-purple-100 text-purple-700';
      case 'IN_PROGRESS': return 'bg-orange-100 text-orange-700';
      case 'COMPLETED': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f4f7f9] font-sans">
      <CustomerSidebar />
      <div className="flex-1 p-6 md:p-10 relative">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#233876] mb-8">My Orders</h1>
        
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 max-w-5xl">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Order ID, Business Name, or Notes..." 
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#233876] transition"
            />
          </div>
          
          <div className="relative w-full md:w-72">
            <Filter className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-12 pr-10 py-3 rounded-xl border border-gray-200 shadow-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-[#233876] transition font-medium text-gray-700"
            >
              {availableStatuses.map(status => (
                <option key={status} value={status}>
                  {status === 'ALL' ? 'All Statuses' : status.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content State Handling */}
        {isLoading && <p className="text-gray-500 font-medium">Loading your orders...</p>}
        {error && <p className="text-red-500 font-medium">{error}</p>}

        {!isLoading && !error && filteredOrders.length === 0 && (
          <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center max-w-5xl">
            <ClipboardList size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">No orders found</h3>
            <p className="text-gray-500">You do not have any service requests matching your criteria.</p>
          </div>
        )}

        {/* Orders List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
          {filteredOrders.map((order) => (
            <div 
              key={order.id} 
              onClick={() => setSelectedOrder(order)}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer border-l-4 border-[#233876] flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase block mb-1">Order #{order.id}</span>
                    <h3 className="text-lg font-bold text-gray-900">{order.business_name || 'Service Provider'}</h3>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${getStatusColor(order.status)}`}>
                    {order.status.replace('_', ' ')}
                  </span>
                </div>
                
                {order.notes && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 italic">"{order.notes}"</p>
                )}
              </div>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase">Scheduled For</p>
                <p className="text-sm font-semibold text-gray-800">
                  {new Date(order.scheduled_start).toLocaleDateString('en-MY', { 
                    weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Details Modal */}
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