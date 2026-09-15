import { useEffect, useState } from "react";
import { useStaff } from "../../hooks/useStaff";

interface StaffTaskDetailsProps {
  jobId: number;
  onClose: () => void;
}

const StaffTaskDetails = ({
  jobId,
  onClose,
}: StaffTaskDetailsProps) => {
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

    const result = await createJobLog(
      jobId,
      notes
    );

    if (result) {
      setNotes("");
    }
  };

  const handleStatusChange = async (
    status: "COMPLETED" | "CANCELLED"
  ) => {
    await changeJobStatus(jobId, status);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl border border-gray-800 bg-gray-900 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              Task Details
            </h2>

            <p className="text-sm text-gray-400">
              Job #{jobId}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {loading && !taskDetails ? (
          <div className="py-10 text-center text-gray-400">
            Loading...
          </div>
        ) : error ? (
          <div className="py-10 text-center text-red-400">
            {error}
          </div>
        ) : taskDetails ? (
          <div className="mt-6 space-y-6">

            {/* Service */}
            <div>
              <h3 className="mb-2 text-sm font-medium text-gray-400">
                SERVICE
              </h3>

              <div className="rounded-lg border border-gray-800 bg-gray-950 p-4">
                <h4 className="font-medium">
                  {taskDetails.service_name}
                </h4>

                <p className="mt-1 text-sm text-gray-400">
                  {taskDetails.service_description}
                </p>

                <p className="mt-3 text-sm">
                  RM {taskDetails.base_price}
                </p>
              </div>
            </div>

            {/* Customer */}
            <div>
              <h3 className="mb-2 text-sm font-medium text-gray-400">
                CUSTOMER
              </h3>

              <div className="rounded-lg border border-gray-800 bg-gray-950 p-4">
                <p>
                  {taskDetails.first_name}{" "}
                  {taskDetails.last_name}
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  {taskDetails.phone}
                </p>

                <p className="mt-3 text-sm text-gray-400">
                  {taskDetails.address_line}
                  <br />
                  {taskDetails.state},{" "}
                  {taskDetails.postcode}
                  <br />
                  {taskDetails.country}
                </p>
              </div>
            </div>

            {/* Schedule */}
            <div>
              <h3 className="mb-2 text-sm font-medium text-gray-400">
                SCHEDULE
              </h3>

              <div className="rounded-lg border border-gray-800 bg-gray-950 p-4">
                <p>{taskDetails.date}</p>
                <p className="text-sm text-gray-400">
                  {taskDetails.time_slot}
                </p>
              </div>
            </div>

            {/* Job Logs */}
            <div>
              <h3 className="mb-2 text-sm font-medium text-gray-400">
                JOB LOGS
              </h3>

              <div className="space-y-3">
                {jobLogs.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No job logs yet.
                  </p>
                ) : (
                  jobLogs.map((log) => (
                    <div
                      key={log.id}
                      className="rounded-lg border border-gray-800 bg-gray-950 p-4"
                    >
                      <p className="text-sm">
                        {log.notes}
                      </p>

                      <p className="mt-2 text-xs text-gray-500">
                        {new Date(
                          log.created_at
                        ).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>

              {/* Add Log */}
              <div className="mt-4">
                <textarea
                  value={notes}
                  onChange={(e) =>
                    setNotes(e.target.value)
                  }
                  placeholder="Add a job note..."
                  className="w-full rounded-lg border border-gray-800 bg-gray-950 p-3 text-sm text-white outline-none focus:border-gray-600"
                  rows={3}
                />

                <button
                  onClick={handleAddLog}
                  disabled={!notes.trim()}
                  className="mt-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-black disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Add Log
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 border-t border-gray-800 pt-5">
              <button
                onClick={() =>
                  handleStatusChange("CANCELLED")
                }
                className="rounded-md border border-red-500/40 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
              >
                Cancel Job
              </button>

              <button
                onClick={() =>
                  handleStatusChange("COMPLETED")
                }
                className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-500"
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