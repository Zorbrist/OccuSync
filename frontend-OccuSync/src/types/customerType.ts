// customerType.ts

export interface CustomerProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export interface CustomerDashboardResponse {
  profile: CustomerProfile;
  // Additional dashboard summary stats can be added here
}

export interface ServiceListing {
  id: string; // Notice: your backend likely returns this as a string if using custom IDs like 'SRV001'
  name: string;
  description: string;
  base_price: string | number; // Note: numeric types in pg often return as strings
  estimated_duration: number;
  
  // New fields from your SQL JOIN
  business_id: string;
  business_name: string;
  industry: string;
  state: string;
  area_of_service: string;
}
export interface OrderPayload {
  service_id: number;
  scheduled_start: string;
  scheduled_end: string;
  notes: string;
}

export interface OrderResponse {
  id: number;
  service_id: number;
  status: 'PENDING' | 'CONFIRMED' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED';
  scheduled_start: string;
  scheduled_end: string;
  notes: string;
  business_name?: string; 
}

export interface NotificationResponse {
  id: number;
  message: string;
  is_read: boolean;
  created_at: string;
}