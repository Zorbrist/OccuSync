import { useState, useCallback } from "react";
import {
  getStaffTasks,
  getStaffTaskDetails,
  getStaffJobLogs,
  addStaffJobLog,
  updateStaffJobStatus,
  getStaffJobHistory,
} from "../services/businessService";

export const useStaff = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [taskDetails, setTaskDetails] = useState<any | null>(null);
  const [jobLogs, setJobLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getStaffTasks();
      setTasks(data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getStaffJobHistory();
      setHistory(data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to fetch history.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTaskDetails = useCallback(async (jobId: number) => {
    setLoading(true);
    setError("");
    try {
      const data = await getStaffTaskDetails(jobId);
      setTaskDetails(data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to fetch task details.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchJobLogs = useCallback(async (jobId: number) => {
    try {
      const data = await getStaffJobLogs(jobId);
      setJobLogs(data);
    } catch (err: any) {
      console.error("Failed to fetch logs:", err);
    }
  }, []);

  const createJobLog = async (jobId: number, notes: string) => {
    try {
      await addStaffJobLog(jobId, notes);
      await fetchJobLogs(jobId); // Refresh logs immediately after posting
      return true;
    } catch (err: any) {
      console.error("Failed to add log:", err);
      return false;
    }
  };

  const changeJobStatus = async (jobId: number, status: "COMPLETED" | "CANCELLED") => {
    try {
      await updateStaffJobStatus(jobId, status);
      await fetchTasks();   // Refresh active tasks list
      await fetchHistory(); // Refresh history list
      return true;
    } catch (err: any) {
      console.error("Failed to update status:", err);
      return false;
    }
  };

  return {
    tasks,
    history,
    taskDetails,
    jobLogs,
    loading,
    error,
    fetchTasks,
    fetchHistory,
    fetchTaskDetails,
    fetchJobLogs,
    createJobLog,
    changeJobStatus,
  };
};