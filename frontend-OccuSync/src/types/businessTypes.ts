//Business Dashboard
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

/* ========================= */
/* BUSINESS LISTINGS */
/* ========================= */

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
// LISTING - VIEW SERVICE DETAILS
// ============================================================

export interface BusinessListingDetails {
  id: number;
  name: string;
  description: string;
  base_price: string;
  estimated_duration: number;
  booking_count: string;
}