import { useEffect } from "react";
import { useStaff } from "../../hooks/useStaff"

const StaffHistoryPage = () => {
  const {
    history,
    loading,
    error,
    fetchHistory,
  } = useStaff();

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  if (loading) {
    return (
      <div className="p-6 text-white">
        Loading history...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">
          Job History
        </h1>

        <p className="mt-1 text-sm text-gray-400">
          View your completed and cancelled jobs.
        </p>
      </div>

      {history.length === 0 ? (
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-8 text-center">
          <p className="text-gray-400">
            No job history yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((job) => (
            <div
              key={job.job_id}
              className="rounded-lg border border-gray-800 bg-gray-900 p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-medium">
                    {job.service_name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-400">
                    Customer: {job.first_name}{" "}
                    {job.last_name}
                  </p>

                  <p className="text-sm text-gray-400">
                    {job.date} · {job.time_slot}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    job.status === "COMPLETED"
                      ? "bg-green-500/10 text-green-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {job.status}
                </span>
              </div>

              <p className="mt-3 text-sm text-gray-400">
                {job.service_description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StaffHistoryPage;