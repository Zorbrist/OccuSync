// components/ConfirmBookingModal.tsx
import { useState } from 'react';
import { Sparkles, X } from 'lucide-react';

interface ConfirmBookingModalProps {
  isOpen: boolean;
  serviceName?: string;
  businessName?: string;
  onConfirm: (message: string) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export default function ConfirmBookingModal({
  isOpen,
  serviceName,
  businessName,
  onConfirm,
  onCancel,
  isSubmitting
}: ConfirmBookingModalProps) {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!message.trim()) {
      setError('Please provide a brief explanation before requesting.');
      return;
    }
    setError('');
    onConfirm(message.trim());
  };

  const handleCancel = () => {
    setError('');
    setMessage('');
    onCancel();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-white rounded-[2rem] w-full max-w-sm shadow-[0_20px_60px_rgba(0,0,0,0.15)] flex flex-col p-8 text-center animate-in zoom-in-95 duration-200 relative">
        
        <button
          onClick={handleCancel}
          disabled={isSubmitting}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-black hover:bg-slate-100 transition-colors disabled:opacity-50"
        >
          <X size={16} />
        </button>

        <div className="mx-auto bg-violet-50 border border-violet-100 text-violet-600 w-16 h-16 rounded-full flex items-center justify-center mb-5">
          <Sparkles size={24} />
        </div>

        <h3 className="text-xl font-bold text-[#0F172A] mb-2">Request Service?</h3>
        <p className="text-slate-500 text-sm mb-6 leading-relaxed font-medium">
          You are requesting <strong className="text-[#0F172A]">{serviceName}</strong> from <strong className="text-[#0F172A]">{businessName}</strong>. They will contact you to finalize.
        </p>

        {/* Message Input */}
        <div className="mb-8 text-left">
          <label htmlFor="booking-message" className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">
            Explain the issue <span className="text-red-500">*</span>
          </label>
          <textarea
            id="booking-message"
            rows={3}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (error) setError('');
            }}
            disabled={isSubmitting}
            placeholder="e.g., Preferred time, gate codes..."
            className={`w-full bg-slate-50 border ${
              error ? 'border-red-400 focus:border-red-500 focus:ring-red-50' : 'border-slate-200 focus:border-violet-500 focus:ring-violet-50'
            } rounded-xl p-3 text-sm text-[#0F172A] outline-none focus:ring-4 transition-all resize-none disabled:opacity-50 font-medium`}
          />
          {error && <p className="text-xs text-red-500 mt-2 font-semibold">{error}</p>}
        </div>

        <div className="flex gap-3">
          <button 
            onClick={handleCancel}
            disabled={isSubmitting}
            className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-slate-200 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="flex-1 bg-[#0F172A] text-white py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-md hover:bg-black hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:shadow-none disabled:transform-none"
          >
            {isSubmitting ? 'Sending...' : 'Confirm'}
          </button>
        </div>
        
      </div>
    </div>
  );
}