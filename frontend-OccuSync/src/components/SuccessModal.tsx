import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ 
  isOpen, 
  title = "Registration Successful!", 
  message = "Welcome to OccuSync. Your account has been created successfully." 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 transition-opacity">
      <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl transform transition-all text-center">
        
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
          <CheckCircle className="h-10 w-10 text-green-500" />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {title}
        </h3>
        
        <p className="text-gray-500 mb-8">
          {message}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="flex-1 flex justify-center items-center py-3 px-4 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all"
          >
            Back to Home
          </Link>
          
          <Link 
            to="/login" 
            className="flex-1 flex justify-center items-center py-3 px-4 rounded-xl bg-[#1a0bba] text-white font-semibold hover:bg-[#140899] shadow-md transition-all"
          >
            Go to Login
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default SuccessModal;