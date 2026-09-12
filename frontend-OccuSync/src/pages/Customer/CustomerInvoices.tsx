// pages/CustomerInvoices.tsx
import { Search, FileText, Sparkles } from 'lucide-react';

import { useInvoicesData } from '../../hooks/useInvoicesData';
import InvoiceDetailsModal from '../../components/InvoiceDetailsModal';

export default function CustomerInvoices() {
  const {
    filteredInvoices,
    availableStatuses,
    statusCounts,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    isLoading,
    error,
    selectedInvoice,
    setSelectedInvoice,
    handleOpenInvoice,
    isDetailLoading
  } = useInvoicesData();

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'ISSUED': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'PAID': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'OVERDUE': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'DRAFT': return 'bg-slate-800 text-slate-300 border-slate-700';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 font-sans text-slate-100 selection:bg-indigo-500/30 relative overflow-hidden">
      
      {/* Subtle Ambient Glows for Depth */}
      <div className="fixed top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-indigo-900/15 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-[-10%] left-[-5%] w-[35rem] h-[35rem] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>



      {/* 1. Add this new scrolling container */}
<div className="flex-1 h-full overflow-y-auto relative z-10">
      
      <div className="flex-1 p-6 md:p-10 lg:pl-12 max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-indigo-400 text-xs font-semibold tracking-wide uppercase mb-2 flex items-center gap-2">
              <Sparkles size={16} className="text-indigo-500" /> Billing & Payments
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold text-slate-100 tracking-tight">
              My Invoices
            </h1>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-3.5 text-slate-500" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID, Provider, or Service..." 
              className="w-full pl-11 pr-4 py-3 bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200 font-medium text-sm text-slate-100 placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Tab Filters */}
        <div className="mb-8 overflow-x-auto pb-2 -mx-6 px-6 md:mx-0 md:px-0">
          <div className="flex gap-3 min-w-max border-b border-slate-800/50 pb-3">
            {availableStatuses.map(status => {
              const isActive = statusFilter === status;
              const count = statusCounts[status] || 0;
              
              return (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`
                    relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2.5
                    ${isActive 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 transform -translate-y-0.5 border border-indigo-500' 
                      : 'bg-slate-900/60 text-slate-400 border border-slate-800 backdrop-blur-md hover:bg-slate-800/80 hover:text-slate-200 hover:border-slate-700'}
                  `}
                >
                  {status === 'ALL' ? 'All Invoices' : status}
                  <span className={`
                    px-2 py-0.5 rounded-full text-[11px] font-bold
                    ${isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-500'}
                  `}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content States */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-900/40 rounded-2xl border border-slate-800 backdrop-blur-sm">
             <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
             <p className="text-slate-300 font-medium animate-pulse">Loading billing history...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-slate-900/60 p-6 rounded-2xl border border-red-500/20 backdrop-blur-md text-center max-w-md mx-auto my-10">
            <p className="text-slate-300 font-medium">{error}</p>
          </div>
        )}

        {!isLoading && !error && filteredInvoices.length === 0 && (
          <div className="bg-slate-900/60 backdrop-blur-md p-12 rounded-2xl shadow-lg border border-slate-800 text-center max-w-2xl mx-auto mt-10">
            <div className="w-16 h-16 bg-slate-800/50 border border-slate-700/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText size={28} className="text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold text-slate-100 mb-2">No invoices found</h3>
            <p className="text-slate-400 text-sm">You don't have any invoices matching the current filter.</p>
          </div>
        )}

        {/* Invoices List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInvoices.map((invoice) => (
            <div 
              key={invoice.id} 
              onClick={() => handleOpenInvoice(invoice.id)}
              className="bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-indigo-500/5 transition-all duration-200 cursor-pointer border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/60 group flex flex-col justify-between relative overflow-hidden"
            >
              {/* Subtle accent line on the left */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div>
                <div className="flex justify-between items-start mb-5 gap-2">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block mb-1">
                      INV #{invoice.id} • JOB #{invoice.job_id}
                    </span>
                    <h3 className="text-lg font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors duration-200 leading-tight line-clamp-1">
                      {invoice.business_name}
                    </h3>
                  </div>
                  <span className={`text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider border whitespace-nowrap ${getStatusStyle(invoice.status)}`}>
                    {invoice.status}
                  </span>
                </div>
                
                <p className="text-slate-400 text-sm mb-6 line-clamp-1">
                  Service: {invoice.service_name}
                </p>
              </div>

              <div className="pt-5 mt-auto border-t border-slate-800/50 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold text-slate-500 uppercase leading-none mb-1.5">Total Due</p>
                  <p className="text-xl font-semibold text-slate-100 leading-none flex items-center gap-1">
                    RM {Number(invoice.total_amount).toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-semibold text-slate-500 uppercase leading-none mb-1.5">Due Date</p>
                   <p className={`text-sm font-medium leading-none ${invoice.status === 'OVERDUE' ? 'text-rose-400' : 'text-slate-300'}`}>
                     {new Date(invoice.due_date).toLocaleDateString('en-MY', { month: 'short', day: 'numeric', year: 'numeric' })}
                   </p>
                </div>
              </div>

              {/* Overlay loader when clicking */}
              {isDetailLoading && selectedInvoice?.invoice_id === invoice.id && (
                 <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center rounded-2xl">
                    <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
                 </div>
              )}
            </div>
          ))}
        </div>

        {selectedInvoice && (
          <InvoiceDetailsModal 
            invoice={selectedInvoice}
            isOpen={!!selectedInvoice}
            onClose={() => setSelectedInvoice(null)}
          />
        )}

      </div>
    </div>
    </div>
  );
}