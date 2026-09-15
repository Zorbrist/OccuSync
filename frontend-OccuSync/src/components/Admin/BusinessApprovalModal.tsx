import { useState } from "react";
import type { PendingBusiness } from "../../types/adminType";
import { updateBusinessStatus } from "../../services/adminService";

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-xl border border-zinc-800 bg-zinc-950 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-zinc-100">
              Business Details
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Review this business registration
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-2xl text-zinc-500 hover:text-zinc-200"
          >
            ×
          </button>
        </div>

        {/* Details */}
        <div className="space-y-4 px-6 py-5">
          <div>
            <p className="text-xs uppercase text-zinc-500">
              Business Name
            </p>

            <p className="mt-1 text-sm text-zinc-100">
              {business.name}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase text-zinc-500">
              Registration No.
            </p>

            <p className="mt-1 text-sm text-zinc-300">
              {business.registration_no}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase text-zinc-500">
              Industry
            </p>

            <p className="mt-1 text-sm text-zinc-300">
              {business.industry}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase text-zinc-500">
              Email
            </p>

            <p className="mt-1 text-sm text-zinc-300">
              {business.email}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase text-zinc-500">
              Phone
            </p>

            <p className="mt-1 text-sm text-zinc-300">
              {business.phone}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase text-zinc-500">
              Location
            </p>

            <p className="mt-1 text-sm text-zinc-300">
              {business.state}, {business.postcode},{" "}
              {business.country}
            </p>
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 border-t border-zinc-800 px-6 py-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-900 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={() => handleStatusChange("REJECTED")}
            disabled={loading}
            className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/20 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Reject"}
          </button>

          <button
            onClick={() => handleStatusChange("APPROVED")}
            disabled={loading}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Approve"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessApprovalModal;