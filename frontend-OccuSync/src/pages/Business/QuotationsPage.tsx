import { Eye } from 'lucide-react';

export default function QuotationsPage() {
  const quotations = [
    {
      id: '#QUO-1021',
      customer: 'Natas',
      service: 'Aircond Repair',
      amount: 'RM180.00',
      status: 'Pending',
      date: 'Today',
    },
    {
      id: '#QUO-1018',
      customer: 'Sarah',
      service: 'Chemical Cleaning',
      amount: 'RM250.00',
      status: 'Accepted',
      date: 'Yesterday',
    },
    {
      id: '#QUO-1012',
      customer: 'Daniel',
      service: 'Aircond Installation',
      amount: 'RM450.00',
      status: 'Rejected',
      date: '2 days ago',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted': return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
      case 'Rejected': return 'bg-red-50 text-red-500 border border-red-100';
      default: return 'bg-amber-50 text-amber-600 border border-amber-100';
    }
  };

  return (
    <div className="min-h-screen bg-[#E8EDF2] p-6 lg:p-10 font-sans [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
      <div className="max-w-7xl mx-auto bg-[#F1F5F9] rounded-[2.5rem] shadow-[inset_0_2px_10px_rgba(255,255,255,0.7)] p-6 md:p-10">
        
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-xl font-semibold text-[#1E293B]">Quotations</h1>
          <p className="text-sm text-slate-500 mt-1">Create and manage quotations sent to customers.</p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-[1.5rem] border border-slate-50 shadow-[0_8px_24px_rgba(149,157,165,0.1)]">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Pending</p>
            <p className="text-3xl font-semibold text-[#1E293B] mt-2">4</p>
          </div>
          <div className="bg-white p-6 rounded-[1.5rem] border border-slate-50 shadow-[0_8px_24px_rgba(149,157,165,0.1)]">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Accepted</p>
            <p className="text-3xl font-semibold text-[#1E293B] mt-2">12</p>
          </div>
          <div className="bg-white p-6 rounded-[1.5rem] border border-slate-50 shadow-[0_8px_24px_rgba(149,157,165,0.1)]">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Total Value</p>
            <p className="text-3xl font-semibold text-[#1E293B] mt-2">RM4,820</p>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-[1.5rem] shadow-[0_8px_24px_rgba(149,157,165,0.1)] border border-slate-50 overflow-hidden">
          <div className="p-6">
            <h2 className="text-sm font-semibold text-[#1E293B]">Recent Quotations</h2>
          </div>

          <div className="overflow-x-auto p-2 pt-0">
            <table className="w-full">
              <thead className="bg-[#F1F5F9] shadow-inner rounded-[1rem] overflow-hidden block w-full table-fixed md:table">
                <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  <th className="px-6 py-4 rounded-l-[1rem]">Quotation</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 rounded-r-[1rem]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 block w-full table-fixed md:table mt-2">
                {quotations.map((quotation) => (
                  <tr key={quotation.id} className="hover:bg-[#F1F5F9]/50 transition-colors duration-200 group rounded-[1rem]">
                    <td className="px-6 py-5 text-sm font-semibold text-[#1E293B] rounded-l-[1rem]">
                      {quotation.id}
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-600">{quotation.customer}</td>
                    <td className="px-6 py-5 text-sm text-slate-600">{quotation.service}</td>
                    <td className="px-6 py-5 text-sm font-medium text-[#1E293B]">{quotation.amount}</td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider shadow-sm ${getStatusColor(quotation.status)}`}>
                        {quotation.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 rounded-r-[1rem]">
                      <button 
                        className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-black border border-slate-100 transition-all group-hover:shadow-md"
                        aria-label="View Quotation"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}