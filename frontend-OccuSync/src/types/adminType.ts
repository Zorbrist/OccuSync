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


export type UserRole =
  | "CUSTOMER"
  | "BUSINESS_PROVIDER"
  | "ADMIN";

export type UserListItem = {
  id: number;
  email: string;
  role: UserRole;
  created_at: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
};

export type UserPagination = {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
};

export type GetAllUsersResponse = {
  users: UserListItem[];
  pagination: UserPagination;
};

// ==============================
// User Details
// ==============================

export type CustomerProfile = {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  address_line: string;
  state: string;
  postcode: string;
  country: string;
};

export type BusinessProviderProfile = {
  first_name: string;
  last_name: string;
  phone: string;
  profile_picture: string | null;
};

export type UserBusiness = {
  membership_id: string;
  membership_role: "OWNER" | "STAFF";
  business_id: string;
  business_name: string;
  approval_status: "PENDING" | "APPROVED" | "REJECTED";
};

export type UserDetails = {
  id: number;
  email: string;
  role: UserRole;
  created_at: string;
  updated_at: string;

  profile: CustomerProfile | BusinessProviderProfile | null;

  businesses?: UserBusiness[];
};

export type GetUserByIdResponse = {
  user: UserDetails;
};

// ==============================
// Update User
// ==============================

export type UpdateCustomerProfile = {
  first_name?: string;
  last_name?: string;
  phone?: string;
  address_line?: string;
  state?: string;
  postcode?: string;
  country?: string;
};

export type UpdateBusinessProviderProfile = {
  first_name?: string;
  last_name?: string;
  phone?: string;
  profile_picture?: string;
};

export type UpdateUserRequest = {
  email?: string;
  role?: UserRole;

  profile?:
    | UpdateCustomerProfile
    | UpdateBusinessProviderProfile;
};

export type UpdateUserResponse = {
  user: {
    id: number;
    email: string;
    role: UserRole;
    created_at: string;
    updated_at: string;
  };
};

// ==============================
// Delete User
// ==============================

export type DeleteUserResponse = {
  message: string;
  id: number;
};



