import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useStaff } from "../../hooks/useStaff";

interface StaffTaskDetailsProps {
  jobId: number;
  onClose: () => void;
}

const StaffTaskDetails = ({ jobId, onClose }: StaffTaskDetailsProps) => {
  const {
    taskDetails,
    jobLogs,
    loading,
    error,
    fetchTaskDetails,
    fetchJobLogs,
    createJobLog,
    changeJobStatus,
  } = useStaff();

  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchTaskDetails(jobId);
    fetchJobLogs(jobId);
  }, [jobId, fetchTaskDetails, fetchJobLogs]);

  const handleAddLog = async () => {
    if (!notes.trim()) return;
    const result = await createJobLog(jobId, notes);
    if (result) setNotes("");
  };

  const handleStatusChange = async (status: "COMPLETED" | "CANCELLED") => {
    await changeJobStatus(jobId, status);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-[#F1F5F9] rounded-[2.5rem] shadow-[inset_0_2px_10px_rgba(255,255,255,0.7),0_20px_40px_rgba(0,0,0,0.1)] p-6 md:p-10 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Job #{jobId}</p>
            <h2 className="text-xl font-semibold text-[#1E293B]">Task Details</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-black border border-slate-50 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {loading && !taskDetails ? (
          <div className="py-12 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Loading details...
          </div>
        ) : error ? (
          <div className="py-12 text-center text-sm font-medium text-red-500">
            {error}
          </div>
        ) : taskDetails ? (
          <div className="space-y-6">

            {/* Service & Schedule Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-[1.5rem] shadow-[0_8px_24px_rgba(149,157,165,0.1)] border border-slate-50 p-6">
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-4">Service</h3>
                <h4 className="text-sm font-semibold text-[#1E293B]">{taskDetails.service_name}</h4>
                <p className="mt-1 text-sm text-slate-500 line-clamp-2">{taskDetails.service_description}</p>
                <p className="mt-4 text-sm font-semibold text-[#1E293B]">RM {taskDetails.base_price}</p>
              </div>

              <div className="bg-white rounded-[1.5rem] shadow-[0_8px_24px_rgba(149,157,165,0.1)] border border-slate-50 p-6">
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-4">Schedule</h3>
                <p className="text-sm font-semibold text-[#1E293B]">{taskDetails.date}</p>
                <p className="mt-1 text-sm text-slate-500">{taskDetails.time_slot}</p>
              </div>
            </div>

            {/* Customer */}
            <div className="bg-white rounded-[1.5rem] shadow-[0_8px_24px_rgba(149,157,165,0.1)] border border-slate-50 p-6">
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-4">Customer Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-[#1E293B]">{taskDetails.first_name} {taskDetails.last_name}</p>
                  <p className="text-sm text-slate-500 mt-1">{taskDetails.phone}</p>
                </div>
                <div className="text-sm text-slate-500">
                  <p>{taskDetails.address_line}</p>
                  <p>{taskDetails.state}, {taskDetails.postcode}</p>
                  <p>{taskDetails.country}</p>
                </div>
              </div>
            </div>

            {/* Job Logs */}
            <div className="bg-white rounded-[1.5rem] shadow-[0_8px_24px_rgba(149,157,165,0.1)] border border-slate-50 p-6">
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-4">Job Logs</h3>
              <div className="space-y-3 mb-6">
                {jobLogs.length === 0 ? (
                  <p className="text-sm text-slate-400 p-4 bg-[#F1F5F9] rounded-[1rem] shadow-inner text-center">No job logs yet.</p>
                ) : (
                  jobLogs.map((log) => (
                    <div key={log.id} className="bg-[#F1F5F9] rounded-[1rem] p-4 shadow-inner">
                      <p className="text-sm text-[#1E293B]">{log.notes}</p>
                      <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        {new Date(log.created_at).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>

              {/* Add Log */}
              <div className="relative">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add a job note..."
                  className="w-full bg-[#F1F5F9] rounded-[1rem] border-none shadow-inner p-4 text-sm text-[#1E293B] outline-none focus:ring-2 focus:ring-slate-200 resize-none transition-all"
                  rows={2}
                />
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={handleAddLog}
                    disabled={!notes.trim()}
                    className="rounded-[1rem] bg-black px-5 py-2.5 text-sm font-medium text-white shadow-md hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                  >
                    Add Log
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                onClick={() => handleStatusChange("CANCELLED")}
                className="rounded-[1rem] px-5 py-2.5 text-sm font-medium text-slate-500 hover:text-red-500 hover:bg-red-50 transition-colors"
              >
                Cancel Job
              </button>
              <button
                onClick={() => handleStatusChange("COMPLETED")}
                className="rounded-[1rem] bg-black px-6 py-2.5 text-sm font-medium text-white shadow-[0_4px_14px_rgba(0,0,0,0.2)] hover:bg-slate-800 transition-all"
              >
                Complete Job
              </button>
            </div>

          </div>
        ) : null}
      </div>
    </div>
  );
};

export default StaffTaskDetails;