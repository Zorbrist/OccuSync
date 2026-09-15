import { useState } from "react";
import {
  X,
  Calendar,
  Clock,
  Briefcase,
  FileText,
  Hash,
} from "lucide-react";
import type { OrderResponse } from "../types/customerType";
import { updateProposalStatus } from "../services/customerService";

interface OrderDetailsModalProps {
  order: OrderResponse;
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderDetailsModal({
  order,
  isOpen,
  onClose,
}: OrderDetailsModalProps) {
  if (!isOpen) return null;

  const [isUpdatingProposal, setIsUpdatingProposal] = useState(false);
  const [proposalError, setProposalError] = useState("");

  const handleProposalStatus = async (
    status: "ACCEPTED" | "REJECTED"
  ) => {
    if (!order.proposal_id) return;

    setIsUpdatingProposal(true);
    setProposalError("");

    try {
      await updateProposalStatus(order.proposal_id, status);

      onClose();
    } catch (error: any) {
      setProposalError(
        error.response?.data?.message ||
        error.message ||
        "Failed to update proposal."
      );
    } finally {
      setIsUpdatingProposal(false);
    }
  };

  const getStatusStyle = (status: OrderResponse["status"]) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";

      case "CONFIRMED":
        return "bg-sky-500/10 text-sky-400 border-sky-500/20";

      case "COMPLETED":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";

      case "CANCELLED":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";

      default:
        return "bg-slate-800 text-slate-300 border-slate-700";
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "To be determined";

    return new Date(dateString).toLocaleDateString("en-MY", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatStatus = (status: OrderResponse["status"]) => {
    return status.replace("_", " ");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-6">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-full">

        {/* Header */}
        <div className="p-6 md:p-8 border-b border-slate-800 bg-slate-950/30 flex justify-between items-start shrink-0">

          <div className="flex gap-4 items-start">

            <div className="w-14 h-14 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 shrink-0">
              <Briefcase size={28} />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3 mb-1">

                <h2 className="text-2xl font-semibold text-slate-100 tracking-tight">
                  Order #{order.id}
                </h2>

                <span
                  className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border ${getStatusStyle(
                    order.status
                  )}`}
                >
                  {formatStatus(order.status)}
                </span>

              </div>

              <p className="text-sm font-medium text-slate-500">
                Service Order
              </p>
            </div>

          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
          >
            <X size={20} />
          </button>

        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6 overflow-y-auto">

          {/* Service Details */}
          <div className="p-5 bg-slate-950/50 border border-slate-800/50 rounded-2xl">

            <div className="flex items-center gap-3 mb-4">
              <FileText size={16} className="text-indigo-400" />

              <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
                Service Details
              </h3>
            </div>

            <div className="mb-4 pb-4 border-b border-slate-800/50">

              <p className="text-lg font-semibold text-slate-100 mb-2">
                {order.service_name || "Service Request"}
              </p>

              <p className="text-sm text-slate-500 leading-relaxed">
                {order.service_description ||
                  "No service description available."}
              </p>

            </div>

            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">
                Service ID
              </p>

              <p className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Hash size={14} className="text-indigo-400" />
                {order.service_id}
              </p>
            </div>

          </div>

          {/* Provider */}
          <div className="p-5 bg-slate-950/50 border border-slate-800/50 rounded-2xl">

            <div className="flex items-center gap-3 mb-4">
              <Briefcase size={16} className="text-indigo-400" />

              <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
                Service Provider
              </h3>
            </div>

            <p className="text-lg font-bold text-slate-100">
              {order.business_name || "Provider not assigned"}
            </p>

          </div>

          {/* Schedule */}
          <div className="p-5 bg-slate-950/50 border border-slate-800/50 rounded-2xl">

            <div className="flex items-center gap-3 mb-4">
              <Calendar size={16} className="text-indigo-400" />

              <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
                Schedule
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Date */}
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-2">
                  Service Date
                </p>

                <p
                  className={`text-sm font-semibold flex items-center gap-2 ${order.date ? "text-slate-300" : "text-slate-500"
                    }`}
                >
                  <Calendar size={14} className="text-indigo-400" />
                  {formatDate(order.date)}
                </p>
              </div>

              {/* Time */}
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-2">
                  Time Slot
                </p>

                <p
                  className={`text-sm font-semibold flex items-center gap-2 ${order.date ? "text-slate-300" : "text-slate-500"
                    }`}
                >
                  <Clock size={14} className="text-indigo-400" />

                  {order.time_slot || "To be determined"}
                </p>
              </div>

            </div>

          </div>

          {/* Proposal */}
          {order.proposal_status === "PENDING" && order.proposal_id && (
            <div className="p-5 bg-amber-500/5 border border-amber-500/20 rounded-2xl">

              <div className="flex items-center gap-3 mb-4">
                <Calendar size={16} className="text-amber-400" />

                <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
                  Proposed Schedule
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Proposed Date */}
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-2">
                    Proposed Date
                  </p>

                  <p className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <Calendar size={14} className="text-amber-400" />
                    {formatDate(order.proposed_date)}
                  </p>
                </div>

                {/* Proposed Time */}
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-2">
                    Proposed Time
                  </p>

                  <p className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <Clock size={14} className="text-amber-400" />
                    {order.proposed_time || "Not specified"}
                  </p>
                </div>

              </div>

              {/* Message */}
              {order.message && (
                <div className="mt-4 pt-4 border-t border-amber-500/10">
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-2">
                    Message from Provider
                  </p>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {order.message}
                  </p>
                </div>
              )}

              {/* Notes */}
              {order.proposal_notes && (
                <div className="mt-4">
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-2">
                    Notes
                  </p>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {order.proposal_notes}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 mt-5">

                {/* Actions */}
                {proposalError && (
                  <p className="mt-4 text-sm text-rose-400">
                    {proposalError}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-3 mt-5">

                  <button
                    type="button"
                    disabled={isUpdatingProposal}
                    onClick={() => handleProposalStatus("ACCEPTED")}
                    className="flex-1 bg-emerald-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-emerald-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpdatingProposal ? "Updating..." : "Approve"}
                  </button>

                  <button
                    type="button"
                    disabled={isUpdatingProposal}
                    onClick={() => handleProposalStatus("REJECTED")}
                    className="flex-1 bg-rose-500/10 text-rose-400 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-rose-500/20 border border-rose-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpdatingProposal ? "Updating..." : "Decline"}
                  </button>

                </div>

              </div>

            </div>
          )}

          {/* Order Information */}
          <div className="p-5 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl">

            <div className="flex items-center gap-3 mb-4">
              <Hash size={16} className="text-indigo-400" />

              <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
                Order Information
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">

              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">
                  Order ID
                </p>

                <p className="text-sm font-semibold text-slate-300">
                  #{order.id}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">
                  Status
                </p>

                <p className="text-sm font-semibold text-slate-300">
                  {formatStatus(order.status)}
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800 bg-slate-950/30 flex justify-end shrink-0">

          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-slate-800 text-slate-200 px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-700 hover:text-white transition-all duration-200 border border-slate-700"
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
}