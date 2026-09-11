import { Eye } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBusinessOrders } from '../../hooks/useBusinessData';

export default function CustomerOrdersPage() {
  const navigate = useNavigate();

  // Orders data
  const { data: orders, loading, error, fetchBusinessOrders } = useBusinessOrders();

  // Active filter
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'PENDING' | 'COMPLETED' | 'SCHEDULED'>('ALL');

  // Fetch orders when the page loads
  useEffect(() => {
    fetchBusinessOrders();
  }, []);

  // Handle order filters
  const handleFilterChange = (filter: 'ALL' | 'PENDING' | 'COMPLETED' | 'SCHEDULED') => {
    setActiveFilter(filter);

    if (filter === 'ALL') {
      fetchBusinessOrders();
      return;
    }

    if (filter === 'PENDING') {
      fetchBusinessOrders('PENDING');
      return;
    }

    if (filter === 'COMPLETED') {
      fetchBusinessOrders('COMPLETED');
      return;
    }

    if (filter === 'SCHEDULED') {
      fetchBusinessOrders();
    }
  };

  // Scheduled includes confirmed, assigned and in-progress orders
  const displayedOrders = activeFilter === 'SCHEDULED'
    ? orders.filter((order) => ['CONFIRMED', 'ASSIGNED', 'IN_PROGRESS'].includes(order.status))
    : orders;

  // Format status text
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'IN_PROGRESS':
        return 'In Progress';
      case 'COMPLETED':
        return 'Completed';
      case 'CANCELLED':
        return 'Cancelled';
      case 'CONFIRMED':
        return 'Confirmed';
      case 'ASSIGNED':
        return 'Assigned';
      case 'PENDING':
        return 'Pending';
      default:
        return status;
    }
  };

  // Get status badge style
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-700';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-700';
      case 'CONFIRMED':
        return 'bg-purple-100 text-purple-700';
      case 'ASSIGNED':
        return 'bg-indigo-100 text-indigo-700';
      case 'CANCELLED':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-amber-100 text-amber-700';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-rose-950">Customer Orders</h1>
        <p className="text-sm text-slate-400 mt-1">Track and manage all customer service orders.</p>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-3xl p-5 border border-rose-100 shadow-xl shadow-rose-950/5 mb-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => handleFilterChange('ALL')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold ${activeFilter === 'ALL' ? 'bg-rose-950 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          All Orders
        </button>

        <button
          type="button"
          onClick={() => handleFilterChange('PENDING')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold ${activeFilter === 'PENDING' ? 'bg-rose-950 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          Pending
        </button>

        <button
          type="button"
          onClick={() => handleFilterChange('SCHEDULED')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold ${activeFilter === 'SCHEDULED' ? 'bg-rose-950 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          Scheduled
        </button>

        <button
          type="button"
          onClick={() => handleFilterChange('COMPLETED')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold ${activeFilter === 'COMPLETED' ? 'bg-rose-950 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          Completed
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-3xl p-8 border border-rose-100">
          <p className="text-sm text-slate-500">Loading customer orders...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 rounded-3xl p-6 border border-red-100">
          <p className="text-sm text-red-600">{error}</p>
          <button
            type="button"
            onClick={() => handleFilterChange(activeFilter)}
            className="mt-4 px-4 py-2 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && displayedOrders.length === 0 && (
        <div className="bg-white rounded-3xl p-8 border border-rose-100 text-center">
          <p className="text-sm text-slate-500">No customer orders found.</p>
        </div>
      )}

      {/* Orders */}
      {!loading && !error && displayedOrders.length > 0 && (
        <div className="space-y-4">
          {displayedOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-3xl p-6 border border-rose-100 shadow-xl shadow-rose-950/5">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                <div>
                  {/* Order ID and status */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-black text-rose-950">#{order.id}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>

                  {/* Service */}
                  <h3 className="text-lg font-bold text-slate-900 mt-3">{order.service_name}</h3>

                  {/* Customer */}
                  <p className="text-sm text-slate-400 mt-1">
                    Customer: {order.first_name} {order.last_name}
                  </p>

                  {/* Appointment */}
                  <p className="text-sm text-slate-400">
                    Appointment: {new Date(order.scheduled_start).toLocaleString()}
                  </p>
                </div>

                {/* Order value and manage button */}
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs uppercase font-bold text-slate-400">Order Value</p>
                    <p className="text-xl font-black text-rose-950">
                      RM{Number(order.base_price).toLocaleString()}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate(`/business/orders/${order.id}`)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-950 text-white text-sm font-bold hover:bg-rose-900"
                  >
                    <Eye size={16} />
                    Manage
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}