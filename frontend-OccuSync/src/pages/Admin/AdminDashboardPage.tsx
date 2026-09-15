
import { useState } from "react";

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
} from  "recharts";

import { useAdminDashboard } from "../../hooks/adminHooks/useAdminDashboard";
import BusinessApprovalModal from "../../components/Admin/BusinessApprovalModal";
import type { PendingBusiness } from "../../types/adminType";

// ==============================
// Theme
// ==============================

const CHART_COLORS = [
  "#8b5cf6",
  "#6366f1",
  "#a855f7",
];

const GRID_STROKE = "#27272a";

const AXIS_TICK = {
  fill: "#71717a",
  fontSize: 12,
};

const TOOLTIP_STYLE = {
  backgroundColor: "#18181b",
  border: "1px solid #3f3f46",
  borderRadius: "0.75rem",
  color: "#f4f4f5",
  fontSize: "0.875rem",
};

const TOOLTIP_LABEL_STYLE = {
  color: "#f4f4f5",
};

const LEGEND_STYLE = {
  color: "#a1a1aa",
};

// ==============================
// Component
// ==============================

export default function AdminDashboard() {
  const {
    data,
    loading,
    error,
    updateBusinessStatusInDashboard,
  } = useAdminDashboard();

  const [selectedBusiness, setSelectedBusiness] =
    useState<PendingBusiness | null>(null);

  // ==============================
  // Loading
  // ==============================

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center bg-zinc-950">
        <p className="text-zinc-500">
          Loading dashboard...
        </p>
      </div>
    );
  }

  // ==============================
  // Error
  // ==============================

  if (error || !data) {
    return (
      <div className="flex min-h-[400px] items-center justify-center bg-zinc-950">
        <p className="text-red-400">
          {error || "Failed to load dashboard"}
        </p>
      </div>
    );
  }

  // ==============================
  // Chart Data
  // ==============================

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

  const registrationData =
    data.recent_registrations.map((item) => ({
      date: new Date(item.date).toLocaleDateString(
        "en-MY",
        {
          day: "2-digit",
          month: "short",
        }
      ),
      registrations: item.count,
    }));

  // ==============================
  // Main
  // ==============================

  return (
    <div className="min-h-screen space-y-6 bg-zinc-950 p-6 text-zinc-100">

      {/* =========================================
          Header
      ========================================= */}

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Admin Dashboard
        </h1>

        <p className="mt-1 text-sm text-zinc-400">
          Overview of OccuSync's platform activity.
        </p>
      </div>

      {/* =========================================
          KPI Cards
      ========================================= */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* Total Users */}

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-colors hover:border-violet-500/20">
          <p className="text-sm text-zinc-400">
            Total Users
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {data.user_overview.total_users}
          </p>

          <p className="mt-1 text-xs text-zinc-500">
            Customers + Business Providers
          </p>
        </div>

        {/* Total Services */}

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-colors hover:border-violet-500/20">
          <p className="text-sm text-zinc-400">
            Total Services
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {data.service_job_overview.total_services}
          </p>

          <p className="mt-1 text-xs text-zinc-500">
            Services available
          </p>
        </div>

        {/* Completed Jobs */}

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-colors hover:border-violet-500/20">
          <p className="text-sm text-zinc-400">
            Completed Jobs
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {data.service_job_overview.jobs_completed}
          </p>

          <p className="mt-1 text-xs text-zinc-500">
            Successfully completed
          </p>
        </div>

        {/* Transaction Value */}

        <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-5 shadow-[0_0_25px_rgba(139,92,246,0.08)]">
          <p className="text-sm text-zinc-400">
            Transaction Value
          </p>

          <p className="mt-2 text-3xl font-bold text-violet-300">
            RM{" "}
            {Number(
              data.total_transaction_value
            ).toLocaleString("en-MY", {
              minimumFractionDigits: 2,
            })}
          </p>

          <p className="mt-1 text-xs text-zinc-500">
            From paid invoices
          </p>
        </div>
      </div>

      {/* =========================================
          Pending Businesses
      ========================================= */}

      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40">

        {/* Header */}

        <div className="border-b border-zinc-800 px-6 py-5">
          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-lg font-semibold text-white">
                Pending Business Registrations
              </h2>

              <p className="mt-1 text-sm text-zinc-400">
                Businesses waiting for admin approval
              </p>
            </div>

            <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
              {data.pending_businesses.length} Pending
            </span>

          </div>
        </div>

        {/* Table */}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">

            <thead className="bg-zinc-900/70 text-xs uppercase tracking-wider text-zinc-500">
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

            <tbody className="divide-y divide-zinc-800/70">

              {data.pending_businesses.map(
                (business) => (
                  <tr
                    key={business.id}
                    onClick={() =>
                      setSelectedBusiness(business)
                    }
                    className="cursor-pointer transition-colors hover:bg-violet-500/5"
                  >

                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-zinc-100">
                          {business.name}
                        </p>

                        <p className="mt-0.5 text-xs text-zinc-600">
                          {business.id}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-zinc-400">
                      {business.registration_no}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-300">
                        {business.industry}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-zinc-400">
                      {business.email}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400">
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
                    className="px-6 py-10 text-center"
                  >
                    <p className="text-sm text-zinc-500">
                      No pending businesses.
                    </p>

                    <p className="mt-1 text-xs text-zinc-600">
                      All business registrations have been reviewed.
                    </p>
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================
          Charts
      ========================================= */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* User Distribution */}

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">

          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">
              User Distribution
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              Customers vs business providers
            </p>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
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
                  {userChartData.map(
                    (_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          CHART_COLORS[
                            index %
                              CHART_COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  labelStyle={TOOLTIP_LABEL_STYLE}
                />

                <Legend
                  wrapperStyle={LEGEND_STYLE}
                />

              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Business Members */}

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">

          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">
              Business Members
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              Number of members under each business
            </p>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={data.business_analytics}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={GRID_STROKE}
                />

                <XAxis
                  dataKey="business_name"
                  tick={AXIS_TICK}
                />

                <YAxis
                  allowDecimals={false}
                  tick={AXIS_TICK}
                />

                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  labelStyle={TOOLTIP_LABEL_STYLE}
                  cursor={{
                    fill: "rgba(139,92,246,0.05)",
                  }}
                />

                <Bar
                  dataKey="member_count"
                  name="Members"
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                />

              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* =========================================
          Job Overview + Registration Chart
      ========================================= */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Job Overview */}

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">

          <div className="mb-5">
            <h2 className="text-lg font-semibold text-white">
              Job Overview
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              Current job activity
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 transition-colors hover:border-violet-500/20">
              <p className="text-sm text-zinc-400">
                Completed
              </p>

              <p className="mt-2 text-2xl font-bold text-white">
                {
                  data.service_job_overview
                    .jobs_completed
                }
              </p>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 transition-colors hover:border-violet-500/20">
              <p className="text-sm text-zinc-400">
                In Progress
              </p>

              <p className="mt-2 text-2xl font-bold text-white">
                {
                  data.service_job_overview
                    .jobs_pending_or_confirmed
                }
              </p>
            </div>

          </div>
        </div>

        {/* User Registrations */}

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">

          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">
              User Registrations
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              Registrations over the last 30 days
            </p>
          </div>

          <div className="h-[250px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart
                data={registrationData}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={GRID_STROKE}
                />

                <XAxis
                  dataKey="date"
                  tick={AXIS_TICK}
                />

                <YAxis
                  allowDecimals={false}
                  tick={AXIS_TICK}
                />

                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  labelStyle={TOOLTIP_LABEL_STYLE}
                />

                <Line
                  type="monotone"
                  dataKey="registrations"
                  name="Registrations"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{
                    fill: "#8b5cf6",
                    r: 3,
                  }}
                  activeDot={{
                    r: 5,
                  }}
                />

              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* =========================================
          Latest Jobs
      ========================================= */}

      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40">

        <div className="border-b border-zinc-800 px-6 py-5">
          <h2 className="text-lg font-semibold text-white">
            Latest Jobs
          </h2>

          <p className="mt-1 text-sm text-zinc-400">
            The 5 most recently created jobs
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">

            <thead className="bg-zinc-900/70 text-xs uppercase tracking-wider text-zinc-500">
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

            <tbody className="divide-y divide-zinc-800/70">

              {data.latest_jobs.map((job) => (
                <tr
                  key={job.id}
                  className="transition-colors hover:bg-violet-500/5"
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
                        ).toLocaleDateString(
                          "en-MY"
                        )
                      : "-"}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${
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

              {data.latest_jobs.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-sm text-zinc-500"
                  >
                    No jobs found.
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================
          Business Approval Modal
      ========================================= */}

      {selectedBusiness && (
        <BusinessApprovalModal
          business={selectedBusiness}
          onClose={() =>
            setSelectedBusiness(null)
          }
          onStatusUpdated={
            updateBusinessStatusInDashboard
          }
        />
      )}
    </div>
  );
}

