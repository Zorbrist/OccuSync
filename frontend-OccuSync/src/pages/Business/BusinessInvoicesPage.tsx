import { useState, useEffect} from 'react';
import { BlurFade } from '@/ui/blur-fade';
import { Eye, FileText } from 'lucide-react';
import { getBusinessInvoices, getBusinessInvoiceDetails } from '../../services/businessService';
import type { BusinessInvoice } from '../../types/businessTypes';

export default function BusinessInvoicesPage() {
  const [invoices, setInvoices] = useState<BusinessInvoice[]>([]);
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [selectedInvoice, setSelectedInvoice] = useState<BusinessInvoice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchInvoices();
  }, [filter]);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const data = await getBusinessInvoices(filter);
      setInvoices(data);
    } catch (error) {
      console.error("Failed to fetch invoices", error);
    } finally {
      setLoading(false);
    }
  };

  const openInvoiceDetails = async (id: number) => {
    try {
      const data = await getBusinessInvoiceDetails(id);
      setSelectedInvoice(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch invoice details", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'PAID': return 'bg-emerald-100 text-emerald-700';
      case 'OVERDUE': return 'bg-red-100 text-red-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6 lg:px-10 flex items-center justify-center h-64">
        <p className="text-slate-500 font-medium">Loading invoices...</p>
      </div>
    );
  }

  return (
    <BlurFade delay={0.3}>
      <div className="w-full max-w-7xl mx-auto p-6 lg:px-10 pb-12 space-y-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-[#1E293B]">
              Invoices
            </h1>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mt-2">
              Manage billing and payments
            </p>
          </div>
        </div>

        {/* FILTER */}

        {/* INVOICE LIST */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-semibold text-[#1E293B]">Your Invoices</h2>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              {invoices.length} {invoices.length === 1 ? 'Invoice' : 'Invoices'}
            </span>
          </div>

                  <div className="bg-[#FFFFFF] rounded-[1.5rem] p-4 lg:p-5 border border-slate-100 shadow-[0_8px_24px_rgba(149,157,165,0.1)]">
          <div className="flex flex-col md:flex-row gap-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-[#F1F5F9] border-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] rounded-[1rem] px-5 py-3 text-sm text-slate-500 outline-none focus:ring-1 focus:ring-slate-200 min-w-[200px]"
            >
              <option value="ALL">All Invoices</option>
              <option value="ISSUED">Issued</option>
              <option value="PAID">Paid</option>
              <option value="OVERDUE">Overdue</option>
            </select>
          </div>
        </div>

          {invoices.length > 0 ? (
            <div className="space-y-4">
              {invoices.map((inv) => (
                <div
                  key={inv.id}
                  onClick={() => openInvoiceDetails(inv.id)}
                  className="bg-[#FFFFFF] rounded-[1.5rem] p-6 border border-slate-100 shadow-[0_8px_24px_rgba(149,157,165,0.1)] hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">

                    {/* ICON CONTAINER */}
                    <div className="w-16 h-16 rounded-[1rem] bg-[#F1F5F9] shadow-[inset_0_2px_5px_rgba(0,0,0,0.05)] flex items-center justify-center shrink-0 text-slate-400">
                      <FileText size={24} strokeWidth={1.5} />
                    </div>

                    {/* MAIN INFO */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-[#1E293B]">INV-{inv.id}</h3>
                        <span className={`px-2.5 py-1 rounded-[0.5rem] text-[10px] font-bold uppercase tracking-wider ${getStatusColor(inv.status)}`}>
                          {inv.status}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-600 mt-2">
                        {inv.first_name} {inv.last_name}
                      </p>

                      <div className="flex flex-wrap items-center gap-8 mt-4">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Total Amount</p>
                          <p className="text-sm font-medium text-[#1E293B] mt-0.5">RM {inv.total_amount}</p>
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Issue Date</p>
                          <p className="text-sm font-medium text-[#1E293B] mt-0.5">{new Date(inv.issue_date).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Due Date</p>
                          <p className="text-sm font-medium text-[#1E293B] mt-0.5">{new Date(inv.due_date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); openInvoiceDetails(inv.id); }}
                        className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-black transition-colors"
                        title="View Details"
                      >
                        <Eye size={14} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#FFFFFF] rounded-[1.5rem] p-10 border border-slate-100 shadow-[0_8px_24px_rgba(149,157,165,0.1)] text-center flex flex-col items-center justify-center">
              <p className="text-sm text-slate-500">No invoices found.</p>
            </div>
          )}
        </div>

        {/* DETAILS MODAL */}
        {isModalOpen && selectedInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#FFFFFF] rounded-[1.5rem] p-6 lg:p-8 w-full max-w-lg shadow-[0_8px_24px_rgba(0,0,0,0.15)] border border-slate-100">
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-[#1E293B]">Invoice INV-{selectedInvoice.id}</h2>
                  <span className={`inline-block mt-3 px-2.5 py-1 rounded-[0.5rem] text-[10px] font-bold uppercase tracking-wider ${getStatusColor(selectedInvoice.status)}`}>
                    {selectedInvoice.status}
                  </span>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="text-slate-400 hover:text-[#1E293B] text-xl transition-colors"
                >
                  &times;
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm mb-6 bg-[#F1F5F9] rounded-[1rem] p-5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">Customer</p>
                  <p className="font-semibold text-[#1E293B]">{selectedInvoice.first_name} {selectedInvoice.last_name}</p>
                  <p className="text-slate-500 mt-0.5">{selectedInvoice.phone}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">Timeline</p>
                  <p className="text-[#1E293B]"><span className="text-slate-500">Issued:</span> {new Date(selectedInvoice.issue_date).toLocaleDateString()}</p>
                  <p className="font-semibold text-[#1E293B] mt-0.5"><span className="text-slate-500 font-normal">Due:</span> {new Date(selectedInvoice.due_date).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3 border-b border-slate-100 pb-2">Line Items</h3>
                <ul className="space-y-3">
                  {selectedInvoice.items?.map(item => (
                    <li key={item.id} className="flex justify-between text-sm text-[#1E293B]">
                      <span>{item.description}</span>
                      <span className="font-medium">RM {item.sub_total}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between items-center mt-5 pt-4 border-t border-slate-100">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Total Amount</span>
                  <span className="text-xl font-semibold text-[#1E293B]">RM {selectedInvoice.total_amount}</span>
                </div>
              </div>

              <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-full bg-[#000000] text-white px-6 py-3 rounded-[1rem] text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </BlurFade>
  );
}