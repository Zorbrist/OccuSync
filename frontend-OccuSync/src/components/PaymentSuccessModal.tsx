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

        <h2 className="text-xl font-bold text-[#0F172A] mb-2">
          Payment Successful!
        </h2>

        <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">
          Your payment of <strong className="text-[#0F172A]">RM {Number(amount).toFixed(2)}</strong> has been processed. The invoice is now marked as paid.
        </p>

        <button
          onClick={onClose}
          className="w-full bg-[#0F172A] text-white py-3.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md hover:bg-black hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
        >
          <Receipt size={14} /> View My Invoices
        </button>
      </div>
    </div>
  );
} 