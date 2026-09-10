import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, User, X } from 'lucide-react';

interface SelectProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SelectProfileModal: React.FC<SelectProfileModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="px-8 pt-8 pb-4 text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-2">
            Choose Profile Type
          </h2>
          <p className="text-gray-500 text-sm">
            Select how you would like to register with OccuSync
          </p>
        </div>

        {/* Selection Cards */}
        <div className="px-8 pb-8 pt-4 grid grid-cols-1 gap-4">
          
          {/* Customer Option */}
          <Link
            to="/register/customer"
            onClick={onClose}
            className="group flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-100 bg-gray-50/50 hover:bg-white hover:border-[#1a0bba] hover:shadow-md transition-all"
          >
            <div className="p-3.5 bg-blue-50 text-[#1a0bba] rounded-xl group-hover:bg-[#1a0bba] group-hover:text-white transition-colors">
              <User className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-gray-900 group-hover:text-[#1a0bba] transition-colors">
                Customer Account
              </h3>
              <p className="text-xs text-gray-500">
                Book services and track active requests
              </p>
            </div>
          </Link>

          {/* Business Option */}
          <Link
            to="/register/business"
            onClick={onClose}
            className="group flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-100 bg-gray-50/50 hover:bg-white hover:border-[#1a0bba] hover:shadow-md transition-all"
          >
            <div className="p-3.5 bg-blue-50 text-[#1a0bba] rounded-xl group-hover:bg-[#1a0bba] group-hover:text-white transition-colors">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-gray-900 group-hover:text-[#1a0bba] transition-colors">
                Business Account
              </h3>
              <p className="text-xs text-gray-500">
                Offer services, manage team and operations
              </p>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default SelectProfileModal;