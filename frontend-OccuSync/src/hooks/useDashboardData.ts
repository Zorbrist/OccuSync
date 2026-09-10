// hooks/useDashboardData.ts
import { useState, useEffect } from 'react';
import { 
  getCustomerDashboard, 
  getCustomerServices, 
  getCustomerOrders,
  getCustomerNotifications
} from '../services/customerService';
import type { 
  CustomerProfile, 
  ServiceListing, 
  OrderResponse,
  NotificationResponse
} from '../types/customerType';

export function useDashboardData() {
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [services, setServices] = useState<ServiceListing[]>([]);
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Fetch all required data concurrently 
        const [dashboardData, servicesData, ordersData, notificationsData] = await Promise.all([
          getCustomerDashboard(),
          getCustomerServices(),
          getCustomerOrders(),
          getCustomerNotifications()
        ]);

        setProfile(dashboardData.profile);
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

  return { profile, services, orders, notifications, isLoading, error };
}