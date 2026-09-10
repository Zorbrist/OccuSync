import { useState, useEffect, useMemo } from 'react';
import { getCustomerOrders } from '../services/customerService';
import type { OrderResponse } from '../types/customerType';

export function useOrdersData() {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtering states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Modal states
  const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getCustomerOrders();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load orders');
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Define available statuses based on the backend API specifications
  const availableStatuses = ['ALL', 'PENDING', 'CONFIRMED', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED'];

  // Apply search and filter
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const orderIdStr = order.id.toString();
      const matchesSearch = 
        orderIdStr.includes(searchQuery) ||
        (order.business_name && order.business_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (order.notes && order.notes.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, statusFilter]);

  return {
    filteredOrders,
    availableStatuses,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    isLoading,
    error,
    selectedOrder,
    setSelectedOrder
  };
}