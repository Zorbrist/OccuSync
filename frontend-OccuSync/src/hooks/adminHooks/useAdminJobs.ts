import { useState, useEffect, useMemo } from "react";
import { getAllJobs } from "../../services/adminService";
import type { AdminJob } from "../../types/adminType";

export const useAdminJobs = () => {
  const [jobs, setJobs] = useState<AdminJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const data = await getAllJobs();
        setJobs(data.jobs);
      } catch (err) {
        setError("Failed to load platform jobs.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = 
        job.id.toString().includes(search) ||
        job.customer_name.toLowerCase().includes(search.toLowerCase()) ||
        job.business_name.toLowerCase().includes(search.toLowerCase());
      
      const matchesStatus = statusFilter === "ALL" || job.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [jobs, search, statusFilter]);

  return {
    jobs: filteredJobs,
    loading,
    error,
    search,
    changeSearch: setSearch,
    statusFilter,
    setStatusFilter,
  };
};