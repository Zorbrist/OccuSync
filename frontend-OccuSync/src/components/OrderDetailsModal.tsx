// components/OrderDetailsModal.tsx
import { useState } from "react";
import { X, Calendar, Clock, Briefcase, FileText, MessageSquare } from "lucide-react";
import type { OrderResponse } from "../types/customerType";
import { updateProposalStatus } from "../services/customerService";

interface OrderDetailsModalProps {
  order: OrderResponse;
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderDetailsModal({ order, isOpen, onClose }: OrderDetailsModalProps) {
  if (!isOpen) return null;

  const [isUpdatingProposal, setIsUpdatingProposal] = useState(false);
  const [proposalError, setProposalError] = useState("");

  const handleProposalStatus = async (status: "ACCEPTED" | "REJECTED") => {
    if (!order.proposal_id) return;
    setIsUpdatingProposal(true);
    setProposalError("");

    try {
      await updateProposalStatus(order.proposal_id, status);
      onClose();
    } catch (error: any) {
      setProposalError(error.response?.data?.message || error.message || "Failed to update proposal.");
    } finally {
      setIsUpdatingProposal(false);
    }
  };

  const getStatusStyle = (status: OrderResponse["status"]) => {
    switch (status) {
      case "PENDING": return "bg-amber-50 text-amber-500 border-amber-100";
      case "CONFIRMED": return "bg-violet-50 text-violet-600 border-violet-200";
      case "COMPLETED": return "bg-emerald-50 text-emerald-500 border-emerald-100";
      case "CANCELLED": return "bg-red-50 text-red-500 border-red-100";
      default: return "bg-slate-50 text-slate-500 border-slate-200";
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "TBD";
    return new Date(dateString).toLocaleDateString("en-MY", { year: "numeric", month: "short", day: "numeric" });
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        // Reduced from max-w-2xl to max-w-lg for a much tighter, more compact layout
        className="bg-white border border-white rounded-[2rem] w-full max-w-lg shadow-[0_20px_60px_rgba(0,0,0,0.15)] flex flex-col max-h-[85vh] animate-in zoom-in-95 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-[#F1F5F9]/50 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2.5">
              Order #{order.id}
              <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider border shadow-sm ${getStatusStyle(order.status)}`}>
                {order.status.replace("_", " ")}
              </span>
            </h2>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-black hover:bg-slate-50 transition-all border border-slate-100">
            <X size={14} />
          </button>
        </div>

        {/* Scrollable Body - Reduced padding and gaps */}
        <div className="px-6 py-5 space-y-4 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">

          {/* Combined Service & Provider Block */}
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-[1.25rem]">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                  <FileText size={12} /> Service
                </p>
                <p className="text-sm font-black text-[#0F172A] leading-tight">{order.service_name || "Service Request"}</p>
                <p className="text-[10px] font-semibold text-slate-500 mt-0.5">ID: #{order.service_id}</p>
              </div>
              
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                  <Briefcase size={12} /> Provider
                </p>
                <p className="text-sm font-black text-[#0F172A] leading-tight">{order.business_name || "Unassigned"}</p>
              </div>
            </div>

            {order.service_description && (
              <div className="mt-3 pt-3 border-t border-slate-200/60">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <MessageSquare size={12} /> Description
                </p>
                <p className="text-xs font-medium text-slate-600 leading-relaxed">
                  {order.service_description}
                </p>
              </div>
            )}
          </div>

          {/* Standard Schedule (Shown if not pending proposal) */}
          {order.proposal_status !== "PENDING" && (
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-[1.25rem]">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5 border-b border-slate-200/60 pb-2">
                <Calendar size={12} /> Approved Schedule
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Date</p>
                  <p className={`text-sm font-bold flex items-center gap-1.5 ${order.date ? "text-[#0F172A]" : "text-slate-400 italic"}`}>
                    <Calendar size={12} className={order.date ? "text-violet-500" : "text-slate-300"} />
                    {formatDate(order.date)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Time Slot</p>
                  <p className={`text-sm font-bold flex items-center gap-1.5 ${order.date ? "text-[#0F172A]" : "text-slate-400 italic"}`}>
                    <Clock size={12} className={order.date ? "text-violet-500" : "text-slate-300"} />
                    {order.time_slot || "TBD"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Actionable Proposal Block */}
          {order.proposal_status === "PENDING" && order.proposal_id && (
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-[1.25rem] shadow-sm">
              <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-3 flex items-center gap-1.5 border-b border-amber-200/60 pb-2">
                <Calendar size={12} /> Provider Proposed Schedule
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-[10px] font-bold text-amber-600/70 uppercase tracking-widest mb-0.5">Date</p>
                  <p className="text-sm font-black text-[#0F172A] flex items-center gap-1.5">
                    <Calendar size={12} className="text-amber-500" /> {formatDate(order.proposed_date)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-amber-600/70 uppercase tracking-widest mb-0.5">Time</p>
                  <p className="text-sm font-black text-[#0F172A] flex items-center gap-1.5">
                    <Clock size={12} className="text-amber-500" /> {order.proposed_time || "Not specified"}
                  </p>
                </div>
              </div>

              {(order.message || order.proposal_notes) && (
                <div className="mb-4 bg-white p-3 rounded-xl border border-amber-100">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Provider Notes</p>
                  <p className="text-xs font-medium text-slate-600 leading-relaxed">
                    {order.message || order.proposal_notes}
                  </p>
                </div>
              )}

              {proposalError && <p className="mb-3 text-[11px] font-bold text-red-500 text-center">{proposalError}</p>}

              <div className="flex gap-2.5">
                <button
                  type="button"
                  disabled={isUpdatingProposal}
                  onClick={() => handleProposalStatus("REJECTED")}
                  className="flex-1 bg-white text-red-600 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider border border-red-200 hover:bg-red-50 transition-colors disabled:opacity-50"
                >
                  Decline
                </button>
                <button
                  type="button"
                  disabled={isUpdatingProposal}
                  onClick={() => handleProposalStatus("ACCEPTED")}
                  className="flex-1 bg-[#0F172A] text-white py-2 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-md hover:bg-black hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:transform-none"
                >
                  {isUpdatingProposal ? "Updating..." : "Accept"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-white text-slate-600 px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider hover:bg-slate-100 transition-colors border border-slate-200 shadow-sm"
          >
            Close Details
          </button>
        </div>

      </div>
    </div>
  );
}