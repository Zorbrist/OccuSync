// hooks/useDashboardData.ts
import { useState, useEffect } from 'react';
import { 
  getCustomerDashboard, 
  getCustomerServices, 
  getCustomerOrders,
  getCustomerNotifications
} from '../services/customerService';
import type { 
  CustomerSummary, // Ensure this was updated in customerType.ts
  ServiceListing, 
  OrderResponse,
  NotificationResponse
} from '../types/customerType';

export function useDashboardData() {
  // Use 'customer' instead of 'profile'
  const [customer, setCustomer] = useState<CustomerSummary | null>(null);
  const [services, setServices] = useState<ServiceListing[]>([]);
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
  // Add state for unpaid invoices returned by the dashboard endpoint
  const [unpaidInvoices, setUnpaidInvoices] = useState<any[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const [dashboardData, servicesData, ordersData, notificationsData] = await Promise.all([
          getCustomerDashboard(),
          getCustomerServices(),
          getCustomerOrders(),
          getCustomerNotifications()
        ]);

        // Map the backend response properly
        setCustomer(dashboardData.customer); 
        setUnpaidInvoices(dashboardData.unpaid_invoices || []);
        
        setServices(servicesData);
        setOrders(ordersData);
        setNotifications(notificationsData);

      } catch (err: any) {
        console.error("Failed to fetch dashboard data:", err);
        setError(err.response?.data?.message || 'Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return { customer, unpaidInvoices, services, orders, notifications, isLoading, error };
}