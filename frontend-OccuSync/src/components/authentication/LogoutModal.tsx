// components/authentication/LogoutModal.tsx
import { LogOut, X } from 'lucide-react';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white border border-white rounded-[2rem] w-full max-w-sm shadow-[0_20px_60px_rgba(0,0,0,0.15)] flex flex-col text-center p-8 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#0F172A] hover:bg-slate-100 transition-colors"
        >
          <X size={16} />
        </button>

        {/* Icon Container */}
        <div className="mx-auto bg-red-50 border border-red-100 text-red-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-sm">
          <LogOut size={24} className="ml-1" /> {/* Added slight left margin to visually center the door exit icon */}
        </div>

        {/* Text Content */}
        <h3 className="text-xl font-bold text-[#0F172A] mb-2">
          Log Out
        </h3>
        
        <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium">
          Are you sure you want to log out of your account? You will need to log in again to access your dashboard.
        </p>
        
        {/* Actions */}
        <div className="flex gap-3">
          <button 
            onClick={onClose} 
            className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-full text-[11px] font-bold uppercase tracking-wider hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          
          <button 
            onClick={onConfirm} 
            className="flex-1 bg-red-50 text-red-600 border border-red-100 py-3 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm hover:bg-red-100 transition-all hover:-translate-y-0.5"
          >
            Log Out
          </button>
        </div>
        
      </div>
    </div>
  );
}