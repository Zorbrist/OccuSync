// pages/Admin/AdminJobsPage.tsx
import { useEffect, useMemo, useState } from "react";
import { Search, Filter, Briefcase, User, Calendar as CalendarIcon } from "lucide-react";
import { getAllJobs } from "../../services/adminService";

import { BlurFade } from "../../ui/blur-fade";
import { Particles } from "../../ui/particles";

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
    jobs, loading, error, search, changeSearch: setSearch, statusFilter, setStatusFilter,
  };
}

export default function AdminJobsPage() {
  const { jobs, loading, error, search, changeSearch, statusFilter, setStatusFilter } = useAdminJobs();

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
              <h2 className="text-3xl font-bold tracking-tight text-[#0F172A]">Jobs Overview</h2>
              <p className="text-sm font-semibold text-slate-500 mt-1.5 uppercase tracking-wider">
                Track all service orders
              </p>
            </div>
           
          </div>
        </BlurFade>

        {/* ==============================
            Main Panel
        ============================== */}
        <BlurFade delay={0.2}>
          <div className="bg-[#F1F5F9] rounded-[2.5rem] p-8 shadow-[inset_0_2px_15px_rgba(255,255,255,1)] border border-white/60 flex flex-col min-h-[600px]">
            
            {/* Controls Row: Search & Filters */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
              
              <div className="relative w-full max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => changeSearch(e.target.value)}
                  placeholder="Search by Job ID, Customer, or Business..."
                  className="w-full bg-white border border-slate-200 rounded-full pl-11 pr-5 py-3 text-sm text-[#0F172A] outline-none placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-50 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.02)]"
                />
              </div>

              <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-full pl-4 pr-2 py-1.5 shadow-[0_4px_15px_rgba(0,0,0,0.02)] focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-50 transition-all">
                <Filter size={16} className="text-slate-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-transparent text-sm font-bold text-slate-600 outline-none cursor-pointer py-1.5 pr-4 appearance-none"
                  style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394A3B8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.2rem top 50%', backgroundSize: '0.65rem auto' }}
                >
                  <option value="ALL">All Statuses</option>
                  <option value="PENDING">Pending</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>

            </div>

            {/* Table Area */}
            <div className={`overflow-x-auto overflow-y-auto max-h-[500px] bg-white rounded-[1.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-slate-100 flex-1 ${scrollbarClasses}`}>
              <BlurFade key={statusFilter} delay={0.3}>
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-64">
                    <div className="w-8 h-8 border-[3px] border-slate-200 border-t-violet-600 rounded-full animate-spin mb-4"></div>
                    <p className="text-slate-500 font-semibold text-sm">Loading jobs...</p>
                  </div>
                ) : error ? (
                  <div className="flex items-center justify-center h-64 text-red-500 font-semibold text-sm bg-red-50/50">
                    {error}
                  </div>
                ) : (
                  <table className="w-full text-left min-w-[900px]">
                    <thead className="sticky top-0 bg-white z-10">
                      <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200">
                        <th className="py-5 pl-8 bg-white rounded-tl-[1.5rem]">Job Details</th>
                        <th className="py-5 bg-white">Customer</th>
                        <th className="py-5 bg-white">Business</th>
                        <th className="py-5 bg-white">Schedule</th>
                        <th className="py-5 text-right pr-8 bg-white rounded-tr-[1.5rem]">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {jobs.map((job) => (
                        <tr key={job.id} className="hover:bg-slate-50 transition-colors border-b border-slate-100 group">
                          {/* Job Details */}
                          <td className="py-5 pl-8">
                            <p className="font-bold text-[#0F172A] group-hover:text-violet-700 transition-colors">
                              {job.service_name}
                            </p>
                            <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                              ID: #{job.id}
                            </p>
                          </td>
                          
                          {/* Customer */}
                          <td className="py-5 text-slate-600 font-semibold">
                            <div className="flex items-center gap-2">
                              <User size={14} className="text-slate-400" />
                              <span className="truncate max-w-[150px]">{job.customer_name}</span>
                            </div>
                          </td>

                          {/* Business */}
                          <td className="py-5 text-slate-600 font-semibold">
                            <div className="flex items-center gap-2">
                              <Briefcase size={14} className="text-slate-400" />
                              <span className="truncate max-w-[150px]">{job.business_name}</span>
                            </div>
                          </td>

                          {/* Schedule */}
                          <td className="py-5">
                            <div className="flex items-start gap-2">
                              <CalendarIcon size={14} className="text-slate-400 mt-0.5" />
                              <div>
                                <p className="font-semibold text-[#1E293B]">
                                  {job.date ? new Date(job.date).toLocaleDateString("en-MY", { day: 'numeric', month: 'short', year: 'numeric' }) : "Pending Date"}
                                </p>
                                <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                                  {job.time_slot || "Time TBD"}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="py-5 text-right pr-8">
                            <span className="inline-flex items-center justify-end gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 shadow-sm">
                              <span className={`w-2 h-2 rounded-full ${
                                job.status === "COMPLETED" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" :
                                job.status === "CANCELLED" ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" :
                                job.status === "CONFIRMED" ? "bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.5)]" : "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                              }`}></span>
                              <span className="text-[11px] font-black uppercase tracking-wider text-slate-600">{job.status}</span>
                            </span>
                          </td>
                        </tr>
                      ))}
                      {jobs.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-16 text-center text-slate-500 font-semibold bg-slate-50">
                            No jobs found matching your criteria.
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