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
  upcoming_jobs: any[]; 
  recent_jobs: any[];
  unpaid_invoices: any[];
}

export interface ServiceListing {
  id: number; // Updated to match 'int' in DB schema
  name: string;
  description: string;
  base_price: string | number; 
  estimated_duration: number;
  
  business_id: string;
  business_name: string;
  industry: string;
  state: string;
  postcode: string; // Replaced area_of_service
  country: string;  // Added from schema
}

export interface OrderPayload {
  service_id: number;
  date?: string;         // Updated from service_date
  time_slot?: string;

}

export interface OrderResponse {
  id: number; 
  service_id: number;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'; 
  date: string | null;   // Allow null
  time_slot: string | null; // Allow null
  business_name?: string; 
  service_name?: string;
  service_description?: string;
}

export interface NotificationResponse {
  id: number;
  message: string;
  is_read: boolean;
  created_at: string;
  type: string;
}

export interface InvoiceSummary {
  id: number;
  job_id: number;
  total_amount: string | number;
  status: 'ISSUED' | 'PAID' | 'OVERDUE'; // Aligned with DB schema
  due_date: string;
  service_name: string;
  business_name: string;
}

export interface InvoiceDetail {
  invoice_id: number;
  total_amount: string | number;
  invoice_status: 'ISSUED' | 'PAID' | 'OVERDUE'; 
  due_date: string;
  invoice_date: string;
  job_id: number;
  date: string;         // Updated from service_date
  time_slot: string;    
  service_name: string;
  service_description: string;
  base_price: string | number;
  business_name: string;
  business_phone: string;
  business_email: string;
}

export interface PaymentPayload {
  method: 'CASH' | 'CARD' | 'ONLINE_BANKING' | 'E_WALLET';
  photo_url?: string;
}

export interface CustomerProfile {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address_line: string;
  state: string;
  postcode: string;
  country: string;
}