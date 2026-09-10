// customerService.ts
import axiosInstance from '../api/axiosInstance';
import type { 
  CustomerDashboardResponse, 
  ServiceListing, 
  OrderResponse, 
  OrderPayload,
  NotificationResponse 
} from '../types/customerType';

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