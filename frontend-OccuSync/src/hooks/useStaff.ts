import { useCallback, useState } from "react";
import {
  getStaffTasks,
  getStaffTaskDetails,
  getStaffJobLogs,
  addStaffJobLog,
  updateStaffJobStatus,
  getStaffJobHistory,
} from "../services/businessService";

import type {
  StaffTask,
  StaffTaskDetails,
  JobLog,
  StaffJobHistory,
} from "../types/staffType";

export const useStaff = () => {
  const [tasks, setTasks] = useState<StaffTask[]>([]);
  const [taskDetails, setTaskDetails] = useState<StaffTaskDetails | null>(null);
  const [jobLogs, setJobLogs] = useState<JobLog[]>([]);
  const [history, setHistory] = useState<StaffJobHistory[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getStaffTasks();
      setTasks(data);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to fetch tasks"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTaskDetails = useCallback(async (jobId: number) => {
    try {
      setLoading(true);
      setError(null);

      const data = await getStaffTaskDetails(jobId);
      setTaskDetails(data);

      return data;
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to fetch task details"
      );
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchJobLogs = useCallback(async (jobId: number) => {
    try {
      setLoading(true);
      setError(null);

      const data = await getStaffJobLogs(jobId);
      setJobLogs(data);

      return data;
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to fetch job logs"
      );
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const createJobLog = useCallback(
    async (jobId: number, notes: string, photoUrl?: string) => {
      try {
        setLoading(true);
        setError(null);

        const data = await addStaffJobLog(
          jobId,
          notes,
          photoUrl
        );

        await fetchJobLogs(jobId);

        return data;
      } catch (err: any) {
        setError(
          err.response?.data?.message || "Failed to add job log"
        );
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchJobLogs]
  );

  const changeJobStatus = useCallback(
    async (
      jobId: number,
      status: "COMPLETED" | "CANCELLED"
    ) => {
      try {
        setLoading(true);
        setError(null);

        const data = await updateStaffJobStatus(
          jobId,
          status
        );

        await fetchTasks();

        return data;
      } catch (err: any) {
        setError(
          err.response?.data?.message || "Failed to update job status"
        );
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchTasks]
  );

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getStaffJobHistory();
      setHistory(data);

      return data;
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to fetch job history"
      );
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    tasks,
    taskDetails,
    jobLogs,
    history,

    loading,
    error,

    fetchTasks,
    fetchTaskDetails,
    fetchJobLogs,
    createJobLog,
    changeJobStatus,
    fetchHistory,
  };
};