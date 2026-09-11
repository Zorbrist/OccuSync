// customerType.ts

export interface CustomerProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export interface CustomerSummary {
  name: string;
  phone: string;
}

export interface CustomerDashboardResponse {
  customer: CustomerSummary;
  upcoming_jobs: any[]; // or define a Job interface
  recent_jobs: any[];
  unpaid_invoices: any[];
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
  service_id: string | number;
  scheduled_start: string;
  scheduled_end: string;
  notes: string;
}

export interface OrderResponse {
  id: number | string; 
  service_id: number | string;
  status: 'PENDING' | 'CONFIRMED' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
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
  type: string;

}

export interface InvoiceSummary {
  id: number | string;
  job_id: number | string;
  total_amount: string | number;
  status: 'DRAFT' | 'ISSUED' | 'PAID' | 'OVERDUE' | 'CANCELLED';
  due_date: string;
  service_name: string;
  business_name: string;
}

export interface InvoiceDetail {
  invoice_id: number | string;
  total_amount: string | number;
  invoice_status: 'DRAFT' | 'ISSUED' | 'PAID' | 'OVERDUE' | 'CANCELLED';
  due_date: string;
  invoice_date: string;
  job_id: number | string;
  scheduled_start: string;
  scheduled_end: string;
  service_name: string;
  service_description: string;
  base_price: string | number;
  business_name: string;
  business_phone: string;
  business_email: string;
}