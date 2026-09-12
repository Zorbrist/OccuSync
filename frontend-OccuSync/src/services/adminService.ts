
import axiosInstance from '../api/axiosInstance';
import type {
  AdminDashboardResponse,
  AdminDashboardData,
  CalendarJob,
  CalendarJobsResponse,
  AdminUsersResponse,
  AdminUsersData,
  AdminUserDetailsResponse,
  AdminUserDetailsData,
  AdminUserUpdateData,
} from '../types/adminType';


const getAdminDashboard = async (): Promise<AdminDashboardData> => {
  const response = await axiosInstance.get<AdminDashboardResponse>(
    'admin/dashboard'
  );

  if (!response.data?.success) {
    throw new Error('Failed to load admin dashboard data.');
  }

  return response.data.data;
};


const getJobsCalendar = async (start: string, end: string): Promise<CalendarJob[]> => {
  const response = await axiosInstance.get<CalendarJobsResponse>(
    'admin/jobs/calendar',
    { params: { start, end } }
  );

  if (!response.data?.success) {
    throw new Error('Failed to load calendar jobs.');
  }

  return response.data.data;
};

// =========================
// Admin Users Management
// =========================

const getAllUsers = async (
  search?: string
): Promise<AdminUsersData> => {
  const response = await axiosInstance.get<AdminUsersResponse>(
    'admin/users',
    {
      params: {
        search,
      },
    }
  );

  if (!response.data?.success) {
    throw new Error('Failed to load admin users.');
  }

  return response.data.data;
};

const getUserById = async (
  id: string
): Promise<AdminUserDetailsData> => {
  const response = await axiosInstance.get<AdminUserDetailsResponse>(
    `admin/users/${id}`
  );

  if (!response.data?.success) {
    throw new Error('Failed to load user details.');
  }

  return response.data.data;
};

const updateUser = async (
  id: string,
  data: AdminUserUpdateData
): Promise<void> => {
  const response = await axiosInstance.put(
    `admin/users/${id}`,
    data
  );

  if (!response.data?.success) {
    throw new Error('Failed to update user.');
  }
};

const deleteUser = async (id: string): Promise<void> => {
  const response = await axiosInstance.delete(
    `admin/users/${id}`
  );

  if (!response.data?.message) {
    throw new Error('Failed to delete user.');
  }
};

const adminService = {
  getAdminDashboard,
  getJobsCalendar,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};

export default adminService;