// components/InvoiceDetailsModal.tsx

import { X, Briefcase, Receipt, Mail, Phone } from 'lucide-react';
import type { InvoiceDetail } from '../types/customerType';

interface InvoiceDetailsModalProps {
  invoice: InvoiceDetail;
  isOpen: boolean;
  onClose: () => void;
}

export default function InvoiceDetailsModal({ invoice, isOpen, onClose }: InvoiceDetailsModalProps) {
  if (!isOpen) return null;

  const isOverdue = invoice.invoice_status === 'OVERDUE';
  const isPaid = invoice.invoice_status === 'PAID';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className={`p-6 md:p-8 flex justify-between items-start ${isPaid ? 'bg-emerald-50' : isOverdue ? 'bg-rose-50' : 'bg-blue-50'}`}>
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Invoice Details</p>
            <h2 className="text-3xl font-black text-gray-900">INV #{invoice.invoice_id}</h2>
            <div className="flex gap-2 mt-3">
              <span className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider border bg-white ${isPaid ? 'text-emerald-700 border-emerald-200' : isOverdue ? 'text-rose-700 border-rose-200' : 'text-blue-700 border-blue-200'}`}>
                {invoice.invoice_status}
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white text-gray-600 border border-gray-200">
                Job #{invoice.job_id}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 bg-white/50 hover:bg-white rounded-full transition">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 space-y-8 bg-white">
          
          {/* Provider Info */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gray-50 text-gray-600 rounded-2xl border border-gray-100">
              <Briefcase size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Billed By</p>
              <p className="text-lg font-extrabold text-gray-900">{invoice.business_name}</p>
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 mt-1 text-sm text-gray-500">
                <span className="flex items-center gap-1"><Mail size={14} /> {invoice.business_email}</span>
                <span className="flex items-center gap-1"><Phone size={14} /> {invoice.business_phone}</span>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Service Details */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Service Provided</p>
            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <p className="font-bold text-gray-900">{invoice.service_name}</p>
                <p className="font-black text-gray-900">RM {Number(invoice.base_price).toFixed(2)}</p>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{invoice.service_description}</p>
            </div>
          </div>

          {/* Dates & Totals */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">Issue Date</p>
              <p className="text-sm font-bold text-gray-900">
                {new Date(invoice.invoice_date).toLocaleDateString('en-MY', { year: 'numeric', month: 'short', day: 'numeric' })}
              </p>
            </div>
            <div className={`p-4 rounded-2xl border ${isOverdue ? 'bg-rose-50 border-rose-100' : 'bg-gray-50 border-gray-100'}`}>
              <p className={`text-xs font-bold uppercase mb-1 ${isOverdue ? 'text-rose-500' : 'text-gray-400'}`}>Due Date</p>
              <p className={`text-sm font-bold ${isOverdue ? 'text-rose-700' : 'text-gray-900'}`}>
                {new Date(invoice.due_date).toLocaleDateString('en-MY', { year: 'numeric', month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>
          
        </div>

        {/* Footer / Payment CTA */}
        <div className="p-6 md:p-8 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
           <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Amount</p>
              <p className="text-3xl font-black text-[#233876]">RM {Number(invoice.total_amount).toFixed(2)}</p>
           </div>
           
           {!isPaid && (
             <button className="w-full sm:w-auto bg-[#233876] text-white px-8 py-3.5 rounded-xl font-bold shadow-lg hover:bg-blue-900 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
               <Receipt size={18} /> Make Payment
             </button>
           )}
        </div>

      </div>
    </div>
  );
}