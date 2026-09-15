// components/InvoiceDetailsModal.tsx
import { X, Calendar, Clock, Briefcase, FileText, Phone, Mail, Receipt } from 'lucide-react';
import type { InvoiceDetail } from '../types/customerType';

interface InvoiceDetailsModalProps {
  invoice: InvoiceDetail;
  isOpen: boolean;
  onClose: () => void;
  onPay?: () => void;      // Make sure this line exists!
  isPaying?: boolean;      // Make sure this line exists!
}

export default function InvoiceDetailsModal({ invoice, isOpen, onClose }: InvoiceDetailsModalProps) {
  if (!isOpen) return null;

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'ISSUED': return 'bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]';
      case 'PAID': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(52,211,153,0.15)]';
      case 'OVERDUE': return 'bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.15)]';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "To be determined";
    try {
      return new Date(dateString).toLocaleDateString('en-MY', {
        year: 'numeric', month: 'short', day: 'numeric'
      });
    } catch {
      return "Invalid date";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-6">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-full">
        
        {/* Modal Header */}
        <div className="p-6 md:p-8 pb-6 border-b border-slate-800 bg-slate-950/30 flex justify-between items-start shrink-0">
          <div className="flex gap-4 items-start">
            <div className="w-14 h-14 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 shrink-0">
              <Receipt size={28} />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-semibold text-slate-100 tracking-tight">
                  Invoice #{invoice.invoice_id}
                </h2>
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border ${getStatusStyle(invoice.invoice_status)}`}>
                  {invoice.invoice_status}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-500">
                Issued on {formatDate(invoice.invoice_date)} • Job Ref #{invoice.job_id}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
          
          {/* Business Details */}
          <div className="p-5 bg-slate-950/50 border border-slate-800/50 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase size={16} className="text-indigo-400" />
              <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Billed By</h3>
            </div>
            <p className="text-lg font-bold text-slate-100 mb-3">{invoice.business_name}</p>
            <div className="flex flex-col sm:flex-row gap-4 text-sm text-slate-400">
              {invoice.business_phone && (
                <span className="flex items-center gap-2"><Phone size={14} /> {invoice.business_phone}</span>
              )}
              {invoice.business_email && (
                <span className="flex items-center gap-2"><Mail size={14} /> {invoice.business_email}</span>
              )}
            </div>
          </div>

          {/* Service & Schedule Details */}
          <div className="p-5 bg-slate-950/50 border border-slate-800/50 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <FileText size={16} className="text-indigo-400" />
              <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Service Details</h3>
            </div>
            <div className="mb-4 pb-4 border-b border-slate-800/50">
              <p className="text-base font-medium text-slate-200 mb-1">{invoice.service_name}</p>
              <p className="text-sm text-slate-500 leading-relaxed">{invoice.service_description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Service Date</p>
                <p className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <Calendar size={14} className="text-indigo-400" />
                  {formatDate(invoice.date)}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Time Slot</p>
                <p className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <Clock size={14} className="text-indigo-400" />
                  {invoice.time_slot || "To be determined"}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="p-5 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="text-xs text-indigo-300/70 font-semibold uppercase tracking-wider mb-1">Total Amount Due</p>
              <p className="text-3xl font-bold text-slate-100 tracking-tight">
                RM {Number(invoice.total_amount).toFixed(2)}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Due Date</p>
              <p className={`text-lg font-semibold ${invoice.invoice_status === 'OVERDUE' ? 'text-rose-400' : 'text-slate-300'}`}>
                {formatDate(invoice.due_date)}
              </p>
            </div>
          </div>

        </div>

      
        {/* Modal Footer */}
        <div className="p-6 border-t border-slate-800 bg-slate-950/30 flex justify-end shrink-0 gap-3">
          <button 
            onClick={onClose}
            className="w-full sm:w-auto bg-slate-800 text-slate-200 px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-700 hover:text-white transition-all duration-200 border border-slate-700"
          >
            Close
          </button>
          
          {/* REVERTED: Now it navigates to the payment page */}
          {invoice.invoice_status !== 'PAID' && (
            <button 
              onClick={() => window.location.href = `/customer/invoices/${invoice.invoice_id}/pay`}
              className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 transition-all duration-200 flex justify-center items-center gap-2"
            >
              Proceed to Payment
            </button>
          )}
        </div>

      </div>
    </div>
  );
}