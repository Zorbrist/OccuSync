import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllTransactions } from "../../services/adminService";

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

  return {
    transactions: filteredTransactions,
    loading,
    error,
    search,
    changeSearch: setSearch,
  };
}

export default function AdminTransactionsPage() {
  const { transactions, loading, error, search, changeSearch } = useAdminTransactions();

  return (
    <div className="min-h-screen space-y-6 bg-zinc-950 p-6 text-zinc-100">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Transactions</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Monitor invoices and payment records across the platform.
        </p>
      </div>

      {/* Search */}
      <div>
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => changeSearch(e.target.value)}
            placeholder="Search by Invoice ID or Business..."
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900/60 pl-10 pr-4 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 transition focus:border-violet-500"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm">
        {loading ? (
          <div className="px-6 py-10 text-center text-sm text-zinc-500">Loading transactions...</div>
        ) : error ? (
          <div className="px-6 py-10 text-center text-sm text-red-400">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-900/70 text-xs uppercase tracking-wider text-zinc-500">
                <tr>
                  <th className="px-6 py-3">Invoice ID</th>
                  <th className="px-6 py-3">Business</th>
                  <th className="px-6 py-3">Amount (RM)</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Payment Method</th>
                  <th className="px-6 py-3">Due Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/70">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="transition-colors hover:bg-violet-500/5">
                    <td className="px-6 py-4 font-medium text-zinc-100">
                      #{tx.id}
                    </td>
                    <td className="px-6 py-4 text-zinc-300">
                      {tx.business_name}
                      <p className="mt-0.5 text-xs text-zinc-500">Job #{tx.job_id}</p>
                    </td>
                    <td className="px-6 py-4 font-bold text-violet-300">
                      {Number(tx.total_amount).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full border px-3 py-1 text-[10px] uppercase font-bold tracking-wider ${
                          tx.status === "PAID"
                            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                            : tx.status === "OVERDUE"
                            ? "border-red-500/20 bg-red-500/10 text-red-400"
                            : "border-sky-500/20 bg-sky-500/10 text-sky-400"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-zinc-400 text-xs font-medium">
                      {tx.method ? tx.method.replace("_", " ") : "-"}
                    </td>
                    <td className="px-6 py-4 text-zinc-400 text-xs">
                      {new Date(tx.due_date).toLocaleDateString("en-MY")}
                    </td>
                  </tr>
                ))}
                {transactions.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-sm text-zinc-500">
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}