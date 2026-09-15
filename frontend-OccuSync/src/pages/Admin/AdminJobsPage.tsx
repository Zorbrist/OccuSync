import { useEffect, useMemo, useState } from "react";
import { Search, Filter } from "lucide-react";
import { getAllJobs } from "../../services/adminService";

type Job = {
  id: string | number;
  service_name: string;
  customer_name: string;
  business_name: string;
  date?: string | null;
  time_slot?: string | null;
  status: string;
};

function useAdminJobs() {
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
  const loadJobs = async () => {
    try {
      setLoading(true);
      const data = await getAllJobs();
      // Ensure it matches the structure returned by the backend
      setAllJobs(Array.isArray(data) ? data : data.jobs ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  loadJobs();
}, []);

  const jobs = useMemo(() => {
    const query = search.trim().toLowerCase();
    return allJobs.filter((job) => {
      const matchesSearch = !query || [
        job.id,
        job.service_name,
        job.customer_name,
        job.business_name,
      ].some((value) => String(value ?? "").toLowerCase().includes(query));
      return matchesSearch && (statusFilter === "ALL" || job.status === statusFilter);
    });
  }, [allJobs, search, statusFilter]);

  return {
    jobs,
    loading,
    error,
    search,
    changeSearch: setSearch,
    statusFilter,
    setStatusFilter,
  };
}

export default function AdminJobsPage() {
  const { jobs, loading, error, search, changeSearch, statusFilter, setStatusFilter } = useAdminJobs();

  return (
    <div className="min-h-screen space-y-6 bg-zinc-950 p-6 text-zinc-100">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Jobs Overview</h1>
        <p className="mt-1 text-sm text-zinc-400">
          View and track all customer orders and service jobs.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => changeSearch(e.target.value)}
            placeholder="Search by Job ID, Customer, or Business..."
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900/60 pl-10 pr-4 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 transition focus:border-violet-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-zinc-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2.5 text-sm text-zinc-300 outline-none transition focus:border-violet-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm shadow-[0_0_20px_rgba(0,0,0,0.2)]">
        {loading ? (
          <div className="px-6 py-10 text-center text-sm text-zinc-500">Loading jobs...</div>
        ) : error ? (
          <div className="px-6 py-10 text-center text-sm text-red-400">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-900/70 text-xs uppercase tracking-wider text-zinc-500">
                <tr>
                  <th className="px-6 py-3">Job Details</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Business</th>
                  <th className="px-6 py-3">Schedule</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/70">
                {jobs.map((job) => (
                  <tr key={job.id} className="transition-colors hover:bg-violet-500/5">
                    <td className="px-6 py-4">
                      <p className="font-medium text-zinc-100">{job.service_name}</p>
                      <p className="mt-0.5 text-xs text-zinc-500">ID: #{job.id}</p>
                    </td>
                    <td className="px-6 py-4 text-zinc-300">{job.customer_name}</td>
                    <td className="px-6 py-4 text-zinc-300">{job.business_name}</td>
                    <td className="px-6 py-4">
                      <p className="text-zinc-300">
                        {job.date ? new Date(job.date).toLocaleDateString("en-MY") : "TBD"}
                      </p>
                      <p className="mt-0.5 text-xs text-zinc-500">{job.time_slot || "-"}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full border px-3 py-1 text-[10px] uppercase font-bold tracking-wider ${
                          job.status === "COMPLETED"
                            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                            : job.status === "CANCELLED"
                            ? "border-red-500/20 bg-red-500/10 text-red-400"
                            : job.status === "CONFIRMED"
                            ? "border-violet-500/20 bg-violet-500/10 text-violet-300"
                            : "border-amber-500/20 bg-amber-500/10 text-amber-400"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {jobs.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-sm text-zinc-500">
                      No jobs found matching your criteria.
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