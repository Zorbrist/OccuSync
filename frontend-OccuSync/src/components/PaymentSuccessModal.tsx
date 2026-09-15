// components/PaymentSuccessModal.tsx
import { CheckCircle, X, Receipt } from "lucide-react";

interface PaymentSuccessModalProps {
  isOpen: boolean;
  amount?: string | number;
  onClose: () => void;
}

export default function PaymentSuccessModal({ isOpen, amount, onClose }: PaymentSuccessModalProps) {
  if (!isOpen) return null;

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
          Payment Successful!
        </h2>

        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          Your payment of <strong className="text-slate-200">RM {Number(amount).toFixed(2)}</strong> has been processed successfully. The invoice is now marked as paid.
        </p>

        <button
          onClick={onClose}
          className="w-full bg-emerald-600 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-emerald-500/20 hover:bg-emerald-500 transition flex items-center justify-center gap-2"
        >
          <Receipt size={18} /> View My Invoices
        </button>
      </div>
    </div>
  );
}