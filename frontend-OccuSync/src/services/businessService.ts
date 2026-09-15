import axiosInstance from '../api/axiosInstance';

// ============================================================
// BUSINESS DASHBOARD
// ============================================================

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
  inquiry_id: number;
  proposed_date: string;
  proposed_time: string;
  notes: string;
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