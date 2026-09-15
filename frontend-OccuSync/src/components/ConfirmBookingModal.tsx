// components/ConfirmBookingModal.tsx
import { useState } from 'react';
import { Sparkles } from 'lucide-react';

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
    // 1. Check if the message is empty or just whitespace
    if (!message.trim()) {
      setError('Please enter a message before requesting this service.');
      return;
    }

    // Clear any previous error and proceed
    setError('');
    onConfirm(message.trim());
  };

  const handleCancel = () => {
    setError('');
    setMessage('');
    onCancel();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden flex flex-col p-8 text-center transform transition-all">
        
        <div className="mx-auto bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
          <Sparkles size={32} />
        </div>

        <h3 className="text-2xl font-semibold text-slate-100 mb-2">Request Service?</h3>
        <p className="text-slate-400 text-sm mb-4 leading-relaxed">
          You are about to request <strong className="text-slate-200">{serviceName}</strong> from <strong className="text-slate-200">{businessName}</strong>. The provider will contact you to finalize the schedule.
        </p>

        {/* Message Input */}
        <div className="mb-6 text-left">
          <label htmlFor="booking-message" className="block text-xs font-medium text-slate-400 mb-1.5">
            PLease explain the issue <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="booking-message"
            rows={3}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (error) setError(''); // Clear error as soon as user types
            }}
            disabled={isSubmitting}
            placeholder="e.g., Preferred time, gate codes, or specific requests..."
            className={`w-full bg-slate-800 border ${
              error ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : 'border-slate-700 focus:border-indigo-500 focus:ring-indigo-500'
            } rounded-xl p-3 text-slate-200 text-sm placeholder-slate-500 focus:outline-none focus:ring-1 transition resize-none disabled:opacity-50`}
          />
          {/* Validation Error Message */}
          {error && (
            <p className="text-xs text-rose-500 mt-1.5 font-medium">{error}</p>
          )}
        </div>

        <div className="flex gap-3">
          <button 
            onClick={handleCancel}
            disabled={isSubmitting}
            className="flex-1 bg-slate-800 text-slate-300 py-3 rounded-xl text-sm font-semibold hover:bg-slate-700 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            onClick={handleConfirm}
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