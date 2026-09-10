import React from "react";
import { CheckCircle, X, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link for client-side routing

interface BookingSuccessModalProps {
  data: { serviceName: string; businessName: string } | null;
  onClose: () => void;
}

export default function BookingSuccessModal({
  data,
  onClose,
}: BookingSuccessModalProps) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl border border-gray-100 overflow-hidden flex flex-col text-center p-8 relative transform transition-all scale-100 opacity-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition"
        >
          <X size={20} />
        </button>

        <div className="mx-auto bg-green-100 text-green-600 w-20 h-20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={40} />
        </div>

        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
          Booking Confirmed!
        </h2>

        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          Your request for{" "}
          <span className="font-bold text-gray-800">{data.serviceName}</span>{" "}
          with{" "}
          <span className="font-bold text-gray-800">{data.businessName}</span>{" "}
          has been successfully placed. They will review your request shortly.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={onClose}
            className="w-full bg-[#233876] text-white py-3.5 rounded-xl font-bold shadow-md hover:bg-blue-800 transition"
          >
            Done
          </button>

          {/* Changed from <a> to <Link> to enable smooth SPA routing */}
          <Link
            to="/customerOrders"
            className="w-full bg-gray-50 text-[#233876] py-3.5 rounded-xl font-bold hover:bg-gray-100 transition flex items-center justify-center gap-2"
          >
            View My Orders <ExternalLink size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
