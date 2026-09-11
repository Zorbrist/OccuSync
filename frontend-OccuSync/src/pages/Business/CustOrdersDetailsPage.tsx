import { useEffect, useState } from 'react';
import { ArrowLeft, CalendarDays, Clock, Phone, User, Wrench } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  useBusinessOrder,
  useUpdateBusinessOrderStatus,
} from '../../hooks/useBusinessData';

export default function CustOrdersDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Order details
  const {
    data: order,
    loading,
    error,
    fetchBusinessOrder,
  } = useBusinessOrder();

  // Update order status
  const {
    loading: updating,
    error: updateError,
    updateOrderStatus,
  } = useUpdateBusinessOrderStatus();

  // Selected status
  const [status, setStatus] = useState('');

  // Fetch order details
  useEffect(() => {
    if (!id) return;

    const orderId = Number(id);

    if (!Number.isNaN(orderId)) {
      fetchBusinessOrder(orderId);
    }
  }, [id]);

  // Set selected status when order data loads
  useEffect(() => {
    if (order) {
      setStatus(order.status);
    }
  }, [order]);

  // Update status
  const handleStatusUpdate = async () => {
    if (!id || !status) return;

    try {
      await updateOrderStatus(Number(id), status);
      await fetchBusinessOrder(Number(id));
    } catch {
      // Error is handled by the hook
    }
  };

  // Format status
  const getStatusLabel = (value: string) => {
    switch (value) {
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
        return value;
    }
  };

  // Status badge style
  const getStatusStyle = (value: string) => {
    switch (value) {
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

  // Loading
  if (loading) {
    return (
      <div className="p-8">
        <p className="text-sm text-slate-500">Loading order details...</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="p-8">
        <button
          type="button"
          onClick={() => navigate('/business/orders')}
          className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-rose-950"
        >
          <ArrowLeft size={18} />
          Back to Orders
        </button>

        <div className="rounded-3xl border border-red-100 bg-red-50 p-6">
          <p className="text-sm font-medium text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  // Order not found
  if (!order) {
    return (
      <div className="p-8">
        <button
          type="button"
          onClick={() => navigate('/business/orders')}
          className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-rose-950"
        >
          <ArrowLeft size={18} />
          Back to Orders
        </button>

        <div className="rounded-3xl border border-rose-100 bg-white p-8 text-center">
          <p className="text-sm text-slate-500">Order not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <button
          type="button"
          onClick={() => navigate('/business/orders')}
          className="mb-5 flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-rose-950"
        >
          <ArrowLeft size={18} />
          Back to Orders
        </button>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-400">Order #{order.id}</p>
            <h1 className="mt-1 text-3xl font-extrabold text-rose-950">Order Details</h1>
          </div>

          <span className={`w-fit rounded-full px-4 py-2 text-sm font-bold ${getStatusStyle(order.status)}`}>
            {getStatusLabel(order.status)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main information */}
        <div className="space-y-6 lg:col-span-2">
          {/* Service */}
          <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-xl shadow-rose-950/5">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-rose-50 p-3 text-rose-950">
                <Wrench size={20} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase text-slate-400">Service</p>
                <h2 className="text-xl font-bold text-slate-900">{order.service_name}</h2>
              </div>
            </div>

            <p className="text-sm leading-6 text-slate-500">
              {order.service_description || 'No service description available.'}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase text-slate-400">Service Price</p>
                <p className="mt-1 text-xl font-black text-rose-950">
                  RM{Number(order.base_price).toLocaleString()}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase text-slate-400">Service ID</p>
                <p className="mt-1 text-xl font-black text-slate-900">#{order.service_id}</p>
              </div>
            </div>
          </div>

          {/* Customer */}
          <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-xl shadow-rose-950/5">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-rose-50 p-3 text-rose-950">
                <User size={20} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase text-slate-400">Customer</p>
                <h2 className="text-xl font-bold text-slate-900">
                  {order.first_name} {order.last_name}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Phone size={17} className="text-slate-400" />
              {order.phone || 'No phone number available'}
            </div>
          </div>

          {/* Appointment */}
          <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-xl shadow-rose-950/5">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-rose-50 p-3 text-rose-950">
                <CalendarDays size={20} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase text-slate-400">Appointment</p>
                <h2 className="text-xl font-bold text-slate-900">Scheduled Service</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-400">
                  <CalendarDays size={15} />
                  Start
                </div>
                <p className="mt-2 text-sm font-semibold text-slate-800">
                  {new Date(order.scheduled_start).toLocaleString()}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-400">
                  <Clock size={15} />
                  End
                </div>
                <p className="mt-2 text-sm font-semibold text-slate-800">
                  {new Date(order.scheduled_end).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Customer notes */}
          <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-xl shadow-rose-950/5">
            <p className="text-xs font-bold uppercase text-slate-400">Customer Notes</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {order.notes || 'No notes provided by the customer.'}
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Update status */}
          <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-xl shadow-rose-950/5">
            <h2 className="text-lg font-bold text-slate-900">Manage Order</h2>
            <p className="mt-1 text-sm text-slate-400">Update the current order status.</p>

            <label className="mt-5 block text-sm font-semibold text-slate-700">
              Order Status
            </label>

            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-rose-950"
            >
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="ASSIGNED">Assigned</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>

            {updateError && (
              <p className="mt-3 text-sm text-red-600">{updateError}</p>
            )}

            <button
              type="button"
              onClick={handleStatusUpdate}
              disabled={updating || status === order.status}
              className="mt-4 w-full rounded-xl bg-rose-950 px-4 py-3 text-sm font-bold text-white hover:bg-rose-900 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {updating ? 'Updating...' : 'Update Status'}
            </button>
          </div>

          {/* Assigned member */}
          <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-xl shadow-rose-950/5">
            <p className="text-xs font-bold uppercase text-slate-400">Assigned Member</p>

            {order.assigned_member_id ? (
              <div className="mt-3">
                <p className="font-bold text-slate-900">Member #{order.assigned_member_id}</p>
                <p className="mt-1 text-sm text-slate-500">
                  Role: {order.assigned_member_role || 'Not specified'}
                </p>
              </div>
            ) : (
              <p className="mt-3 text-sm text-slate-500">No member assigned yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}