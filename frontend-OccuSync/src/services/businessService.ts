import axiosInstance from '../api/axiosInstance';

// ============================================================
// BUSINESS DASHBOARD
// ============================================================



import type {
  StaffTask,
  StaffTaskDetails,
  JobLog
} from "../types/staffType";


export const getBusinessDashboard = async () => {
  const response = await axiosInstance.get('/business/dashboard');
  return response.data;
};

// ============================================================
// BUSINESS LISTINGS
// ============================================================

export const getBusinessListings = async () => {
  const response = await axiosInstance.get('/business/listings');
  return response.data;
};

// ============================================================
// CREATE BUSINESS LISTING
// ============================================================

export const createBusinessListing = async (listing: {
  name: string;
  description: string;
  base_price: number;
  estimated_duration: number;
}) => {
  const response = await axiosInstance.post(
    '/business/listings',
    listing
  );

  return response.data;
};

// ============================================================
// UPDATE BUSINESS LISTING
// ============================================================

export const updateBusinessListing = async (
  id: number,
  listing: {
    name: string;
    description: string;
    base_price: number;
    estimated_duration: number;
  }
) => {
  const response = await axiosInstance.put(
    `/business/listings/${id}`,
    listing
  );

  return response.data;
};

// ============================================================
// DELETE BUSINESS LISTING
// ============================================================

export const deleteBusinessListing = async (id: number) => {
  const response = await axiosInstance.delete(
    `/business/listings/${id}`
  );

  return response.data;
};

// ============================================================
// LISTING DETAILS
// ============================================================

export const getBusinessListingDetails = async (id: number) => {
  const response = await axiosInstance.get(`/business/listings/${id}`);
  return response.data;
};

// ============================================================
// CUSTOMER ORDERS
// ============================================================

export const getBusinessOrders = async (status = '') => {
  const response = await axiosInstance.get('/business/orders', {
    params: status ? { status } : {},
  });

  return response.data;
};

// ============================================================
// CUSTOMER ORDER DETAILS
// ============================================================

export const getBusinessOrder = async (id: number) => {
  const response = await axiosInstance.get(`/business/orders/${id}`);
  return response.data;
};

export const assignJobToStaff = async (
  jobId: number,
  memberId: string
) => {
  const response = await axiosInstance.patch(
    `/business/jobs/${jobId}/assign`,
    {
      member_id: memberId,
    }
  );

  return response.data;
};

// ============================================================
// UPDATE CUSTOMER ORDER STATUS
// ============================================================

export const updateBusinessOrderStatus = async (
  id: number,
  status: string
) => {
  const response = await axiosInstance.put(
    `/business/orders/${id}/status`,
    { status }
  );

  return response.data;
};

// ============================================================
// BUSINESS NOTIFICATIONS
// ============================================================

export const getBusinessNotifications = async () => {
  const response = await axiosInstance.get('/business/notifications');
  return response.data;
};

export const markBusinessNotificationAsRead = async (id: number) => {
  const response = await axiosInstance.put(
    `/business/notifications/${id}/read`
  );

  return response.data;
};

export const markAllBusinessNotificationsAsRead = async () => {
  const response = await axiosInstance.put(
    '/business/notifications/read-all'
  );

  return response.data;
};

// ============================================================
// BUSINESS INQUIRIES
// ============================================================
export const getBusinessInquiries = async () => {
  const response = await axiosInstance.get('/business/inquiries');
  return response.data;
};

// ============================================================
// BUSINESS ORDER PROPOSAL
// ============================================================
export const sendOrderProposal = async (data: {
  job_id: number;
  proposed_date: string;
  proposed_time: string;
  message: string;
}) => {
  const response = await axiosInstance.post('/business/proposals', data);
  return response.data;
};

// ============================================================
// BUSINESS CALENDAR AVAILABILITY
// ============================================================
export const toggleDateAvailability = async (date: string, is_available: boolean) => {
  // The { date, is_available } object MUST be the second argument
  const response = await axiosInstance.post('/business/availability', { date, is_available });
  return response.data;
};

// ============================================================
// STAFF WITH TASKS
// ============================================================
export const getStaffWithTasks = async () => {
  const response = await axiosInstance.get('/business/staff-tasks');
  return response.data;
};

// ============================================================
// BUSINESS MEMBERS
// ============================================================

export const getBusinessMembers = async () => {
  const response = await axiosInstance.get('/business/members');
  return response.data;
};

// ============================================================
// ASSIGN ORDER MEMBER
// ============================================================

export const assignOrderMember = async (
  orderId: number,
  memberId: string
) => {
  const response = await axiosInstance.patch(
    `/business/orders/${orderId}/assign`,
    {
      member_id: memberId,
    }
  );

  return response.data;
};


export const getStaffTasks = async (): Promise<StaffTask[]> => {
  const response = await axiosInstance.get("/business/tasks");

  return response.data;
};

export const getStaffTaskDetails = async (
  jobId: number
): Promise<StaffTaskDetails> => {
  const response = await axiosInstance.get(
    `/business/tasks/${jobId}`
  );

  return response.data;
};

export const getStaffJobLogs = async (
  jobId: number
): Promise<JobLog[]> => {
  const response = await axiosInstance.get(
    `/business/tasks/${jobId}/logs`
  );

  return response.data;
};

export const addStaffJobLog = async (
  jobId: number,
  notes: string,
  photoUrl?: string
) => {
  const response = await axiosInstance.post(
    `/business/tasks/${jobId}/logs`,
    {
      notes,
      photo_url: photoUrl || null,
    }
  );

  return response.data;
};

export const updateStaffJobStatus = async (
  jobId: number,
  status: "COMPLETED" | "CANCELLED"
) => {
  const response = await axiosInstance.patch(
    `/business/tasks/${jobId}/status`,
    {
      status,
    }
  );

  return response.data;
};

export const getStaffJobHistory = async (): Promise<StaffTask[]> => {
  const response = await axiosInstance.get(
    "/business/history"
  );

  return response.data;
};