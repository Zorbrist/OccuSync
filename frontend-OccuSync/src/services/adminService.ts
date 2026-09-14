import axiosInstance from "../api/axiosInstance";
import type { AdminDashboard } from "../types/adminType";

export const getAdminDashboard = async (): Promise<AdminDashboard> => {
  const response = await axiosInstance.get<AdminDashboard>("/admin/dashboard");

  return response.data;
};