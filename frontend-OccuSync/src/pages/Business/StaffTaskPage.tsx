import { useEffect, useState } from "react";
import { useStaff } from "../../hooks/useStaff";
import StaffTaskDetails from "./StaffDetailsPage";

const StaffTasksPage = () => {
  const {
    tasks,
    loading,
    error,
    fetchTasks,
  } = useStaff();

  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (loading) {
    return (
      <div className="p-6 text-white">
        Loading tasks...
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
          My Tasks
        </h1>

        <p className="mt-1 text-sm text-gray-400">
          View and manage your assigned service jobs.
        </p>
      </div>

      {tasks.length === 0 ? (
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-8 text-center">
          <p className="text-gray-400">
            You currently have no assigned tasks.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.job_id}
              className="rounded-lg border border-gray-800 bg-gray-900 p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-medium">
                    {task.service_name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-400">
                    Customer: {task.first_name} {task.last_name}
                  </p>

                  <p className="text-sm text-gray-400">
                    {task.date} · {task.time_slot}
                  </p>
                </div>

                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                  {task.status}
                </span>
              </div>

              <p className="mt-3 text-sm text-gray-400">
                {task.service_description}
              </p>

              <button
                onClick={() => setSelectedJobId(task.job_id)}
                className="mt-4 rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-200"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

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