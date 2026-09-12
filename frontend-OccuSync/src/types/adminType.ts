// admin.types.ts
//
// Type definitions mirroring the response shape returned by
// GET /api/admin/dashboard (see adminController.getAdminDashboard).

export type UserRole = 'CUSTOMER' | 'SERVICE_PROVIDER' | 'ADMIN';

export type JobStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'ASSIGNED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export type InvoiceStatus =
  | 'DRAFT'
  | 'ISSUED'
  | 'PAID'
  | 'OVERDUE'
  | 'CANCELLED';

export type PaymentMethod = 'CASH' | 'CARD' | 'ONLINE_BANKING' | 'E_WALLET';

export type UsersByRole = Record<UserRole, number>;

export type JobsByStatus = Record<JobStatus, number>;

export interface RevenueByMethodEntry {
  total: number;
  count: number;
}

export type RevenueByMethod = Partial<Record<PaymentMethod, RevenueByMethodEntry>>;

export interface InvoiceStatusEntry {
  count: number;
  total: number;
}

export type InvoicesByStatus = Partial<Record<InvoiceStatus, InvoiceStatusEntry>>;

export interface AdminDashboardOverview {
  totalUsers: number;
  usersByRole: UsersByRole;
  newUsersLast30Days: number;
  totalBusinesses: number;
  totalCustomers: number;
  totalServices: number;
}

export interface AdminDashboardJobs {
  total: number;
  byStatus: JobsByStatus;
}

export interface AdminDashboardRevenue {
  total: number;
  byMethod: RevenueByMethod;
}

export interface AdminDashboardInvoices {
  total: number;
  byStatus: InvoicesByStatus;
  overdue: {
    count: number;
    total: number;
  };
}

export interface JobsTrendPoint {
  /** ISO date string, e.g. "2026-08-15" */
  date: string;
  completedCount: number;
}

/** A single job as returned by the calendar endpoint (GET /api/admin/jobs/calendar). */
export interface CalendarJob {
  id: number;
  status: JobStatus;
  scheduled_start: string;
  scheduled_end: string | null;
  business_name: string;
  service_name: string;
  customer_name: string;
}

export interface CalendarJobsResponse {
  success: boolean;
  data: CalendarJob[];
}

export interface RecentJob {
  id: number;
  status: JobStatus;
  scheduled_start: string;
  scheduled_end: string | null;
  business_name: string;
  service_name: string;
  customer_name: string;
  created_at: string;
}

export interface RecentPayment {
  id: number;
  amount: number;
  method: PaymentMethod;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  paid_at: string | null;
  invoice_id: number;
  business_name: string;
}

export interface TopBusiness {
  id: string;
  name: string;
  job_count: number;
}

export interface AdminDashboardData {
  overview: AdminDashboardOverview;
  jobs: AdminDashboardJobs;
  revenue: AdminDashboardRevenue;
  invoices: AdminDashboardInvoices;
  recentJobs: RecentJob[];
  recentPayments: RecentPayment[];
  topBusinesses: TopBusiness[];
}

export interface AdminDashboardResponse {
  success: boolean;
  data: AdminDashboardData;
}

// =========================
// Admin Users Management
// =========================

export interface AdminUsersSummary {
  total_users: number;
  total_customers: number;
  total_owners: number;
  total_staff: number;
}

export interface AdminCustomer {
  id: number;
  email: string;
  role: 'CUSTOMER';
  created_at: string;
  customer_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  country: string;
  state: string;
  postcode: string;
}

export interface AdminBusinessUser {
  user_id: number;
  user_email: string;
  created_at: string;

  member_id: string;
  member_role: 'OWNER' | 'STAFF';

  business_id: string;
  business_name: string;
  business_email: string;
  business_phone: string;
  registration_no: string;
  industry: string;
  area_of_service: string | null;
  state: string;
  postcode: string;
  country: string;
}

export interface AdminUsersData {
  summary: AdminUsersSummary;
  customers: AdminCustomer[];
  business_owners: AdminBusinessUser[];
  business_staff: AdminBusinessUser[];
}

export interface AdminUsersResponse {
  success: boolean;
  data: AdminUsersData;
  message?: string;
}

// Individual user

export interface AdminUser {
  id: number;
  email: string;
  role: 'CUSTOMER' | 'SERVICE_PROVIDER' | 'ADMIN';
  created_at: string;
}

export interface AdminCustomerDetails {
  id: string;
  user_id: number;
  first_name: string;
  last_name: string;
  phone: string;
  country: string;
  state: string;
  postcode: string;
  created_at: string;
  updated_at: string;
}

export interface AdminBusinessDetails {
  member_id: string;
  member_role: 'OWNER' | 'STAFF';

  business_id: string;
  business_name: string;
  registration_no: string;
  industry: string;
  area_of_service: string | null;
  business_phone: string;
  business_email: string;
  state: string;
  postcode: string;
  country: string;
}

export interface AdminUserDetailsData {
  user: AdminUser;
  details: AdminCustomerDetails | AdminBusinessDetails[] | null;
}

export interface AdminUserDetailsResponse {
  success: boolean;
  data: AdminUserDetailsData;
  message?: string;
}

export interface AdminUserUpdateData {
  email?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  country?: string;
  state?: string;
  postcode?: string;
  business_name?: string;
  registration_no?: string;
  industry?: string;
  area_of_service?: string;
  business_email?: string;
  business_phone?: string;
}