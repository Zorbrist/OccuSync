// components/ConfirmBookingModal.tsx
import { Sparkles } from 'lucide-react';

interface ConfirmBookingModalProps {
  isOpen: boolean;
  serviceName?: string;
  businessName?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export default function ConfirmBookingModal({ isOpen, serviceName, businessName, onConfirm, onCancel, isSubmitting }: ConfirmBookingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden flex flex-col p-8 text-center transform transition-all">
        
        <div className="mx-auto bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
          <Sparkles size={32} />
        </div>

        <h3 className="text-2xl font-semibold text-slate-100 mb-2">Request Service?</h3>
        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          You are about to request <strong className="text-slate-200">{serviceName}</strong> from <strong className="text-slate-200">{businessName}</strong>. The provider will contact you to finalize the schedule.
        </p>

        <div className="flex gap-3">
          <button 
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1 bg-slate-800 text-slate-300 py-3 rounded-xl text-sm font-semibold hover:bg-slate-700 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            disabled={isSubmitting}
            className="flex-1 bg-indigo-600 text-white py-3 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 transition disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {isSubmitting ? 'Sending...' : 'Confirm'}
          </button>
        </div>
        
      </div>
    </div>
  );
}