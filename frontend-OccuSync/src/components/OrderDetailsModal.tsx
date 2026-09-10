import React from 'react';
import { X, Calendar, Clock, FileText, Briefcase } from 'lucide-react';
import type { OrderResponse } from '../types/customerType';

interface OrderDetailsModalProps {
  order: OrderResponse;
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderDetailsModal({ order, isOpen, onClose }: OrderDetailsModalProps) {
  if (!isOpen) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-700';
      case 'CONFIRMED': return 'bg-blue-100 text-blue-700';
      case 'ASSIGNED': return 'bg-purple-100 text-purple-700';
      case 'IN_PROGRESS': return 'bg-orange-100 text-orange-700';
      case 'COMPLETED': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-MY', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-gray-100 overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-800">Order #{order.id}</h2>
            <span className={`mt-2 inline-block text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${getStatusColor(order.status)}`}>
              {order.status.replace('_', ' ')}
            </span>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-full transition">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 text-[#233876] rounded-xl">
              <Briefcase size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Service Provider</p>
              <p className="text-lg font-bold text-gray-800">{order.business_name || 'Not specified'}</p>
              <p className="text-sm text-gray-500">Service ID Reference: {order.service_id}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-gray-400" />
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Scheduled Start</p>
                <p className="text-sm font-semibold text-gray-800">{formatDate(order.scheduled_start)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-2 border-t border-gray-200 pt-4">
              <Clock size={18} className="text-gray-400" />
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Estimated End</p>
                <p className="text-sm font-semibold text-gray-800">{formatDate(order.scheduled_end)}</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText size={16} className="text-gray-400" />
              <p className="text-xs font-bold text-gray-400 uppercase">Your Notes</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="text-sm text-gray-700 italic">
                {order.notes ? `"${order.notes}"` : 'No additional notes provided.'}
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 text-right">
          <button 
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-300 transition"
          >
            Close Details
          </button>
        </div>

      </div>
    </div>
  );
}