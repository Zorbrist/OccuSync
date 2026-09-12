// JobsCalendar.tsx
//
// Month/week calendar of scheduled jobs. Fetches its own data window via
// useJobsCalendar and refetches whenever the visible range changes
// (navigating months/weeks, or toggling view mode).
//
// Note on dates: range boundaries are sent as "YYYY-MM-DD" (local date,
// midnight). This is simple and fine for most timezones but can be off
// by a day right at midnight in some timezones — swap in a proper TZ-aware
// date library (date-fns-tz, Luxon) if that matters for your users.
import { useMemo, useState } from 'react';
import useJobsCalendar from '../../hooks/adminHooks/useJobsCalendar';
import type { CalendarJob, JobStatus } from '../../types/adminType';

type ViewMode = 'month' | 'week';

const DOT_STYLES: Record<JobStatus, string> = {
  PENDING: 'bg-zinc-400',
  CONFIRMED: 'bg-cyan-400',
  ASSIGNED: 'bg-blue-400',
  IN_PROGRESS: 'bg-amber-400',
  COMPLETED: 'bg-emerald-400',
  CANCELLED: 'bg-red-400',
};

const BADGE_STYLES: Record<JobStatus, string> = {
  PENDING: 'bg-zinc-800 text-zinc-300 border-zinc-700/50',
  CONFIRMED: 'bg-cyan-950 text-cyan-400 border-cyan-800/50',
  ASSIGNED: 'bg-blue-950 text-blue-400 border-blue-800/50',
  IN_PROGRESS: 'bg-amber-950 text-amber-400 border-amber-800/50',
  COMPLETED: 'bg-emerald-950 text-emerald-400 border-emerald-800/50',
  CANCELLED: 'bg-red-950 text-red-400 border-red-800/50',
};

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// --- date helpers (local time, no external deps) --------------------------

const toDateKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const addDays = (d: Date, n: number) => {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + n);
  return copy;
};

const startOfWeek = (d: Date) => {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  copy.setDate(copy.getDate() - copy.getDay());
  return copy;
};

const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);

