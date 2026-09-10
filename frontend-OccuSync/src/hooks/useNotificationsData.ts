import { useState, useEffect, useMemo } from 'react';
import { getCustomerNotifications, markNotificationAsRead } from '../services/customerService';
import type { NotificationResponse } from '../types/customerType';

export function useNotificationsData() {
  const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'ALL' | 'UNREAD'>('ALL');

// Inside hooks/useNotificationsData.ts
const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      // The service now guarantees this is a clean array
      const data = await getCustomerNotifications();
      setNotifications(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load notifications');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id: number) => {
    try {
      // Optimistically update the UI for a snappy feel
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
      
      // Call the backend endpoint to persist the change
      await markNotificationAsRead(id);
    } catch (err: any) {
      console.error("Failed to mark notification as read:", err);
      // Revert if it fails (optional, but good practice)
      fetchNotifications(); 
    }
  };

  const filteredNotifications = useMemo(() => {
    if (filter === 'UNREAD') {
      return notifications.filter(n => !n.is_read);
    }
    return notifications;
  }, [notifications, filter]);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return {
    filteredNotifications,
    filter,
    setFilter,
    isLoading,
    error,
    handleMarkAsRead,
    unreadCount,
    refreshNotifications: fetchNotifications
  };
}