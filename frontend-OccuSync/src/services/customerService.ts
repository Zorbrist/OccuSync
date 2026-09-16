// customerService.ts
import axiosInstance from '../api/axiosInstance';
import type { 
  CustomerDashboardResponse, 
  ServiceListing, 
  OrderResponse, 
  OrderPayload,
  NotificationResponse, 
  InvoiceSummary, // Add this
  InvoiceDetail, 
  CustomerProfile,
} from '../types/customerType';

import type { PaymentPayload } from '../types/customerType';



export const getCustomerDashboard = async (): Promise<CustomerDashboardResponse> => {
  const response = await axiosInstance.get('/customer/dashboard');
  return response.data;
};

export const getCustomerServices = async (): Promise<ServiceListing[]> => {
  const response = await axiosInstance.get('/customer/services');
  
  // Extract the array from the 'services' property returned by your backend
  return response.data?.services || [];
};

export const getCustomerOrders = async (): Promise<OrderResponse[]> => {
  const response = await axiosInstance.get('/customer/orders');
  return response.data;
};

export const createOrder = async (payload: OrderPayload): Promise<OrderResponse> => {
  const response = await axiosInstance.post('/customer/orders', payload);
  return response.data.order;
}

export const updateProposalStatus = async (
  proposalId: number,
  status: "ACCEPTED" | "REJECTED"
) => {
  const response = await axiosInstance.patch(
    `/customer/proposals/${proposalId}/status`,
    {
      status,
    }
  );

  return response.data;
};

export const getCustomerNotifications = async (): Promise<NotificationResponse[]> => {
  const response = await axiosInstance.get('/customer/notifications');
  
  // Extract the array from the new { count, notifications } structure
  return response.data?.notifications || (Array.isArray(response.data) ? response.data : []);
};

export const markNotificationAsRead = async (id: number): Promise<void> => {
  await axiosInstance.put(`/customer/notifications/${id}/read`);
};

export const getCustomerInvoices = async (): Promise<InvoiceSummary[]> => {
  const response = await axiosInstance.get('/customer/invoices');
  return response.data;
};

export const getCustomerInvoice = async (id: string | number): Promise<InvoiceDetail> => {
  const response = await axiosInstance.get(`/customer/invoices/${id}`);
  return response.data;
};



export const processPayment = async (invoiceId: number | string, payload: PaymentPayload): Promise<void> => {
  await axiosInstance.post(`/customer/invoices/${invoiceId}/pay`, payload);
};

// Add this new function to customerService.ts
export const getCustomerProfile = async (): Promise<CustomerProfile> => {
  const response = await axiosInstance.get('/customer/profile');
  return response.data;
};

