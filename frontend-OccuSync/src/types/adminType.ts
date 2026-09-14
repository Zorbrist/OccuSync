export type UserOverview = {
  total_users: number;
  total_customers: number;
  total_business_providers: number;
};

export type BusinessAnalytics = {
  id: string;
  business_name: string;
  member_count: number;
};

export type ServiceJobOverview = {
  total_services: number;
  jobs_completed: number;
  jobs_pending_or_confirmed: number;
};

export type LatestJob = {
  id: number;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  date: string | null;
  time_slot: string | null;
  business_name: string;
  customer_name: string;
  service_name: string;
};

export type PendingBusiness = {
  id: string;
  name: string;
  registration_no: string;
  industry: string;
  phone: string;
  email: string;
  state: string;
  postcode: string;
  country: string;
  approval_status: "PENDING" | "APPROVED" | "REJECTED";
  created_at: string;
};

export type RecentRegistration = {
  date: string;
  count: number;
};

export type AdminDashboard = {
  user_overview: UserOverview;

  business_analytics: BusinessAnalytics[];

  service_job_overview: ServiceJobOverview;

  total_transaction_value: string;

  latest_jobs: LatestJob[];

  pending_businesses: PendingBusiness[];

  recent_registrations: RecentRegistration[];
};