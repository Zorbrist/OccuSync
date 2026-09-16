// pages/Admin/AdminTransactionsPage.tsx
import { useEffect, useState } from "react";
import { Search, CreditCard, Receipt, Briefcase, Calendar as CalendarIcon } from "lucide-react";
import { getAllTransactions } from "../../services/adminService";

import { BlurFade } from "../../ui/blur-fade";
import { Particles } from "../../ui/particles";

type Transaction = {
  id: string | number;
  business_name: string;
  job_id: string | number;
  total_amount: number | string;
  status: string;
  method?: string | null;
  due_date: string;
};

function useAdminTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadTransactions() {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllTransactions();
        setTransactions(Array.isArray(data) ? data : data.transactions ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load transactions.");
      } finally {
        setLoading(false);
      }
    }

    loadTransactions();
  }, []);

  const normalizedSearch = search.trim().toLowerCase();
  const filteredTransactions = transactions.filter((transaction) =>
    `${transaction.id} ${transaction.business_name}`.toLowerCase().includes(normalizedSearch),
  );

  return { transactions: filteredTransactions, loading, error, search, changeSearch: setSearch };
}

export default function AdminTransactionsPage() {
  const { transactions, loading, error, search, changeSearch } = useAdminTransactions();

  const scrollbarClasses = "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-400";

  return (
    <div className="min-h-full font-sans text-slate-800 selection:bg-violet-200 relative pb-16 bg-[#E8EDF2]">
      <Particles className="absolute inset-0 pointer-events-none z-0 opacity-40" quantity={50} ease={80} color="#7C3AED" />

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 lg:px-12 space-y-8 pt-4">
        
        {/* ==============================
            Header
        ============================== */}
        <BlurFade delay={0.1}>
          <div className="flex items-center justify-between py-2 border-b border-slate-200/50 pb-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-[#0F172A]">Transactions</h2>
              <p className="text-sm font-semibold text-slate-500 mt-1.5 uppercase tracking-wider">
                Monitor invoices and payment records
              </p>
            </div>
           
          </div>
        </BlurFade>

        {/* ==============================
            Main Panel
        ============================== */}
        <BlurFade delay={0.2}>
          <div className="bg-[#F1F5F9] rounded-[2.5rem] p-8 shadow-[inset_0_2px_15px_rgba(255,255,255,1)] border border-white/60 flex flex-col min-h-[600px]">
            
            {/* Controls Row: Search */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => changeSearch(e.target.value)}
                  placeholder="Search by Invoice ID or Business..."
                  className="w-full bg-white border border-slate-200 rounded-full pl-11 pr-5 py-3 text-sm text-[#0F172A] outline-none placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-50 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.02)]"
                />
              </div>
            </div>

            {/* Table Area */}
            <div className={`overflow-x-auto overflow-y-auto max-h-[500px] bg-white rounded-[1.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-slate-100 flex-1 ${scrollbarClasses}`}>
              <BlurFade delay={0.3}>
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-64">
                    <div className="w-8 h-8 border-[3px] border-slate-200 border-t-violet-600 rounded-full animate-spin mb-4"></div>
                    <p className="text-slate-500 font-semibold text-sm">Loading transactions...</p>
                  </div>
                ) : error ? (
                  <div className="flex items-center justify-center h-64 text-red-500 font-semibold text-sm bg-red-50/50">
                    {error}
                  </div>
                ) : (
                  <table className="w-full text-left min-w-[900px]">
                    <thead className="sticky top-0 bg-white z-10">
                      <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200">
                        <th className="py-5 pl-8 bg-white rounded-tl-[1.5rem]">Invoice Data</th>
                        <th className="py-5 bg-white">Amount (RM)</th>
                        <th className="py-5 bg-white">Payment Method</th>
                        <th className="py-5 bg-white">Due Date</th>
                        <th className="py-5 text-right pr-8 bg-white rounded-tr-[1.5rem]">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {transactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-slate-50 transition-colors border-b border-slate-100 group">
                          
                          {/* Invoice Data */}
                          <td className="py-5 pl-8">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                                <Receipt size={16} className="text-slate-400 group-hover:text-violet-600 transition-colors" />
                              </div>
                              <div>
                                <p className="font-bold text-[#0F172A]">INV-{tx.id}</p>
                                <p className="text-[11px] font-semibold text-slate-500 mt-1 flex items-center gap-1.5">
                                  <Briefcase size={12} /> {tx.business_name} <span className="text-slate-300">|</span> Job #{tx.job_id}
                                </p>
                              </div>
                            </div>
                          </td>
                          
                          {/* Amount */}
                          <td className="py-5">
                            <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[#0F172A] font-black text-sm tracking-wider shadow-sm">
                              {Number(tx.total_amount).toFixed(2)}
                            </span>
                          </td>

                          {/* Payment Method */}
                          <td className="py-5 text-slate-600 font-semibold">
                            {tx.method ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-50 border border-slate-200 text-[11px] uppercase tracking-wider text-slate-500">
                                <CreditCard size={12}/> {tx.method.replace("_", " ")}
                              </span>
                            ) : (
                              <span className="text-slate-400 italic text-[11px]">Unpaid</span>
                            )}
                          </td>

                          {/* Due Date */}
                          <td className="py-5 text-slate-500 font-medium">
                            <div className="flex items-center gap-1.5">
                              <CalendarIcon size={14} className="text-slate-400" />
                              {new Date(tx.due_date).toLocaleDateString("en-MY", { day: 'numeric', month: 'short', year: 'numeric' })}
                            </div>
                          </td>

                          {/* Status */}
                          <td className="py-5 text-right pr-8">
                            <span className="inline-flex items-center justify-end gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 shadow-sm">
                              <span className={`w-2 h-2 rounded-full ${
                                tx.status === "PAID" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" :
                                tx.status === "OVERDUE" ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" :
                                "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                              }`}></span>
                              <span className="text-[11px] font-black uppercase tracking-wider text-slate-600">{tx.status}</span>
                            </span>
                          </td>

                        </tr>
                      ))}
                      {transactions.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-16 text-center text-slate-500 font-semibold bg-slate-50">
                            No transactions found matching your criteria.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </BlurFade>
            </div>
          </div>
        </BlurFade>
      </div>
    </div>
  );
}