// components/BookingSuccessModal.tsx
import { CheckCircle, X, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface BookingSuccessModalProps {
  data: { serviceName: string; businessName: string } | null;
  onClose: () => void;
}

export default function BookingSuccessModal({
  data,
  onClose,
}: BookingSuccessModalProps) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden flex flex-col text-center p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded-full transition"
        >
          <X size={20} />
        </button>

        <div className="mx-auto bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(52,211,153,0.2)]">
          <CheckCircle size={40} />
        </div>

        <h2 className="text-2xl font-bold text-slate-100 mb-2">
          Request Sent!
        </h2>

        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
          Your request for <span className="font-semibold text-slate-200">{data.serviceName}</span> with <span className="font-semibold text-slate-200">{data.businessName}</span> is pending. The provider will review it and confirm details shortly.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={onClose}
            className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 transition"
          >
            Done
          </button>

          <Link
            to="/customer/orders"
            className="w-full bg-slate-800 text-slate-300 py-3.5 rounded-xl font-semibold hover:bg-slate-700 transition flex items-center justify-center gap-2"
          >
            View My Orders <ExternalLink size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}