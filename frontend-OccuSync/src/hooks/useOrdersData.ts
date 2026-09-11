// hooks/useOrdersData.ts
import { useState, useEffect, useMemo } from 'react';
import { getCustomerOrders } from '../services/customerService';
import type { OrderResponse } from '../types/customerType';

export function useOrdersData() {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
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

  const availableStatuses = ['ALL', 'PENDING', 'CONFIRMED', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED'];

  // Calculate counts for each status to power the tab indicators
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: orders.length };
    availableStatuses.forEach(status => {
      if (status !== 'ALL') {
        counts[status] = orders.filter(o => o.status === status).length;
      }
    });
    return counts;
  }, [orders]);

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
    statusCounts, // Expose the counts to the UI
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