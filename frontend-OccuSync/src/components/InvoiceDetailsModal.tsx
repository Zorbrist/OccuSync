// components/InvoiceDetailsModal.tsx
import { X, Calendar, Clock, Briefcase, FileText, Phone, Mail, Receipt } from 'lucide-react';
import type { InvoiceDetail } from '../types/customerType';

interface InvoiceDetailsModalProps {
  invoice: InvoiceDetail;
  isOpen: boolean;
  onClose: () => void;
  onPay?: () => void;      
  isPaying?: boolean;      
}

export default function InvoiceDetailsModal({ invoice, isOpen, onClose }: InvoiceDetailsModalProps) {
  if (!isOpen) return null;

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'ISSUED': return 'bg-sky-50 text-sky-500 border-sky-100 shadow-[0_0_10px_rgba(14,165,233,0.1)]';
      case 'PAID': return 'bg-emerald-50 text-emerald-500 border-emerald-100 shadow-[0_0_10px_rgba(16,185,129,0.1)]';
      case 'OVERDUE': return 'bg-red-50 text-red-500 border-red-100 shadow-[0_0_10px_rgba(239,68,68,0.1)]';
      default: return 'bg-slate-50 text-slate-500 border-slate-200';
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "TBD";
    try {
      return new Date(dateString).toLocaleDateString('en-MY', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
      return "Invalid date";
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white border border-white rounded-[2rem] w-full max-w-lg shadow-[0_20px_60px_rgba(0,0,0,0.15)] flex flex-col max-h-[85vh] animate-in zoom-in-95 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Compact Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-[#F1F5F9]/50 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2.5">
              Invoice #{invoice.invoice_id}
              <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider border shadow-sm ${getStatusStyle(invoice.invoice_status)}`}>
                {invoice.invoice_status}
              </span>
            </h2>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-black hover:bg-slate-50 transition-all border border-slate-100">
            <X size={14} />
          </button>
        </div>

        {/* Compact Scrollable Body */}
        <div className="px-6 py-5 space-y-4 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
          
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">
            Issued on {formatDate(invoice.invoice_date)} • Job Ref #{invoice.job_id}
          </p>

          {/* Business & Service Grid */}
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-[1.25rem]">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                  <Briefcase size={12} /> Billed By
                </p>
                <p className="text-sm font-black text-[#0F172A] leading-tight mb-2">{invoice.business_name}</p>
                <div className="flex flex-col gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  {invoice.business_phone && <span className="flex items-center gap-1.5"><Phone size={10} /> {invoice.business_phone}</span>}
                  {invoice.business_email && <span className="flex items-center gap-1.5"><Mail size={10} /> {invoice.business_email}</span>}
                </div>
              </div>
              
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                  <FileText size={12} /> Service
                </p>
                <p className="text-sm font-black text-[#0F172A] leading-tight mb-2">{invoice.service_name}</p>
                <p className="text-[10px] font-semibold text-slate-500 leading-relaxed line-clamp-2">
                  {invoice.service_description}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/60 grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Service Date</p>
                <p className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
                  <Calendar size={12} className="text-violet-500" /> {formatDate(invoice.date)}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Time Slot</p>
                <p className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
                  <Clock size={12} className="text-violet-500" /> {invoice.time_slot || "TBD"}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="p-4 bg-violet-50 border border-violet-100 rounded-[1.25rem] flex justify-between items-center shadow-sm">
            <div>
              <p className="text-[10px] font-bold text-violet-500 uppercase tracking-widest mb-0.5">Total Amount Due</p>
              <p className="text-2xl font-black text-[#0F172A] tracking-tight">
                RM {Number(invoice.total_amount).toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-violet-500 uppercase tracking-widest mb-0.5">Due Date</p>
              <p className={`text-sm font-black ${invoice.invoice_status === 'OVERDUE' ? 'text-red-500' : 'text-[#0F172A]'}`}>
                {formatDate(invoice.due_date)}
              </p>
            </div>
          </div>

        </div>

        {/* Compact Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-2.5 shrink-0">
          <button 
            onClick={onClose}
            className="flex-1 sm:flex-none bg-white text-slate-600 px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider hover:bg-slate-100 transition-colors border border-slate-200 shadow-sm"
          >
            Close
          </button>
          
          {invoice.invoice_status !== 'PAID' && (
            <button 
              onClick={() => window.location.href = `/customer/invoices/${invoice.invoice_id}/pay`}
              className="flex-1 sm:flex-none bg-[#0F172A] text-white px-8 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-md hover:bg-black hover:-translate-y-0.5 transition-all flex justify-center items-center gap-2"
            >
              Proceed to Payment
            </button>
          )}
        </div>

      </div>
    </div>
  );
}