import { useState } from 'react';

import {
  getBusinessDashboard,
  getBusinessListings,
  getBusinessListingDetails,
  getBusinessOrders,
  getBusinessOrder,
  updateBusinessOrderStatus,
  getBusinessNotifications,
  markBusinessNotificationAsRead,
  markAllBusinessNotificationsAsRead,
  createBusinessListing,
  updateBusinessListing,
  deleteBusinessListing
} from '../services/businessService';

import type {
  BusinessDashboardResponse,
  BusinessListingsResponse,
  CustomerOrder,
  CustomerOrderDetails,
  BusinessNotification
} from '../types/businessTypes';


// ============================================================
// BUSINESS DASHBOARD
// ============================================================

export const useBusinessDashboard = () => {
  const [data, setData] =
    useState<BusinessDashboardResponse | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const fetchBusinessDashboard = async () => {
    setError('');
    setLoading(true);

    try {
      const data = await getBusinessDashboard();

      setData(data);

      return data;
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch business dashboard. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fetchBusinessDashboard,
  };
};


// ============================================================
// BUSINESS LISTINGS
// ============================================================

export const useBusinessListings = () => {
  const [data, setData] =
    useState<BusinessListingsResponse | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const fetchBusinessListings = async () => {
    setError('');
    setLoading(true);

    try {
      const data = await getBusinessListings();

      setData(data);

      return data;
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch business listings. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fetchBusinessListings,
  };
};


// ============================================================
// LISTING DETAILS
// ============================================================

export const useBusinessListingDetails = () => {
  const [data, setData] = useState<
    Awaited<
      ReturnType<typeof getBusinessListingDetails>
    > | null
  >(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const fetchBusinessListingDetails = async (
    id: number
  ) => {
    setError('');
    setLoading(true);

    try {
      const data =
        await getBusinessListingDetails(id);

      setData(data);

      return data;
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch service details.'
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fetchBusinessListingDetails,
  };
};

// ============================================================
// CREATE BUSINESS LISTING
// ============================================================

export const useCreateBusinessListing = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const createListing = async (listing: {
    name: string;
    description: string;
    base_price: number;
    estimated_duration: number;
  }) => {
    setLoading(true);
    setError('');

    try {
      const data = await createBusinessListing(listing);
      return data;
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
        error.message ||
        'Failed to create service.'
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createListing,
  };
};

// ============================================================
// UPDATE BUSINESS LISTING
// ============================================================

export const useUpdateBusinessListing = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const updateListing = async (
    id: number,
    listing: {
      name: string;
      description: string;
      base_price: number;
      estimated_duration: number;
    }
  ) => {
    setLoading(true);
    setError('');

    try {
      const data = await updateBusinessListing(id, listing);
      return data;
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
        error.message ||
        'Failed to update service.'
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    updateListing,
  };
};

// ============================================================
// DELETE BUSINESS LISTING
// ============================================================

export const useDeleteBusinessListing = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const deleteListing = async (id: number) => {
    setLoading(true);
    setError('');

    try {
      const data = await deleteBusinessListing(id);
      return data;
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
        error.message ||
        'Failed to delete service.'
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    deleteListing,
  };
};

// ============================================================
// CUSTOMER ORDERS
// ============================================================

export const useBusinessOrders = () => {
  const [data, setData] =
    useState<CustomerOrder[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const fetchBusinessOrders = async (
    status = ''
  ) => {
    setError('');
    setLoading(true);

    try {
      const data =
        await getBusinessOrders(status);

      setData(data);

      return data;
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch customer orders.'
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fetchBusinessOrders,
  };
};


// ============================================================
// CUSTOMER ORDER DETAILS
// ============================================================

export const useBusinessOrder = () => {
  const [data, setData] =
    useState<CustomerOrderDetails | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const fetchBusinessOrder = async (
    id: number
  ) => {
    setError('');
    setLoading(true);

    try {
      const data =
        await getBusinessOrder(id);

      setData(data);

      return data;
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch order details.'
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fetchBusinessOrder,
  };
};


// ============================================================
// UPDATE CUSTOMER ORDER STATUS
// ============================================================

export const useUpdateBusinessOrderStatus = () => {
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const updateOrderStatus = async (
    id: number,
    status: string
  ) => {
    setError('');
    setLoading(true);

    try {
      const data =
        await updateBusinessOrderStatus(
          id,
          status
        );

      return data;
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
        error.message ||
        'Failed to update order status.'
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    updateOrderStatus,
  };
};

// ============================================================
// BUSINESS NOTIFICATIONS
// ============================================================

export const useBusinessNotifications = () => {
  const [notifications, setNotifications] = useState<BusinessNotification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch business notifications
  const fetchBusinessNotifications = async () => {
    setError('');
    setLoading(true);

    try {
      const data = await getBusinessNotifications();

      setNotifications(data);

      return data;
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch notifications.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Mark one notification as read
  const markAsRead = async (id: number) => {
    try {
      setNotifications(prev =>
        prev.map(notification =>
          notification.id === id
            ? { ...notification, is_read: true }
            : notification
        )
      );

      await markBusinessNotificationAsRead(id);
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
        error.message ||
        'Failed to mark notification as read.'
      );

      await fetchBusinessNotifications();
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      setNotifications(prev =>
        prev.map(notification => ({
          ...notification,
          is_read: true,
        }))
      );

      await markAllBusinessNotificationsAsRead();
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
        error.message ||
        'Failed to mark notifications as read.'
      );

      await fetchBusinessNotifications();
    }
  };

  // Count unread notifications
  const unreadCount = notifications.filter(
    notification => !notification.is_read
  ).length;

  return {
    notifications,
    loading,
    error,
    unreadCount,
    fetchBusinessNotifications,
    markAsRead,
    markAllAsRead,
  };
};