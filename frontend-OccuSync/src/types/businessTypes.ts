// ============================================================
// BUSINESS DASHBOARD
// ============================================================

export interface BusinessDashboardResponse {
  business: BusinessDashboardInfo;
  metrics: BusinessMetrics;
  active_orders: ActiveOrder[];
}

export interface BusinessDashboardInfo {
  id: string;
  name: string;
  industry: string;
}

export interface BusinessMetrics {
  active_orders: number;
  pending_orders: number;
  completed_orders_this_month: number;
  monthly_revenue: number;
}

export interface ActiveOrder {
  id: number;
  service_name: string;
  first_name: string;
  last_name: string;
  status: string;
  scheduled_start: string;
  scheduled_end: string;
}


// ============================================================
// BUSINESS LISTINGS
// ============================================================

export interface BusinessListingsResponse {
  total_listings: number;
  active_listings: number;
  listings: BusinessListing[];
}

export interface BusinessListing {
  id: number;
  name: string;
  description: string;
  base_price: string;
  estimated_duration: number;
  booking_count: string;
}


// ============================================================
// LISTING DETAILS
// ============================================================

export interface BusinessListingDetails {
  id: number;
  name: string;
  description: string;
  base_price: string;
  estimated_duration: number;
  booking_count: string;
}


// ============================================================
// CUSTOMER ORDERS
// ============================================================

export interface CustomerOrder {
  id: number;
  service_id: number;
  service_name: string;

  customer_id: string;
  first_name: string;
  last_name: string;
  phone: string;

  status: string;

  scheduled_start: string;
  scheduled_end: string;

  proposal_status:string;

  notes: string | null;

  base_price: string;
}


// ============================================================
// CUSTOMER ORDER DETAILS
// ============================================================

export interface CustomerOrderDetails {
  id: number;

  service_id: number;
  service_name: string;
  service_description: string | null;
  base_price: string;

  customer_id: string;
  first_name: string;
  last_name: string;
  phone: string;

  status: string;
  message: string;
  inquiry_status: string;

  proposed_time: string;
  proposed_date: string;
  proposal_status: string;

  date: string;
  time_slot: string;

  assigned_member_id: string | null;
  assigned_member_role: string | null;
}


// ============================================================
// UPDATE ORDER STATUS
// ============================================================

export interface UpdateOrderStatusResponse {
  message: string;

  order: {
    id: number;
    status: string;
    scheduled_start: string;
    scheduled_end: string;
    notes: string | null;
    updated_at: string;
  };
}


export interface BusinessMember {
  member_id: string;
  role: 'OWNER' | 'STAFF';
  first_name: string;
  last_name: string;
  email: string;
}

// ============================================================
// BUSINESS NOTIFICATIONS
// ============================================================

export interface BusinessNotification {
  id: number;
  type: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

// ============================================================
// INVOICES
// ============================================================

export interface InvoiceItem {
  id: number;
  description: string;
  sub_total: string;
}

export interface BusinessInvoice {
  id: number;
  job_id: number;
  status: 'ISSUED' | 'PAID' | 'OVERDUE';
  issue_date: string;
  due_date: string;
  total_amount: string;
  first_name: string;
  last_name: string;
  
  // Extended fields for details
  job_date?: string;
  service_name?: string;
  phone?: string;
  items?: InvoiceItem[];
}