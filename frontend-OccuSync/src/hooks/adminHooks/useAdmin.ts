// useAdminDashboard.ts
//
// React hook wrapping adminService.getAdminDashboard with loading/error
// state and a manual refetch, so components can just do:
//
//   const { data, loading, error, refetch } = useAdminDashboard();
//
import { useState, useEffect, useCallback } from 'react';
import adminService from '../../services/adminService';
import type { AdminDashboardData } from '../../types/adminType';

interface UseAdminDashboardResult {
  data: AdminDashboardData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const useAdminDashboard = (): UseAdminDashboardResult => {
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await adminService.getAdminDashboard();
      setData(result);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong while loading the dashboard.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    data,
    loading,
    error,
    refetch: fetchDashboard,
  };
};

export default useAdminDashboard;