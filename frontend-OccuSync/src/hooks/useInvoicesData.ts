import { useState, useEffect, useMemo } from 'react';
import { getCustomerInvoices, getCustomerInvoice } from '../services/customerService';
import type { InvoiceSummary, InvoiceDetail } from '../types/customerType';

export function useInvoicesData() {
  const [invoices, setInvoices] = useState<InvoiceSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceDetail | null>(null);
  const [loadingInvoiceId, setLoadingInvoiceId] = useState<number | string | null>(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const data = await getCustomerInvoices();
        setInvoices(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load invoices');
      } finally {
        setIsLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  const availableStatuses = ['ALL', 'ISSUED', 'PAID', 'OVERDUE'];

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: invoices.length };
    availableStatuses.forEach(status => {
      if (status !== 'ALL') {
        counts[status] = invoices.filter(i => i.status === status).length;
      }
    });
    return counts;
  }, [invoices]);

  const filteredInvoices = useMemo(() => {
    return invoices.filter(invoice => {
      const matchesSearch = 
        invoice.id.toString().includes(searchQuery) ||
        invoice.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.service_name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'ALL' || invoice.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [invoices, searchQuery, statusFilter]);

  const handleOpenInvoice = async (id: number | string) => {
    setLoadingInvoiceId(id);
    try {
      const detail = await getCustomerInvoice(id);
      setSelectedInvoice(detail);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to load invoice details');
    } finally {
      setLoadingInvoiceId(null);
    }
  };

  return {
    filteredInvoices,
    availableStatuses,
    statusCounts,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    isLoading,
    error,
    selectedInvoice,
    setSelectedInvoice,
    handleOpenInvoice,
    loadingInvoiceId
  };
}