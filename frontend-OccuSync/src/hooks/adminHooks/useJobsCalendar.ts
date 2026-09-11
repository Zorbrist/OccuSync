// useJobsCalendar.ts
//
// Separate from useAdminDashboard because the calendar's data window
// (start/end) changes as the admin navigates months/weeks, so it needs
// its own fetch-on-dependency-change behavior rather than a one-time load.
//
//   const { jobs, loading, error } = useJobsCalendar(start, end);
//
import { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import type { CalendarJob } from '../../types/adminType';

interface UseJobsCalendarResult {
  jobs: CalendarJob[];
  loading: boolean;
  error: string | null;
}

/**
 * @param start "YYYY-MM-DD", inclusive
 * @param end   "YYYY-MM-DD", exclusive
 */
const useJobsCalendar = (start: string, end: string): UseJobsCalendarResult => {
  const [jobs, setJobs] = useState<CalendarJob[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchJobs = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await adminService.getJobsCalendar(start, end);
        if (!cancelled) setJobs(result);
      } catch (err) {
        if (!cancelled) {
          const message =
            err instanceof Error ? err.message : 'Failed to load the calendar.';
          setError(message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchJobs();

    // Avoids setting state on an unmounted component if the range
    // changes again (or the component unmounts) before the request resolves.
    return () => {
      cancelled = true;
    };
  }, [start, end]);

  return { jobs, loading, error };
};

export default useJobsCalendar;