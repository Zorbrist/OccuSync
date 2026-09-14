import { useMemo, useState } from "react";
import useJobsCalendar  from "../../hooks/adminHooks/useJobsCalendar"; // adjust path to your project
import type { CalendarJob, JobStatus } from "../../types/adminType"; // adjust path to your project

const STATUS_STYLES: Record<JobStatus, string> = {
  PENDING: "bg-[#C77C3B]/20 text-[#C77C3B] border-[#C77C3B]/40",
  CONFIRMED: "bg-[#3B8CC7]/20 text-[#5FA3D6] border-[#3B8CC7]/40",
  COMPLETED: "bg-[#4C9A6A]/20 text-[#4C9A6A] border-[#4C9A6A]/40",
  CANCELLED: "bg-[#C1503F]/20 text-[#C1503F] border-[#C1503F]/40",
};

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_LABELS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function toDateKey(dateStr: string): string {
  return dateStr.slice(0, 10);
}

interface JobCalendarProps {
  /** Optionally scope the calendar to one business. Omit to show all businesses. */
  businessId?: string;
  /** Called when a job chip is clicked, e.g. to open a job detail drawer. */
  onSelectJob?: (job: CalendarJob) => void;
}

export function JobCalendar({ businessId, onSelectJob }: JobCalendarProps) {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1); // 1-12
  const [year, setYear] = useState(today.getFullYear());

  const { jobs, loading, error } = useJobsCalendar({ month, year, business_id: businessId });

  const jobsByDay = useMemo(() => {
    const map = new Map<string, CalendarJob[]>();
    for (const job of jobs) {
      const key = toDateKey(job.date);
      const existing = map.get(key) ?? [];
      existing.push(job);
      map.set(key, existing);
    }
    for (const list of map.values()) {
      list.sort((a, b) => (a.time_slot ?? "").localeCompare(b.time_slot ?? ""));
    }
    return map;
  }, [jobs]);

  const cells = useMemo(() => {
    const firstOfMonth = new Date(year, month - 1, 1);
    const daysInMonth = new Date(year, month, 0).getDate();
    const leadingBlanks = firstOfMonth.getDay();

    const result: Array<{ day: number; dateKey: string } | null> = [];
    for (let i = 0; i < leadingBlanks; i++) result.push(null);
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      result.push({ day, dateKey });
    }
    return result;
  }, [month, year]);

  const goPrevMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const goNextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  };

  const goToday = () => {
    setMonth(today.getMonth() + 1);
    setYear(today.getFullYear());
  };

  const todayKey = today.toISOString().slice(0, 10);

  return (
    <div className="rounded-md border border-[#2A2E36] bg-[#1D2026] text-[#E7E5E0]">
      <div className="flex items-center justify-between border-b border-[#2A2E36] px-4 py-3">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-medium">
            {MONTH_LABELS[month - 1]} {year}
          </h3>
          {loading && <span className="text-xs text-[#8B8F98]">Loading...</span>}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={goPrevMonth}
            aria-label="Previous month"
            className="rounded px-2 py-1 text-sm text-[#8B8F98] hover:bg-[#2A2E36] hover:text-[#E7E5E0]"
          >
            Prev
          </button>
          <button
            onClick={goToday}
            className="rounded px-2 py-1 text-sm text-[#8B8F98] hover:bg-[#2A2E36] hover:text-[#E7E5E0]"
          >
            Today
          </button>
          <button
            onClick={goNextMonth}
            aria-label="Next month"
            className="rounded px-2 py-1 text-sm text-[#8B8F98] hover:bg-[#2A2E36] hover:text-[#E7E5E0]"
          >
            Next
          </button>
        </div>
      </div>

      {error && (
        <div className="border-b border-[#2A2E36] px-4 py-2 text-sm text-[#C1503F]">{error}</div>
      )}

      <div className="grid grid-cols-7 border-b border-[#2A2E36] text-xs text-[#8B8F98]">
        {WEEKDAY_LABELS.map((label) => (
          <div key={label} className="px-2 py-2 text-center">
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {cells.map((cell, idx) => {
          if (!cell) {
            return <div key={`blank-${idx}`} className="min-h-[92px] border-b border-r border-[#2A2E36]" />;
          }

          const dayJobs = jobsByDay.get(cell.dateKey) ?? [];
          const isToday = cell.dateKey === todayKey;

          return (
            <div
              key={cell.dateKey}
              className="min-h-[92px] border-b border-r border-[#2A2E36] p-1.5"
            >
              <div
                className={`mb-1 inline-flex h-5 w-5 items-center justify-center rounded text-xs font-mono ${
                  isToday ? "bg-[#C77C3B] text-[#14161A]" : "text-[#8B8F98]"
                }`}
              >
                {cell.day}
              </div>
              <div className="flex flex-col gap-1">
                {dayJobs.slice(0, 3).map((job) => (
                  <button
                    key={job.id}
                    onClick={() => onSelectJob?.(job)}
                    className={`truncate rounded border px-1.5 py-0.5 text-left text-[11px] font-mono leading-tight ${STATUS_STYLES[job.status]}`}
                    title={`${job.time_slot ?? ""} ${job.customer_name} — ${job.service_name}`}
                  >
                    {job.time_slot ? job.time_slot.slice(0, 5) : "--:--"} {job.customer_name}
                  </button>
                ))}
                {dayJobs.length > 3 && (
                  <span className="px-1.5 text-[11px] text-[#8B8F98]">
                    +{dayJobs.length - 3} more
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}