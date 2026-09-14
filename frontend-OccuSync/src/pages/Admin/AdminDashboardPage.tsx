import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

import { useAdminDashboard } from "../../hooks/adminHooks/useAdminDashboard";

// Theme tokens (matching the admin sidebar theme)
const CHART_COLORS = ["#10b981", "#06b6d4", "#14b8a6"]; // emerald-500, cyan-500, teal-500
const GRID_STROKE = "#27272a"; // zinc-800
const AXIS_TICK = { fill: "#71717a", fontSize: 12 }; // zinc-500
const TOOLTIP_STYLE = {
  backgroundColor: "#18181b", // zinc-900
  border: "1px solid #27272a", // zinc-800
  borderRadius: "0.5rem",
  color: "#f4f4f5", // zinc-100
  fontSize: "0.875rem",
};
const TOOLTIP_LABEL_STYLE = { color: "#f4f4f5" };
const LEGEND_STYLE = { color: "#a1a1aa" }; // zinc-400

const AdminDashboard = () => {
  const { data, loading, error } = useAdminDashboard();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-stone-950">
        <p className="text-zinc-500">Loading dashboard...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-stone-950">
        <p className="text-red-400">
          {error || "Failed to load dashboard"}
        </p>
      </div>
    );
  }

  const userChartData = [
    {
      name: "Customers",
      value: data.user_overview.total_customers,
    },
    {
      name: "Business Providers",
      value: data.user_overview.total_business_providers,
    },
  ];

  const registrationData = data.recent_registrations.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-MY", {
      day: "2-digit",
      month: "short",
    }),
    registrations: item.count,
  }));

  return (
    <div className="space-y-6 p-6 bg-stone-950 text-zinc-100">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">
          Admin Dashboard
        </h1>

        <p className="mt-1 text-sm text-zinc-400">
          Overview of OccuSync's platform activity.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Users */}
        <div className="rounded-xl border border-zinc-800 bg-stone-950 p-5 shadow-[0_0_25px_rgba(255,255,255,0.05)]">
          <p className="text-sm text-zinc-400">
            Total Users
          </p>

          <p className="mt-2 text-3xl font-bold text-zinc-100">
            {data.user_overview.total_users}
          </p>

          <p className="mt-1 text-xs text-zinc-500">
            Customers + Business Providers
          </p>
        </div>

        {/* Total Services */}
        <div className="rounded-xl border border-zinc-800 bg-stone-950 p-5 shadow-[0_0_25px_rgba(255,255,255,0.05)]">
          <p className="text-sm text-zinc-400">
            Total Services
          </p>

          <p className="mt-2 text-3xl font-bold text-zinc-100">
            {data.service_job_overview.total_services}
          </p>
        </div>

        {/* Completed Jobs */}
        <div className="rounded-xl border border-zinc-800 bg-stone-950 p-5 shadow-[0_0_25px_rgba(255,255,255,0.05)]">
          <p className="text-sm text-zinc-400">
            Completed Jobs
          </p>

          <p className="mt-2 text-3xl font-bold text-zinc-100">
            {data.service_job_overview.jobs_completed}
          </p>
        </div>

        {/* Transaction Value */}
        <div className="rounded-xl border border-emerald-500/30 bg-stone-950 p-5 shadow-[0_0_15px_rgba(52,211,153,0.2)]">
          <p className="text-sm text-zinc-400">
            Transaction Value
          </p>

          <p className="mt-2 text-3xl font-bold text-emerald-400">
            RM{" "}
            {Number(
              data.total_transaction_value
            ).toLocaleString("en-MY", {
              minimumFractionDigits: 2,
            })}
          </p>

          <p className="mt-1 text-xs text-zinc-500">
            Paid invoices
          </p>
        </div>
      </div>

      {/* Pending Businesses */}
      <div className="rounded-xl border border-zinc-800 bg-stone-950 shadow-[0_0_25px_rgba(255,255,255,0.05)]">
        <div className="border-b border-zinc-800 p-6">
          <h2 className="text-lg font-semibold text-zinc-100">
            Pending Business Registrations
          </h2>

          <p className="text-sm text-zinc-400">
            Businesses waiting for admin approval
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-900 text-xs uppercase text-zinc-500">
              <tr>
                <th className="px-6 py-3">
                  Business
                </th>

                <th className="px-6 py-3">
                  Registration No.
                </th>

                <th className="px-6 py-3">
                  Industry
                </th>

                <th className="px-6 py-3">
                  Email
                </th>

                <th className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-800">
              {data.pending_businesses.map(
                (business) => (
                  <tr
                    key={business.id}
                    className="hover:bg-zinc-900"
                  >
                    <td className="px-6 py-4 font-medium text-zinc-100">
                      {business.name}
                    </td>

                    <td className="px-6 py-4 text-zinc-400">
                      {business.registration_no}
                    </td>

                    <td className="px-6 py-4 text-zinc-400">
                      {business.industry}
                    </td>

                    <td className="px-6 py-4 text-zinc-400">
                      {business.email}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-medium text-emerald-400">
                        {business.approval_status}
                      </span>
                    </td>
                  </tr>
                )
              )}

              {data.pending_businesses.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-zinc-500"
                  >
                    No pending businesses.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* User Distribution */}
        <div className="rounded-xl border border-zinc-800 bg-stone-950 p-6 shadow-[0_0_25px_rgba(255,255,255,0.05)]">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-zinc-100">
              User Distribution
            </h2>

            <p className="text-sm text-zinc-400">
              Customers vs business providers
            </p>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {userChartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  labelStyle={TOOLTIP_LABEL_STYLE}
                />

                <Legend wrapperStyle={LEGEND_STYLE} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Business Members */}
        <div className="rounded-xl border border-zinc-800 bg-stone-950 p-6 shadow-[0_0_25px_rgba(255,255,255,0.05)]">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-zinc-100">
              Business Members
            </h2>

            <p className="text-sm text-zinc-400">
              Number of members under each business
            </p>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.business_analytics}>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />

                <XAxis
                  dataKey="business_name"
                  tick={AXIS_TICK}
                />

                <YAxis allowDecimals={false} tick={AXIS_TICK} />

                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  labelStyle={TOOLTIP_LABEL_STYLE}
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                />

                <Bar
                  dataKey="member_count"
                  name="Members"
                  fill="#34d399"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Job Overview + Registration Chart */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Job Overview */}
        <div className="rounded-xl border border-zinc-800 bg-stone-950 p-6 shadow-[0_0_25px_rgba(255,255,255,0.05)]">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-zinc-100">
              Job Overview
            </h2>

            <p className="text-sm text-zinc-400">
              Current job activity
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-4">
              <p className="text-sm text-zinc-400">
                Completed
              </p>

              <p className="mt-2 text-2xl font-bold text-zinc-100">
                {data.service_job_overview.jobs_completed}
              </p>
            </div>

            <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-4">
              <p className="text-sm text-zinc-400">
                In Progress
              </p>

              <p className="mt-2 text-2xl font-bold text-zinc-100">
                {data.service_job_overview.jobs_pending_or_confirmed}
              </p>
            </div>
          </div>
        </div>

        {/* User Registrations */}
        <div className="rounded-xl border border-zinc-800 bg-stone-950 p-6 shadow-[0_0_25px_rgba(255,255,255,0.05)]">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-zinc-100">
              User Registrations
            </h2>

            <p className="text-sm text-zinc-400">
              Registrations over the last 30 days
            </p>
          </div>

          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={registrationData}>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />

                <XAxis dataKey="date" tick={AXIS_TICK} />

                <YAxis allowDecimals={false} tick={AXIS_TICK} />

                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  labelStyle={TOOLTIP_LABEL_STYLE}
                />

                <Line
                  type="monotone"
                  dataKey="registrations"
                  name="Registrations"
                  strokeWidth={2}
                  stroke="#2dd4bf"
                  dot={{ fill: "#2dd4bf", r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Latest Jobs */}
      <div className="rounded-xl border border-zinc-800 bg-stone-950 shadow-[0_0_25px_rgba(255,255,255,0.05)]">
        <div className="border-b border-zinc-800 p-6">
          <h2 className="text-lg font-semibold text-zinc-100">
            Latest Jobs
          </h2>

          <p className="text-sm text-zinc-400">
            The 5 most recently created jobs
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-900 text-xs uppercase text-zinc-500">
              <tr>
                <th className="px-6 py-3">
                  Service
                </th>

                <th className="px-6 py-3">
                  Customer
                </th>

                <th className="px-6 py-3">
                  Business
                </th>

                <th className="px-6 py-3">
                  Date
                </th>

                <th className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-800">
              {data.latest_jobs.map((job) => (
                <tr
                  key={job.id}
                  className="hover:bg-zinc-900"
                >
                  <td className="px-6 py-4 font-medium text-zinc-100">
                    {job.service_name}
                  </td>

                  <td className="px-6 py-4 text-zinc-400">
                    {job.customer_name}
                  </td>

                  <td className="px-6 py-4 text-zinc-400">
                    {job.business_name}
                  </td>

                  <td className="px-6 py-4 text-zinc-400">
                    {job.date
                      ? new Date(
                        job.date
                      ).toLocaleDateString("en-MY")
                      : "-"}
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-zinc-800 text-zinc-300 px-3 py-1 text-xs font-medium">
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}

              {data.latest_jobs.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-zinc-500"
                  >
                    No jobs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>


    </div>
  );
};

export default AdminDashboard;