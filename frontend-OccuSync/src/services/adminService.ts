
import axiosInstance from '../api/axiosInstance';
import type {
  AdminDashboardResponse,
  AdminDashboardData,
  CalendarJob,
  CalendarJobsResponse,
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

const adminService = {
  getAdminDashboard,
  getJobsCalendar,
};

export default adminService;