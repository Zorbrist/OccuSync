
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



  // ============================================================
  // ORDER DETAILS
  // ============================================================

  const {
    data: order,
    loading,
    error,
    fetchBusinessOrder,
  } = useBusinessOrder();

  // ============================================================
  // UPDATE ORDER STATUS
  // ============================================================

  const {
    loading: updating,
    error: updateError,
    updateOrderStatus,
  } = useUpdateBusinessOrderStatus();

  // ============================================================
  // BUSINESS MEMBERS
  // ============================================================

  const {
    data: members,
    loading: membersLoading,
    error: membersError,
    fetchBusinessMembers,
  } = useBusinessMembers();

  // ============================================================
  // ASSIGN ORDER MEMBER
  // ============================================================

  const {
    loading: assigning,
    error: assignError,
    assignMember,
  } = useAssignOrderMember();

  // ============================================================
  // STATE
  // ============================================================

  const [status, setStatus] = useState('');
  const [selectedMemberId, setSelectedMemberId] = useState('');

  // ============================================================
  // FETCH ORDER + MEMBERS
  // ============================================================

  useEffect(() => {
    if (!id) return;

    const orderId = Number(id);

    if (!Number.isNaN(orderId)) {
      fetchBusinessOrder(orderId);
      fetchBusinessMembers();
    }
  }, [id]);

  // ============================================================
  // SET ORDER STATE
  // ============================================================

  useEffect(() => {
    if (order) {
      setStatus(order.status);

      setSelectedMemberId(
        order.assigned_member_id || ''
      );
    }
  }, [order]);

  // ============================================================
  // UPDATE STATUS
  // ============================================================

  const handleStatusUpdate = async () => {
    if (!id || !status) return;

    try {
      await updateOrderStatus(
        Number(id),
        status
      );

      await fetchBusinessOrder(
        Number(id)
      );
    } catch {
      // Error is handled by the hook
    }
  };

  // ============================================================
  // ASSIGN MEMBER
  // ============================================================

  const handleAssignMember = async () => {
    if (!id || !selectedMemberId) return;

    try {
      await assignMember(
        Number(id),
        selectedMemberId
      );

      await fetchBusinessOrder(
        Number(id)
      );
    } catch {
      // Error is handled by the hook
    }
  };

  // ============================================================
  // FORMAT STATUS
  // ============================================================

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

  // ============================================================
  // STATUS BADGE STYLE
  // ============================================================

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

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-sm text-slate-500">
          Loading order details...
        </p>
      </div>
    );
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (error) {
    return (
      <div className="p-8">
        <button
          type="button"
          onClick={() =>
            navigate('/business/orders')
          }
          className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-rose-950"
        >
          <ArrowLeft size={18} />
          Back to Orders
        </button>

        <div className="rounded-3xl border border-red-100 bg-red-50 p-6">
          <p className="text-sm font-medium text-red-600">
            {error}
          </p>
        </div>
      </div>
    );
  }

  // ============================================================
  // ORDER NOT FOUND
  // ============================================================

  if (!order) {
    return (
      <div className="p-8">
        <button
          type="button"
          onClick={() =>
            navigate('/business/orders')
          }
          className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-rose-950"
        >
          <ArrowLeft size={18} />
          Back to Orders
        </button>

        <div className="rounded-3xl border border-rose-100 bg-white p-8 text-center">
          <p className="text-sm text-slate-500">
            Order not found.
          </p>
        </div>
      </div>
    );
  }

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <div className="p-8">

      {/* ========================================================
          HEADER
      ======================================================== */}

      <div className="mb-8">
        <button
          type="button"
          onClick={() =>
            navigate('/business/orders')
          }
          className="mb-5 flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-rose-950"
        >
          <ArrowLeft size={18} />
          Back to Orders
        </button>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <p className="text-sm font-semibold text-slate-400">
              Order #{order.id}
            </p>

            <h1 className="mt-1 text-3xl font-extrabold text-rose-950">
              Order Details
            </h1>
          </div>

          {order.status === 'PENDING' && (
            <div>
              <button
                onClick={() =>
                 
                    navigate(`/business/proposals?jobId=${order.id}`)
                  
                }
                disabled={
                  order.proposal_status === 'PENDING'
                }
                className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-rose-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-rose-900 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                <CalendarPlus size={16} />

                {order.proposal_status === 'PENDING'
                  ? 'Date Proposed'
                  : 'Propose Date'}
              </button>
            </div>
          )}

          <span
            className={`w-fit rounded-full px-4 py-2 text-sm font-bold ${getStatusStyle(
              order.status
            )}`}
          >
            {getStatusLabel(order.status)}
          </span>

        </div>
      </div>

      {/* ========================================================
          CONTENT
      ======================================================== */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* ======================================================
            MAIN INFORMATION
        ====================================================== */}

        <div className="space-y-6 lg:col-span-2">

          {/* ====================================================
              SERVICE
          ==================================================== */}

          <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-xl shadow-rose-950/5">

            <div className="mb-5 flex items-center gap-3">

              <div className="rounded-xl bg-rose-50 p-3 text-rose-950">
                <Wrench size={20} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase text-slate-400">
                  Service
                </p>

                <h2 className="text-xl font-bold text-slate-900">
                  {order.service_name}
                </h2>
              </div>

            </div>

            <p className="text-sm leading-6 text-slate-500">
              {order.service_description ||
                'No service description available.'}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

              <div className="rounded-2xl bg-slate-50 p-4">

                <p className="text-xs font-bold uppercase text-slate-400">
                  Service Price
                </p>

                <p className="mt-1 text-xl font-black text-rose-950">
                  RM
                  {Number(
                    order.base_price
                  ).toLocaleString()}
                </p>

              </div>

              <div className="rounded-2xl bg-slate-50 p-4">

                <p className="text-xs font-bold uppercase text-slate-400">
                  Service ID
                </p>

                <p className="mt-1 text-xl font-black text-slate-900">
                  #{order.service_id}
                </p>

              </div>

            </div>

          </div>

          {/* ====================================================
              CUSTOMER
          ==================================================== */}

          <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-xl shadow-rose-950/5">

            <div className="mb-5 flex items-center gap-3">

              <div className="rounded-xl bg-rose-50 p-3 text-rose-950">
                <User size={20} />
              </div>

              <div>

                <p className="text-xs font-bold uppercase text-slate-400">
                  Customer
                </p>

                <h2 className="text-xl font-bold text-slate-900">
                  {order.first_name}{' '}
                  {order.last_name}
                </h2>

              </div>

            </div>

            <div className="flex items-center gap-3 text-sm text-slate-600">

              <Phone
                size={17}
                className="text-slate-400"
              />

              {order.phone ||
                'No phone number available'}

            </div>

          </div>

          {/* ====================================================
              APPOINTMENT
          ==================================================== */}

          <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-xl shadow-rose-950/5">

            <div className="mb-5 flex items-center gap-3">

              <div className="rounded-xl bg-rose-50 p-3 text-rose-950">
                <CalendarDays size={20} />
              </div>

              <div>

                <p className="text-xs font-bold uppercase text-slate-400">
                  Appointment
                </p>

                <h2 className="text-xl font-bold text-slate-900">
                  Scheduled Service
                </h2>

              </div>

            </div>

            {order.proposal_status === 'PENDING' && (
              <p className="mt-1 text-sm font-medium text-amber-600">
                Date and time proposed. Waiting for customer confirmation.
              </p>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              <div className="rounded-2xl bg-slate-50 p-4">

                <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-400">

                  <CalendarDays size={15} />

                  Date

                </div>
                <p className="mt-2 text-sm font-semibold text-slate-800">
                  {order.inquiry_status === 'PROPOSED'
                    ? order.proposed_date
                    : order.date ?? 'To be decided'}
                </p>

              </div>

              <div className="rounded-2xl bg-slate-50 p-4">

                <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-400">

                  <Clock size={15} />

                  Time Slot

                </div>

                <p className="mt-2 text-sm font-semibold text-slate-800">
                  {order.inquiry_status === 'PROPOSED'
                    ? order.proposed_time
                    : order.time_slot ?? 'To be Decided'}
                </p>

              </div>

            </div>

          </div>

          {/* ====================================================
              CUSTOMER NOTES
          ==================================================== */}

          <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-xl shadow-rose-950/5">

            <p className="text-xs font-bold uppercase text-slate-400">
              Customer Notes
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              {order.message ||
                'No notes provided by the customer.'}
            </p>

          </div>

        </div>

        {/* ======================================================
            SIDEBAR
        ====================================================== */}

        <div className="space-y-6">

          {/* ====================================================
              UPDATE STATUS
          ==================================================== */}

          <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-xl shadow-rose-950/5">

            <h2 className="text-lg font-bold text-slate-900">
              Manage Order
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Update the current order status.
            </p>

            <label className="mt-5 block text-sm font-semibold text-slate-700">
              Order Status
            </label>

            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-rose-950"
            >
              <option value="PENDING">
                Pending
              </option>

              <option value="CONFIRMED">
                Confirmed
              </option>

              <option value="COMPLETED">
                Completed
              </option>

              <option value="CANCELLED">
                Cancelled
              </option>
            </select>

            {updateError && (
              <p className="mt-3 text-sm text-red-600">
                {updateError}
              </p>
            )}

            <button
              type="button"
              onClick={handleStatusUpdate}
              disabled={
                updating ||
                status === order.status
              }
              className="mt-4 w-full rounded-xl bg-rose-950 px-4 py-3 text-sm font-bold text-white hover:bg-rose-900 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {updating
                ? 'Updating...'
                : 'Update Status'}
            </button>

          </div>

          {/* ====================================================
              ASSIGNED MEMBER
          ==================================================== */}

          <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-xl shadow-rose-950/5">

            <p className="text-xs font-bold uppercase text-slate-400">
              Assigned Member
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Select a staff member to handle this order.
            </p>

            {/* Members error */}

            {membersError && (
              <p className="mt-3 text-sm text-red-600">
                {membersError}
              </p>
            )}

            {/* Member dropdown */}

            <select
              value={selectedMemberId}
              onChange={(event) =>
                setSelectedMemberId(
                  event.target.value
                )
              }
              disabled={membersLoading}
              className="mt-4 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-rose-950 disabled:bg-slate-100"
            >

              <option value="">
                {membersLoading
                  ? 'Loading members...'
                  : 'Select a member'}
              </option>

              {members.map((member) => (
                <option
                  key={member.member_id}
                  value={member.member_id}
                >
                  {member.first_name}{' '}
                  {member.last_name}
                </option>
              ))}

            </select>

            {/* Current assignment */}

            {order.assigned_member_id && (
              <p className="mt-3 text-xs text-slate-500">
                Currently assigned to member{' '}
                <span className="font-semibold text-slate-700">
                  {order.assigned_member_id}
                </span>
              </p>
            )}

            {/* Assignment error */}

            {assignError && (
              <p className="mt-3 text-sm text-red-600">
                {assignError}
              </p>
            )}

            {/* Assign button */}

            <button
              type="button"
              onClick={handleAssignMember}
              disabled={
                assigning ||
                !selectedMemberId ||
                selectedMemberId ===
                order.assigned_member_id
              }
              className="mt-4 w-full rounded-xl bg-rose-950 px-4 py-3 text-sm font-bold text-white hover:bg-rose-900 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {assigning
                ? 'Assigning...'
                : order.assigned_member_id
                  ? 'Reassign Member'
                  : 'Assign Member'}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
