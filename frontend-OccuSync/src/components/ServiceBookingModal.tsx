import React, { useState } from 'react';
import { X, Clock, MapPin } from 'lucide-react';
import type { ServiceListing, OrderPayload } from '../types/customerType';

interface ServiceBookingModalProps {
  service: ServiceListing;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: OrderPayload) => Promise<void>;
  isSubmitting: boolean;
}

export default function ServiceBookingModal({ service, isOpen, onClose, onSubmit, isSubmitting }: ServiceBookingModalProps) {
  // Set default dates to give the user a starting point
  const [scheduledStart, setScheduledStart] = useState('');
  const [scheduledEnd, setScheduledEnd] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduledStart || !scheduledEnd) {
      alert("Please select both start and end times.");
      return;
    }
    
    await onSubmit({
      service_id: Number(service.id), // Ensure it matches the backend requirement[cite: 1]
      scheduled_start: new Date(scheduledStart).toISOString(),
      scheduled_end: new Date(scheduledEnd).toISOString(),
      notes
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50">
          <div>
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">
              {service.industry}
            </span>
            <h2 className="text-2xl font-extrabold text-gray-800">{service.name}</h2>
            <p className="text-sm text-gray-500 mt-1 font-medium">{service.business_name}</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-full transition">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 overflow-y-auto">
          <div className="flex gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
              <Clock size={16} className="text-[#233876]" />
              <span className="font-semibold">~{service.estimated_duration} mins</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
              <MapPin size={16} className="text-[#233876]" />
              <span className="font-semibold">{service.area_of_service || 'Anywhere'}</span>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            {service.description}
          </p>

          <form id="booking-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Requested Start</label>
                <input 
                  type="datetime-local" 
                  value={scheduledStart}
                  onChange={(e) => setScheduledStart(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-200 shadow-sm text-sm focus:ring-2 focus:ring-[#233876] outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Estimated End</label>
                <input 
                  type="datetime-local" 
                  value={scheduledEnd}
                  onChange={(e) => setScheduledEnd(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-200 shadow-sm text-sm focus:ring-2 focus:ring-[#233876] outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Additional Notes (Optional)</label>
              <textarea 
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="E.g., Please call when you arrive at the gate."
                className="w-full p-3 rounded-xl border border-gray-200 shadow-sm text-sm focus:ring-2 focus:ring-[#233876] outline-none resize-none"
              />
            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase">Estimated Cost</p>
            <p className="text-2xl font-extrabold text-[#233876]">RM {Number(service.base_price).toFixed(2)}</p>
          </div>
          <button 
            form="booking-form"
            type="submit"
            disabled={isSubmitting}
            className="bg-[#233876] text-white px-8 py-3 rounded-xl font-bold shadow-md hover:bg-blue-800 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Confirm Request'}
          </button>
        </div>

      </div>
    </div>
  );
}