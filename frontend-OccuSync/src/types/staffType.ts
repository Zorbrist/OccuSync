export interface StaffTask {
  job_id: number;
  service_id: number;
  service_name: string;
  service_description: string;
  customer_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  status: string;
  date: string;
  time_slot: string;
}

export interface StaffTaskDetails extends StaffTask {
  base_price: number;
  address_line: string;
  state: string;
  postcode: string;
  country: string;
}

export interface JobLog {
  id: number;
  job_id: number;
  user_id: number;
  photo_url: string | null;
  notes: string;
  created_at: string;
}

export interface StaffJobHistory extends StaffTask {
  service_description: string;
}