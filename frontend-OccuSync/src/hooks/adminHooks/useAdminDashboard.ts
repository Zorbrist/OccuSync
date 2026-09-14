import { useEffect, useState } from "react";
import { getAdminDashboard } from "../../services/adminService";
import type { AdminDashboard } from "../../types/adminType";

export const useAdminDashboard = () => {
  const [data, setData] = useState<AdminDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await getAdminDashboard();

        setData(result);
      } catch (err) {
        console.error("Failed to load admin dashboard:", err);

        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return {
    data,
    loading,
    error,
  };
};