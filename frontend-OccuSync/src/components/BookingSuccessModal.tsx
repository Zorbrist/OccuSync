// components/BookingSuccessModal.tsx
import { CheckCircle, X, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface BookingSuccessModalProps {
  data: { serviceName: string; businessName: string } | null;
  onClose: () => void;
}

export default function BookingSuccessModal({ data, onClose }: BookingSuccessModalProps) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-white rounded-[2rem] w-full max-w-sm shadow-[0_20px_60px_rgba(0,0,0,0.15)] flex flex-col text-center p-8 relative animate-in zoom-in-95 duration-200">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-black hover:bg-slate-100 transition-colors"
        >
          <X size={16} />
        </button>

        <div className="mx-auto bg-emerald-50 border border-emerald-100 text-emerald-500 w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-sm">
          <CheckCircle size={32} />
        </div>

        <h2 className="text-2xl font-bold text-[#0F172A] mb-2">
          Request Sent!
        </h2>

        <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium">
          Your request for <strong className="text-[#0F172A]">{data.serviceName}</strong> with <strong className="text-[#0F172A]">{data.businessName}</strong> is pending. The provider will review it shortly.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={onClose}
            className="w-full bg-[#0F172A] text-white py-3.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md hover:bg-black hover:-translate-y-0.5 transition-all"
          >
            Done
          </button>

          <Link
            to="/customer/orders"
            className="w-full bg-slate-50 border border-slate-200 text-slate-600 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
          >
            View My Orders <ExternalLink size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}