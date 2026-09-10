
import { AlertCircle } from 'lucide-react';

interface ConfirmBookingModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export default function ConfirmBookingModal({ isOpen, onConfirm, onCancel, isSubmitting }: ConfirmBookingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden flex flex-col p-6 text-center transform transition-all scale-100 opacity-100">
        
        <div className="mx-auto bg-blue-50 text-[#233876] w-16 h-16 rounded-full flex items-center justify-center mb-4">
          <AlertCircle size={32} />
        </div>

        <h3 className="text-xl font-extrabold text-gray-900 mb-2">Confirm Request</h3>
        <p className="text-gray-500 text-sm mb-6">
          Are you sure you want to submit this service request? The service provider will be notified.
        </p>

        <div className="flex gap-3">
          <button 
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-200 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            disabled={isSubmitting}
            className="flex-1 bg-[#233876] text-white py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-blue-800 transition disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {isSubmitting ? 'Confirming...' : 'Yes, Book It'}
          </button>
        </div>
        
      </div>
    </div>
  );
}