export default function JobsCalendar() {
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [anchorDate, setAnchorDate] = useState(() => new Date());
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);

  // Visible grid cells + the fetch range, derived from view mode + anchor.
  const { gridDays, rangeStart, rangeEnd, rangeLabel } = useMemo(() => {
    if (viewMode === 'week') {
      const start = startOfWeek(anchorDate);
      const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
      const end = addDays(start, 7);
      const label = `${days[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${days[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
      return { gridStart: start, gridDays: days, rangeStart: start, rangeEnd: end, rangeLabel: label };
    }

    // month view: always render 6 full weeks (42 cells) so the grid never reflows
    const start = startOfWeek(startOfMonth(anchorDate));
    const days = Array.from({ length: 42 }, (_, i) => addDays(start, i));
    const end = addDays(start, 42);
    const label = anchorDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    return { gridStart: start, gridDays: days, rangeStart: start, rangeEnd: end, rangeLabel: label };
  }, [viewMode, anchorDate]);

  const { jobs, loading, error } = useJobsCalendar(toDateKey(rangeStart), toDateKey(rangeEnd));

  // Group fetched jobs by local date key for O(1) lookup per cell.
  const jobsByDate = useMemo(() => {
    const map = new Map<string, CalendarJob[]>();
    jobs.forEach((job) => {
      const key = toDateKey(new Date(job.scheduled_start));
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(job);
    });
    return map;
  }, [jobs]);

  const goToday = () => {
    setAnchorDate(new Date());
    setSelectedDateKey(null);
  };

  const goPrev = () => {
    setAnchorDate((prev) => (viewMode === 'week' ? addDays(prev, -7) : addDays(startOfMonth(prev), -1)));
    setSelectedDateKey(null);
  };

  const goNext = () => {
    setAnchorDate((prev) => (viewMode === 'week' ? addDays(prev, 7) : addDays(startOfMonth(prev), 32)));
    setSelectedDateKey(null);
  };

  const todayKey = toDateKey(new Date());
  const selectedJobs = selectedDateKey ? jobsByDate.get(selectedDateKey) ?? [] : [];

  return (
    <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
      {/* controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <h4 className="font-bold text-sm text-zinc-100">{rangeLabel}</h4>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous"
              className="h-7 w-7 flex items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next"
              className="h-7 w-7 flex items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
            >
              ›
            </button>
            <button
              type="button"
              onClick={goToday}
              className="text-xs font-bold underline text-emerald-400 hover:opacity-80 ml-1"
            >
              Today
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-zinc-800/60 rounded-xl p-1 self-start">
          {(['month', 'week'] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setViewMode(mode)}
              className={
                mode === viewMode
                  ? 'px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-800 text-emerald-400 border border-emerald-500/30'
                  : 'px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-400 hover:text-zinc-200'
              }
            >
              {mode === 'month' ? 'Month' : 'Week'}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-red-400 mb-3">{error}</p>}

      {/* weekday header */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {WEEKDAY_LABELS.map((label) => (
          <div key={label} className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 text-center">
            {label}
          </div>
        ))}
      </div>

      {/* grid */}
      <div className={`grid grid-cols-7 gap-2 ${loading ? 'opacity-50' : ''}`}>
        {gridDays.map((day) => {
          const key = toDateKey(day);
          const dayJobs = jobsByDate.get(key) ?? [];
          const isCurrentMonth = viewMode === 'week' || day.getMonth() === anchorDate.getMonth();
          const isToday = key === todayKey;
          const isSelected = key === selectedDateKey;

          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedDateKey((prev) => (prev === key ? null : key))}
              className={`flex flex-col rounded-xl border p-2 text-left transition-colors ${
                viewMode === 'week' ? 'min-h-[120px]' : 'min-h-[64px]'
              } ${
                isSelected
                  ? 'bg-zinc-800 border-emerald-500/40'
                  : 'bg-zinc-950/50 border-zinc-800 hover:border-zinc-700'
              } ${!isCurrentMonth ? 'opacity-40' : ''}`}
            >
              <span
                className={`text-xs font-semibold ${
                  isToday ? 'h-5 w-5 rounded-full bg-emerald-500 text-black flex items-center justify-center' : 'text-zinc-300'
                }`}
              >
                {day.getDate()}
              </span>

              {viewMode === 'month' ? (
                <div className="flex flex-wrap gap-1 mt-2">
                  {dayJobs.slice(0, 4).map((job) => (
                    <span key={job.id} className={`h-1.5 w-1.5 rounded-full ${DOT_STYLES[job.status]}`} />
                  ))}
                  {dayJobs.length > 4 && (
                    <span className="text-[10px] text-zinc-500">+{dayJobs.length - 4}</span>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-1 mt-2">
                  {dayJobs.slice(0, 3).map((job) => (
                    <span
                      key={job.id}
                      className={`text-[10px] px-1.5 py-0.5 rounded-full border truncate ${BADGE_STYLES[job.status]}`}
                    >
                      {job.service_name}
                    </span>
                  ))}
                  {dayJobs.length > 3 && (
                    <span className="text-[10px] text-zinc-500">+{dayJobs.length - 3} more</span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* selected day detail */}
      {selectedDateKey && (
        <div className="mt-5 pt-4 border-t border-zinc-800">
          <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">
            {new Date(`${selectedDateKey}T00:00:00`).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </h5>
          {selectedJobs.length === 0 ? (
            <p className="text-sm text-zinc-500">No jobs scheduled.</p>
          ) : (
            <div className="space-y-2">
              {selectedJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between text-sm py-1.5 border-t border-zinc-800 first:border-t-0">
                  <span className="text-zinc-300">
                    <span className="font-semibold text-zinc-100">{job.customer_name}</span>{' '}
                    — <span className="italic">{job.service_name}</span> at {job.business_name}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${BADGE_STYLES[job.status]}`}>
                    {job.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}