// components/Admin/BusinessApprovalModal.tsx
import { useState } from "react";
import type { PendingBusiness } from "../../types/adminType";
import { updateBusinessStatus } from "../../services/adminService";
import { X, Building2, Hash, Briefcase, Mail, Phone, MapPin, AlertCircle } from "lucide-react";

type BusinessApprovalModalProps = {
  business: PendingBusiness;
  onClose: () => void;
  onStatusUpdated: (
    id: string,
    status: "APPROVED" | "REJECTED"
  ) => void;
};

const BusinessApprovalModal = ({
  business,
  onClose,
  onStatusUpdated,
}: BusinessApprovalModalProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStatusChange = async (
    status: "APPROVED" | "REJECTED"
  ) => {
    try {
      setLoading(true);
      setError(null);

      await updateBusinessStatus(business.id, status);

      onStatusUpdated(business.id, status);
      onClose();
    } catch (err) {
      console.error("Failed to update business status:", err);
      setError("Failed to update business status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-[2rem] border border-white bg-white shadow-[0_20px_60px_rgba(0,0,0,0.1)] overflow-hidden scale-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-8 py-6 bg-[#F1F5F9]/50">
          <div>
            <h2 className="text-xl font-bold text-[#0F172A]">
              Review Registration
            </h2>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Business Entity Details
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-black hover:bg-slate-50 transition-all border border-slate-100"
          >
            <X size={16} />
          </button>
        </div>

        {/* Details Grid */}
        <div className="px-8 py-7 space-y-6">
          
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
               <Building2 size={18} className="text-slate-500" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Business Name</p>
              <p className="text-base font-bold text-[#1E293B]">{business.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
                 <Hash size={18} className="text-slate-500" />
              </div>
              <div className="overflow-hidden">
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Reg No.</p>
                <p className="text-sm font-semibold text-[#1E293B] truncate">{business.registration_no || "N/A"}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
                 <Briefcase size={18} className="text-slate-500" />
              </div>
              <div className="overflow-hidden">
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Industry</p>
                <p className="text-sm font-semibold text-[#1E293B] truncate">{business.industry}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
                 <Mail size={18} className="text-slate-500" />
              </div>
              <div className="overflow-hidden">
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Email</p>
                <p className="text-sm font-semibold text-[#1E293B] truncate" title={business.email}>{business.email}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
                 <Phone size={18} className="text-slate-500" />
              </div>
              <div className="overflow-hidden">
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Phone</p>
                <p className="text-sm font-semibold text-[#1E293B] truncate">{business.phone}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
               <MapPin size={18} className="text-slate-500" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Registered Location</p>
              <p className="text-sm font-semibold text-[#1E293B]">
                {business.state}, {business.postcode}, {business.country}
              </p>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              <AlertCircle size={16} />
              {error}
            </div>
          )}
        </div>

        {/* Actions Footer */}
        <div className="flex justify-end gap-3 border-t border-slate-100 px-8 py-5 bg-slate-50/50">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#0F172A] hover:bg-slate-200 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={() => handleStatusChange("REJECTED")}
            disabled={loading}
            className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-100 hover:bg-red-100 transition-colors disabled:opacity-50"
          >
            {loading ? "Processing..." : "Reject"}
          </button>

          <button
            onClick={() => handleStatusChange("APPROVED")}
            disabled={loading}
            className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#0F172A] hover:bg-black shadow-md transition-all disabled:opacity-50 disabled:shadow-none"
          >
            {loading ? "Processing..." : "Approve"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessApprovalModal;