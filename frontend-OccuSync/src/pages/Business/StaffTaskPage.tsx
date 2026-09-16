import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useStaff } from "../../hooks/useStaff";
import StaffTaskDetails from "./StaffDetailsPage";

const StaffTasksPage = () => {
  const { tasks, loading, error, fetchTasks } = useStaff();
  
  // STRICT INITIALIZATION: Prevents the modal from opening on load
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="min-h-screen bg-[#E8EDF2] p-6 lg:p-10 font-sans">
      <div className="max-w-5xl mx-auto bg-[#F1F5F9] rounded-[2.5rem] shadow-[inset_0_2px_10px_rgba(255,255,255,0.7)] p-6 md:p-10 min-h-[80vh]">
        
        <div className="mb-10">
          <h1 className="text-xl font-semibold text-[#1E293B]">My Tasks</h1>
          <p className="mt-1 text-sm text-slate-500">View and manage your assigned service jobs.</p>
        </div>

        {loading ? (
          <div className="bg-white rounded-[1.5rem] shadow-[0_8px_24px_rgba(149,157,165,0.1)] p-12 text-center border border-slate-50">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Loading tasks...</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-[1.5rem] shadow-[0_8px_24px_rgba(149,157,165,0.1)] p-8 text-center border border-slate-50">
            <p className="text-sm font-medium text-red-500">{error}</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="bg-white rounded-[1.5rem] shadow-[0_8px_24px_rgba(149,157,165,0.1)] border border-slate-50 p-12 text-center">
            <p className="text-sm text-slate-400">You currently have no assigned tasks.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {tasks.map((task) => (
              <div
                key={task.job_id}
                className="group bg-white rounded-[1.5rem] shadow-[0_8px_24px_rgba(149,157,165,0.05)] border border-slate-50 p-6 sm:p-8 hover:shadow-[0_12px_30px_rgba(149,157,165,0.1)] transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-sm font-semibold text-[#1E293B]">{task.service_name}</h2>
                    <div className="flex items-center gap-1.5 bg-blue-50/50 border border-blue-100 px-2.5 py-1 rounded-full">
                       <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                       <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wider">{task.status}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-slate-500 mb-3">
                    <p>Client: <span className="font-medium text-[#1E293B]">{task.first_name} {task.last_name}</span></p>
                    <span className="hidden sm:inline text-slate-300">•</span>
                    <p>{task.date} at {task.time_slot}</p>
                  </div>
                  
                  <p className="text-sm text-slate-400 line-clamp-1">{task.service_description}</p>
                </div>

                <button
                  onClick={() => {
                    if (task.job_id) setSelectedJobId(task.job_id);
                  }}
                  className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-black border border-slate-50 group-hover:shadow-md transition-all sm:shrink-0"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal is strictly controlled by selectedJobId state */}
      {selectedJobId && (
        <StaffTaskDetails
          jobId={selectedJobId}
          onClose={() => setSelectedJobId(null)}
        />
      )}
    </div>
  );
};

export default StaffTasksPage;