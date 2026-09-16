import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Clock, Briefcase, CalendarDays, MoreHorizontal } from "lucide-react";
import { useStaff } from "../../hooks/useStaff";
import StaffTaskDetails from "./StaffDetailsPage";

// =========================
// BLUR FADE STATE WRAPPER
// =========================
const BlurFadeWrapper = ({ children, stateKey }: { children: React.ReactNode, stateKey: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, [stateKey]);

  return (
    <div
      className={`transition-all duration-700 ease-out w-full flex-1 ${
        isVisible ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-md translate-y-4'
      }`}
    >
      {children}
    </div>
  );
};

export default function StaffDashboardPage() {
  const navigate = useNavigate();
  const { tasks, history, loading, error, fetchTasks, fetchHistory } = useStaff();

  // STRICT INITIALIZATION: Prevents accidental modal mounting
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);

  useEffect(() => {
    fetchTasks();
    fetchHistory();
  }, [fetchTasks, fetchHistory]);

  const completedTasks = history.filter(job => job.status === "COMPLETED").length;
  const pendingTasks = tasks.length;
  
  // Slices for the UI
  const activeTasksList = tasks.slice(0, 5); 
  const recentHistory = history.slice(0, 2);

  const currentState = loading ? 'loading' : error ? 'error' : 'content';

  return (
    // FIX: Changed min-h-screen to h-full to prevent layout overflow issues
    <div className="h-full bg-[#E8EDF2] flex flex-col overflow-y-auto font-sans">
      <BlurFadeWrapper stateKey={currentState}>
        
        {/* ========================= */}
        {/* LOADING STATE */}
        {/* ========================= */}
        {loading && (
          <div className="flex-1 flex items-center justify-center p-8 h-full">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 animate-pulse">
              Syncing dashboard...
            </p>
          </div>
        )}

        {/* ========================= */}
        {/* ERROR STATE */}
        {/* ========================= */}
        {!loading && error && (
          <div className="flex-1 flex items-center justify-center p-8 h-full">
            <div className="bg-[#FFFFFF] rounded-[1.5rem] p-8 border border-slate-100 shadow-[0_8px_24px_rgba(149,157,165,0.1)] text-center">
              <p className="text-sm font-medium text-red-500">{error}</p>
              <button
                onClick={() => { fetchTasks(); fetchHistory(); }}
                className="mt-4 px-6 py-2.5 rounded-[1rem] bg-black text-white text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* ========================= */}
        {/* MAIN DASHBOARD CONTENT */}
        {/* ========================= */}
        {!loading && !error && (
          <div className="p-6 lg:p-10 space-y-8 pb-20">
            
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-[#1E293B] text-2xl lg:text-3xl font-semibold tracking-tight">
                  Dashboard Overview
                </h1>
                <p className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase mt-2">
                  {new Date().toLocaleString('en-MY', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>

              <button
                type="button"
                onClick={() => { fetchTasks(); fetchHistory(); }}
                className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-black transition-colors"
                title="Refresh dashboard"
              >
                <CalendarDays size={16} />
              </button>
            </div>

            {/* STATISTICS PANEL */}
            <div className="bg-[#F1F5F9] rounded-[2.5rem] p-6 lg:p-8 shadow-[inset_0_2px_10px_rgba(255,255,255,0.7)]">
              <h2 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-6">
                Overview Metrics
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* ACTIVE TASKS */}
                <button
                  type="button"
                  onClick={() => navigate('/staff')}
                  className="text-left bg-[#FFFFFF] rounded-[1.5rem] p-6 border border-slate-100 shadow-[0_8px_24px_rgba(149,157,165,0.1)] hover:-translate-y-1 transition-transform duration-300 flex items-center gap-6"
                >
                  <div className="w-14 h-14 rounded-full bg-[#F1F5F9] shadow-inner text-[#1E293B] flex items-center justify-center shrink-0">
                    <Clock size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Active Tasks
                    </h3>
                    <p className="text-[#1E293B] text-2xl font-semibold mt-1">
                      {pendingTasks}
                    </p>
                  </div>
                </button>

                {/* COMPLETED TASKS */}
                <button
                  type="button"
                  onClick={() => navigate('/staff/history')}
                  className="text-left bg-[#FFFFFF] rounded-[1.5rem] p-6 border border-slate-100 shadow-[0_8px_24px_rgba(149,157,165,0.1)] hover:-translate-y-1 transition-transform duration-300 flex items-center gap-6"
                >
                  <div className="w-14 h-14 rounded-full bg-[#F1F5F9] shadow-inner text-[#1E293B] flex items-center justify-center shrink-0">
                    <CheckCircle2 size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Jobs Completed
                    </h3>
                    <p className="text-[#1E293B] text-2xl font-semibold mt-1">
                      {completedTasks}
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* LOWER CONTENT SPLIT */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              
              {/* LEFT PANEL: ACTIVE TASKS */}
              <div className="xl:col-span-2 bg-[#F1F5F9] rounded-[2.5rem] p-6 lg:p-8 shadow-[inset_0_2px_10px_rgba(255,255,255,0.7)] space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-[#1E293B]">Active Tasks</h2>
                  <button
                    type="button"
                    onClick={() => navigate('/staff')}
                    className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 hover:text-[#1E293B] transition-colors"
                  >
                    View all
                  </button>
                </div>

                <div className="space-y-4">
                  {activeTasksList.length > 0 ? (
                    activeTasksList.map((task) => (
                      <div
                        key={task.job_id}
                        className="bg-[#FFFFFF] rounded-[1.5rem] p-6 border border-slate-100 shadow-[0_8px_24px_rgba(149,157,165,0.1)] flex flex-col md:flex-row md:items-center md:justify-between gap-6 hover:shadow-[0_12px_28px_rgba(149,157,165,0.15)] transition-shadow"
                      >
                        <div className="space-y-2 min-w-0">
                          <div className="flex items-center gap-3">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                              #JOB-{task.job_id}
                            </span>
                            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 bg-blue-50/50 border border-blue-100 px-2 py-0.5 rounded-full uppercase">
                              {task.status}
                            </span>
                          </div>

                          <h3 className="text-[#1E293B] text-lg font-semibold truncate">
                            {task.service_name}
                          </h3>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-slate-500">
                            <p className="truncate">Client: {task.first_name} {task.last_name}</p>
                            <span className="hidden sm:inline text-slate-300">•</span>
                            <p>{task.date} at {task.time_slot}</p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            if (task.job_id) setSelectedJobId(task.job_id);
                          }}
                          className="shrink-0 px-6 py-2.5 rounded-[1rem] bg-black text-white text-sm font-medium hover:bg-slate-800 transition-colors shadow-md"
                        >
                          View Details
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="bg-[#FFFFFF] rounded-[1.5rem] p-12 border border-slate-100 shadow-[0_8px_24px_rgba(149,157,165,0.1)] flex flex-col justify-center items-center">
                      <Briefcase className="mb-3 text-slate-300" size={32} />
                      <p className="text-sm text-slate-500">You are completely caught up.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT PANEL: ALERTS & HISTORY */}
              <div className="bg-[#F1F5F9] rounded-[2.5rem] p-6 lg:p-8 shadow-[inset_0_2px_10px_rgba(255,255,255,0.7)] space-y-8">
                
                {/* ALERTS */}
                <div>
                   <div className="flex items-center justify-between mb-4">
                     <h2 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      System Alerts
                    </h2>
                     <button className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-black transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                   </div>
                  
                  <div className="bg-[#FFFFFF] rounded-[1.5rem] p-6 border border-slate-100 shadow-[0_8px_24px_rgba(149,157,165,0.1)] space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                      <div>
                        <p className="text-sm font-medium text-[#1E293B]">Shift Assigned</p>
                        <p className="text-xs text-slate-500 mt-1">You have new tasks added to your schedule.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RECENT HISTORY */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-[#1E293B]">Recent History</h2>
                    <button
                      type="button"
                      onClick={() => navigate('/staff/history')}
                      className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 hover:text-[#1E293B] transition-colors"
                    >
                      View All
                    </button>
                  </div>

                  <div className="space-y-4">
                    {recentHistory.length > 0 ? (
                      recentHistory.map((job) => (
                        <div key={job.job_id} className="bg-[#FFFFFF] rounded-[1.5rem] p-5 border border-slate-100 shadow-[0_8px_24px_rgba(149,157,165,0.1)]">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-[#1E293B] text-sm truncate pr-2">{job.service_name}</h3>
                            <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 shrink-0">
                              Done
                            </span>
                          </div>
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                            {job.date}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="bg-[#FFFFFF] rounded-[1.5rem] p-6 border border-slate-100 shadow-[0_8px_24px_rgba(149,157,165,0.1)] text-center">
                        <p className="text-sm text-slate-400">No recent history.</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </BlurFadeWrapper>

      {/* MODAL: Rendered Safely */}
      {selectedJobId && (
        <StaffTaskDetails
          jobId={selectedJobId}
          onClose={() => setSelectedJobId(null)}
        />
      )}
    </div>
  );
}