import { LogOut, X } from 'lucide-react';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={20} />
        </button>
        
        <div className="flex flex-col items-center text-center mt-2">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
            <LogOut size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Log Out</h3>
          <p className="text-gray-500 text-sm mb-6">
            Are you sure you want to log out of your account? You will need to log in again to access your dashboard.
          </p>
          
          <div className="flex gap-3 w-full">
            <button 
              onClick={onClose} 
              className="flex-1 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm} 
              className="flex-1 py-2.5 bg-red-600 rounded-xl text-white font-semibold hover:bg-red-700 transition"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
