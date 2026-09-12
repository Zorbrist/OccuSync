
import { useState } from 'react';
import useAdminDashboard from '../../hooks/adminHooks/useAdmin';
import type { JobStatus } from '../../types/adminType';
import JobsCalendar from '../../components/admin_components/jobs_calendar';


const formatDateTime = (value: string | null) => {
  if (!value) return '—';
  return new Date(value).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};

const formatGreetingTimestamp = () =>
  new Date()
    .toLocaleString('en-US', {
      weekday: 'long',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    .toUpperCase();

// --- status → badge color mapping (core Tailwind palette only) --------

const JOB_STATUS_STYLES: Record<JobStatus, string> = {
  PENDING: 'bg-zinc-800 text-zinc-300 border-zinc-700/50',
  CONFIRMED: 'bg-cyan-950 text-cyan-400 border-cyan-800/50',
  ASSIGNED: 'bg-blue-950 text-blue-400 border-blue-800/50',
  IN_PROGRESS: 'bg-amber-950 text-amber-400 border-amber-800/50',
  COMPLETED: 'bg-emerald-950 text-emerald-400 border-emerald-800/50',
  CANCELLED: 'bg-red-950 text-red-400 border-red-800/50',
};

const JOB_STATUS_ORDER: JobStatus[] = [
  'PENDING',
  'CONFIRMED',
  'ASSIGNED',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED',
];

const Badge = ({ className, children }: { className: string; children: React.ReactNode }) => (
  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${className}`}>
    {children}
  </span>
);

// --- small building blocks ----------------------------------------------

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-xs font-bold tracking-wider uppercase text-zinc-500 px-1">{children}</h3>
);

interface StatCardProps {
  label: string;
  value: string | number;
  badge: string;
  sub: string;
}

const StatCard = ({ label, value, badge, sub }: StatCardProps) => (
  <div className="h-full flex flex-col p-5 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
    <div className="flex justify-between items-start">
      <Badge className="bg-emerald-950 text-emerald-400 border-emerald-800/50">{badge}</Badge>
      <span className="text-xs text-zinc-500">{label}</span>
    </div>
    <h4 className="text-2xl font-bold mt-3 text-zinc-100">{value}</h4>
    <p className="text-xs text-zinc-500 mt-auto pt-2">{sub}</p>
  </div>
);

// --- loading / error states ----------------------------------------------

const CenteredMessage = ({ children }: { children: React.ReactNode }) => (
  <main className="flex-1 flex items-center justify-center p-8 text-zinc-400 text-sm">
    {children}
  </main>
);

// --- main page -------------------------------------------------------------

export default function AdminDashboardPage() {
  const { data, loading, error, refetch } = useAdminDashboard();
  const [showAllJobs, setShowAllJobs] = useState(false);

  if (loading && !data) {
    return <CenteredMessage>Loading dashboard…</CenteredMessage>;
  }

  if (error) {
    return (
      <CenteredMessage>
        <div className="text-center space-y-3">
          <p className="text-red-400 font-semibold">{error}</p>
          <button
            type="button"
            onClick={refetch}
            className="text-xs font-bold underline text-emerald-400 hover:opacity-80"
          >
            [Try Again]
          </button>
        </div>
      </CenteredMessage>
    );
  }

  if (!data) {
    return <CenteredMessage>No dashboard data available.</CenteredMessage>;
  }

  const { overview, jobs, recentJobs, topBusinesses } = data;

  // recentJobs comes from the API capped at 10; toggle just slices the view.
  const visibleJobs = recentJobs.slice(0, showAllJobs ? 10 : 5);

  return (
    <main className="flex-1 overflow-y-auto p-8 space-y-6">
      {/* HEADER — greeting left, Total Users card top-right */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-emerald-400">Hello, Admin</h1>
          <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mt-1">
            {formatGreetingTimestamp()}
          </p>
        </div>

        <div className="w-full sm:w-64">
          <StatCard
            label="USERS"
            value={overview.totalUsers}
            badge={`+${overview.newUsersLast30Days}`}
            sub="New in last 30 days"
          />
        </div>
      </div>

      {/* STAT ROW — Customers, Services, Businesses */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="CUSTOMERS"
          value={overview.totalCustomers}
          badge="Total"
          sub="Registered customers"
        />
        <StatCard
          label="SERVICES"
          value={overview.totalServices}
          badge="Total"
          sub="Services listed"
        />
        <StatCard
          label="BUSINESSES"
          value={overview.totalBusinesses}
          badge="Total"
          sub="Registered businesses"
        />
      </div>

      {/* RECENT JOBS + TOP BUSINESSES — equal height */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <div className="h-full flex flex-col p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-bold text-sm text-zinc-100">Recent Jobs</h4>
            <span className="text-xs text-zinc-500">{visibleJobs.length} shown</span>
          </div>

          <div className="space-y-3 flex-1">
            {visibleJobs.length === 0 && <p className="text-sm text-zinc-500">No jobs yet.</p>}
            {visibleJobs.map((job) => (
              <div key={job.id} className="pt-2 border-t border-zinc-800 first:border-t-0 first:pt-0">
                <p className="text-sm text-zinc-300">
                  <span className="font-semibold text-zinc-100">{job.customer_name}</span>{' '}
                  booked <span className="italic">{job.service_name}</span> at {job.business_name}
                </p>
                <div className="flex items-center justify-between pt-1">
                  <Badge className={JOB_STATUS_STYLES[job.status]}>{job.status}</Badge>
                  <span className="text-xs text-zinc-500">{formatDateTime(job.created_at)}</span>
                </div>
              </div>
            ))}
          </div>

          {recentJobs.length > 5 && (
            <button
              type="button"
              onClick={() => setShowAllJobs((prev) => !prev)}
              className="text-xs font-bold underline text-emerald-400 hover:opacity-80 pt-3 self-start"
            >
              {showAllJobs ? '[Show Less]' : '[Show Last 10]'}
            </button>
          )}
        </div>

        <div className="h-full flex flex-col p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
          <h4 className="font-bold text-sm text-zinc-100 mb-3">Top Businesses</h4>
          <div className="space-y-1 flex-1">
            {topBusinesses.length === 0 && (
              <p className="text-sm text-zinc-500">No business activity yet.</p>
            )}
            {topBusinesses.map((business, index) => (
              <div
                key={business.id}
                className="flex items-center justify-between text-sm py-2 border-t border-zinc-800 first:border-t-0 text-zinc-300"
              >
                <span>
                  <span className="text-zinc-500 mr-2">{index + 1}.</span>
                  {business.name}
                </span>
                <span className="text-xs text-zinc-500">{business.job_count} jobs</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* JOB OVERVIEW — 2x3 status grid */}
      <div className="space-y-3">
        <SectionLabel>Job Overview</SectionLabel>
        <div className="grid grid-cols-2 sm:grid-cols-3 grid-rows-3 sm:grid-rows-2 gap-4">
          {JOB_STATUS_ORDER.map((status) => (
            <div
              key={status}
              className="h-full flex flex-col p-5 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-[0_0_20px_rgba(0,0,0,0.8)]"
            >
              <div className="flex justify-between items-start">
                <Badge className={JOB_STATUS_STYLES[status]}>{status.replace('_', ' ')}</Badge>
              </div>
              <h4 className="text-2xl font-bold mt-3 text-zinc-100">{jobs.byStatus[status]}</h4>
              <p className="text-xs text-zinc-500 mt-auto pt-2">Jobs {status.toLowerCase().replace('_', ' ')}</p>
            </div>
          ))}
        </div>
      </div>

      {/* JOBS CALENDAR */}
      <div className="space-y-3">
        <SectionLabel>Jobs Calendar</SectionLabel>
        <JobsCalendar />
      </div>
    </main>
  );
}