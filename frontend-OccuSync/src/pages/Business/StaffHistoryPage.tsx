import { useEffect } from "react";
import { useStaff } from "../../hooks/useStaff";

const StaffHistoryPage = () => {
  const { history, loading, error, fetchHistory } = useStaff();

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return (
    <div className="min-h-screen bg-[#E8EDF2] p-6 lg:p-10 font-sans">
      <div className="max-w-5xl mx-auto bg-[#F1F5F9] rounded-[2.5rem] shadow-[inset_0_2px_10px_rgba(255,255,255,0.7)] p-6 md:p-10 min-h-[80vh]">
        
        <div className="mb-10">
          <h1 className="text-xl font-semibold text-[#1E293B]">Job History</h1>
          <p className="mt-1 text-sm text-slate-500">View your completed and cancelled jobs.</p>
        </div>

        {loading ? (
          <div className="bg-white rounded-[1.5rem] shadow-[0_8px_24px_rgba(149,157,165,0.1)] p-12 text-center border border-slate-50">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Loading history...</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-[1.5rem] shadow-[0_8px_24px_rgba(149,157,165,0.1)] p-8 text-center border border-slate-50">
            <p className="text-sm font-medium text-red-500">{error}</p>
          </div>
        ) : history.length === 0 ? (
          <div className="bg-white rounded-[1.5rem] shadow-[0_8px_24px_rgba(149,157,165,0.1)] border border-slate-50 p-12 text-center">
            <p className="text-sm text-slate-400">No job history yet.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {history.map((job) => (
              <div
                key={job.job_id}
                className="bg-white rounded-[1.5rem] shadow-[0_8px_24px_rgba(149,157,165,0.05)] border border-slate-50 p-6 sm:p-8 hover:shadow-[0_12px_30px_rgba(149,157,165,0.1)] transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <h2 className="text-sm font-semibold text-[#1E293B] mb-2">{job.service_name}</h2>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-slate-500 mb-3">
                      <p>Client: <span className="font-medium text-[#1E293B]">{job.first_name} {job.last_name}</span></p>
                      <span className="hidden sm:inline text-slate-300">•</span>
                      <p>{job.date} at {job.time_slot}</p>
                    </div>
                    <p className="text-sm text-slate-400 line-clamp-2">{job.service_description}</p>
                  </div>

                  <div className="shrink-0">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        job.status === "COMPLETED"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                          : "bg-red-50 text-red-500 border border-red-100"
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${job.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                      {job.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffHistoryPage;