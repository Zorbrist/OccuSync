import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Phone,
  User,
  Wrench,
  CalendarPlus
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useBusinessOrder,
  useUpdateBusinessOrderStatus,
  useBusinessMembers,
  useAssignOrderMember,
} from '../../hooks/useBusinessData';

export default function CustOrdersDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: order, loading, error, fetchBusinessOrder } = useBusinessOrder();
  const { loading: updating, error: updateError, updateOrderStatus } = useUpdateBusinessOrderStatus();
  const { data: members, loading: membersLoading, error: membersError, fetchBusinessMembers } = useBusinessMembers();
  const { loading: assigning, error: assignError, assignMember } = useAssignOrderMember();

  const [status, setStatus] = useState('');
  const [selectedMemberId, setSelectedMemberId] = useState('');

  useEffect(() => {
    if (!id) return;
    const orderId = Number(id);
    if (!Number.isNaN(orderId)) {
      fetchBusinessOrder(orderId);
      fetchBusinessMembers();
    }
  }, [id]);

  useEffect(() => {
    if (order) {
      setStatus(order.status);
      setSelectedMemberId(order.assigned_member_id || '');
    }
  }, [order]);

  const handleStatusUpdate = async () => {
    if (!id || !status) return;
    try {
      await updateOrderStatus(Number(id), status);
      await fetchBusinessOrder(Number(id));
    } catch {}
  };

  const handleAssignMember = async () => {
    if (!id || !selectedMemberId) return;
    try {
      await assignMember(Number(id), selectedMemberId);
      await fetchBusinessOrder(Number(id));
    } catch {}
  };

  const getStatusLabel = (value: string) => {
    switch (value) {
      case 'IN_PROGRESS': return 'In Progress';
      case 'COMPLETED': return 'Completed';
      case 'CANCELLED': return 'Cancelled';
      case 'CONFIRMED': return 'Confirmed';
      case 'ASSIGNED': return 'Assigned';
      case 'PENDING': return 'Pending';
      default: return value;
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#E8EDF2] p-8 flex items-center justify-center">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Loading details...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#E8EDF2] p-8">
        <button
          type="button"
          onClick={() => navigate('/business/orders')}
          className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-black transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100">
            <ArrowLeft size={16} />
          </div>
          Back to Orders
        </button>
        <div className="max-w-xl mx-auto bg-white rounded-[1.5rem] shadow-[0_8px_24px_rgba(149,157,165,0.1)] p-8 text-center border border-slate-50">
          <p className="text-sm text-slate-500">{error || 'Order not found.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E8EDF2] p-6 lg:p-10 font-sans [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
      
      <div className="max-w-7xl mx-auto mb-6">
        <button
          type="button"
          onClick={() => navigate('/business/orders')}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-black transition-colors w-fit"
        >
          <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100 group-hover:shadow-md transition-all">
            <ArrowLeft size={16} />
          </div>
          Back to Orders
        </button>
      </div>

      <div className="max-w-7xl mx-auto bg-[#F1F5F9] rounded-[2.5rem] shadow-[inset_0_2px_10px_rgba(255,255,255,0.7)] p-6 md:p-10">
        
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Order #{order.id}</p>
            <h1 className="text-xl font-semibold text-[#1E293B] mt-1">Order Details</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-[0_2px_8px_rgba(149,157,165,0.1)] border border-slate-50">
              <div className={`w-2 h-2 rounded-full ${getDotColor(order.status)}`} />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                {getStatusLabel(order.status)}
              </span>
            </div>

            {order.status === 'PENDING' && (
              <button
                onClick={() => navigate(`/business/proposals?jobId=${order.id}`)}
                disabled={order.proposal_status === 'PENDING'}
                className="flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-50 shadow-md"
              >
                <CalendarPlus size={16} />
                {order.proposal_status === 'PENDING' ? 'Date Proposed' : 'Propose Date'}
              </button>
            )}
            </div>
          </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">
            
            {/* Service */}
            <div className="bg-white rounded-[1.5rem] shadow-[0_8px_24px_rgba(149,157,165,0.1)] p-8 border border-slate-50 transition-all hover:shadow-[0_12px_30px_rgba(149,157,165,0.15)]">
              <div className="mb-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#F1F5F9] shadow-inner flex items-center justify-center text-[#1E293B]">
                  <Wrench size={20} />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Service Category</p>
                  <h2 className="text-[#1E293B] text-lg font-semibold">{order.service_name}</h2>
                </div>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                {order.service_description || 'No service description available.'}
              </p>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="bg-[#F1F5F9] rounded-[1rem] p-5 shadow-inner">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Service Price</p>
                  <p className="mt-1 text-lg font-semibold text-[#1E293B]">RM{Number(order.base_price).toLocaleString()}</p>
                </div>
                <div className="bg-[#F1F5F9] rounded-[1rem] p-5 shadow-inner">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Service Reference</p>
                  <p className="mt-1 text-lg font-semibold text-[#1E293B]">#{order.service_id}</p>
                </div>
              </div>
            </div>

            {/* Customer & Appointment Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-[1.5rem] shadow-[0_8px_24px_rgba(149,157,165,0.1)] p-8 border border-slate-50">
                <div className="mb-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#F1F5F9] shadow-inner flex items-center justify-center text-[#1E293B]">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Customer</p>
                    <h2 className="text-[#1E293B] font-semibold">{order.first_name} {order.last_name}</h2>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-500 bg-[#F1F5F9] rounded-[1rem] p-4 shadow-inner">
                  <Phone size={16} className="text-slate-400" />
                  {order.phone || 'No contact provided'}
                </div>
              </div>

              <div className="bg-white rounded-[1.5rem] shadow-[0_8px_24px_rgba(149,157,165,0.1)] p-8 border border-slate-50">
                <div className="mb-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#F1F5F9] shadow-inner flex items-center justify-center text-[#1E293B]">
                    <CalendarDays size={20} />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Schedule</p>
                    <h2 className="text-[#1E293B] font-semibold">Appointment Details</h2>
                  </div>
                </div>
                {order.proposal_status === 'PENDING' && (
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-amber-500 bg-amber-50 p-2 rounded-lg inline-block">
                    Awaiting Client Confirmation
                  </p>
                )}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span className="flex items-center gap-2"><CalendarDays size={14} className="text-slate-400"/> Date</span>
                    <span className="font-medium text-[#1E293B]">
                      {order.inquiry_status === 'PROPOSED' ? order.proposed_date : order.date ?? 'TBD'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span className="flex items-center gap-2"><Clock size={14} className="text-slate-400"/> Time</span>
                    <span className="font-medium text-[#1E293B]">
                      {order.inquiry_status === 'PROPOSED' ? order.proposed_time : order.time_slot ?? 'TBD'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-[1.5rem] shadow-[0_8px_24px_rgba(149,157,165,0.1)] p-8 border border-slate-50">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">Customer Notes</p>
              <p className="text-sm text-slate-500 leading-relaxed p-4 bg-[#F1F5F9] rounded-[1rem] shadow-inner">
                {order.message || 'No additional notes provided.'}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* Status Update */}
            <div className="bg-white rounded-[1.5rem] shadow-[0_8px_24px_rgba(149,157,165,0.1)] p-8 border border-slate-50">
              <h2 className="text-[#1E293B] font-semibold text-lg">Manage Status</h2>
              <p className="mt-1 text-sm text-slate-400 mb-6">Modify the order's current phase.</p>
              
              <div className="space-y-4">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full rounded-[1rem] border-none bg-[#F1F5F9] shadow-inner px-4 py-3.5 text-sm text-[#1E293B] outline-none focus:ring-2 focus:ring-slate-200 transition-all cursor-pointer"
                >
                  <option value="PENDING">Pending</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
                {updateError && <p className="text-[11px] font-semibold text-red-500 uppercase">{updateError}</p>}
                
                <button
                  type="button"
                  onClick={handleStatusUpdate}
                  disabled={updating || status === order.status}
                  className="w-full rounded-[1rem] bg-black px-4 py-3 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
                >
                  {updating ? 'Updating...' : 'Save Changes'}
                </button>
              </div>
            </div>

            {/* Assignment */}
            <div className="bg-white rounded-[1.5rem] shadow-[0_8px_24px_rgba(149,157,165,0.1)] p-8 border border-slate-50">
              <h2 className="text-[#1E293B] font-semibold text-lg">Delegation</h2>
              <p className="mt-1 text-sm text-slate-400 mb-6">Assign an internal staff member.</p>

              <div className="space-y-4">
                <select
                  value={selectedMemberId}
                  onChange={(e) => setSelectedMemberId(e.target.value)}
                  disabled={membersLoading}
                  className="w-full rounded-[1rem] border-none bg-[#F1F5F9] shadow-inner px-4 py-3.5 text-sm text-[#1E293B] outline-none focus:ring-2 focus:ring-slate-200 transition-all cursor-pointer disabled:opacity-70"
                >
                  <option value="">{membersLoading ? 'Loading roster...' : 'Select team member'}</option>
                  {members.map((member) => (
                    <option key={member.member_id} value={member.member_id}>
                      {member.first_name} {member.last_name}
                    </option>
                  ))}
                </select>

                {order.assigned_member_id && (
                  <div className="bg-blue-50 text-blue-600 rounded-[1rem] p-3 text-xs font-medium text-center">
                    Current: {order.assigned_member_id}
                  </div>
                )}
                {assignError && <p className="text-[11px] font-semibold text-red-500 uppercase">{assignError}</p>}
                
                <button
                  type="button"
                  onClick={handleAssignMember}
                  disabled={assigning || !selectedMemberId || selectedMemberId === order.assigned_member_id}
                  className="w-full rounded-[1rem] bg-black px-4 py-3 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
                >
                  {assigning ? 'Assigning...' : order.assigned_member_id ? 'Reassign Member' : 'Assign Member'}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}