// hooks/useServicesData.ts
import { useState, useEffect, useMemo } from 'react';
import { getCustomerServices, createOrder } from '../services/customerService';
import type { ServiceListing, OrderPayload } from '../types/customerType';

export function useServicesData() {
  const [services, setServices] = useState<ServiceListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');

  const [selectedService, setSelectedService] = useState<ServiceListing | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{ serviceName: string; businessName: string } | null>(null);
  const [pendingPayload, setPendingPayload] = useState<OrderPayload | null>(null);

  // NEW: Saved & Compare Features
  const [savedServiceIds, setSavedServiceIds] = useState<Set<number>>(new Set());
  const [compareList, setCompareList] = useState<ServiceListing[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Load saved items from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('occusync_saved_services');
    if (stored) {
      setSavedServiceIds(new Set(JSON.parse(stored)));
    }
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getCustomerServices();
        setServices(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load services');
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

  const industries = useMemo(() => {
    const uniqueIndustries = new Set(services.map(s => s.industry));
    return ['All', ...Array.from(uniqueIndustries)];
  }, [services]);

  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesSearch = 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.business_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesIndustry = selectedIndustry === 'All' || service.industry === selectedIndustry;
      return matchesSearch && matchesIndustry;
    });
  }, [services, searchQuery, selectedIndustry]);

  // Handle Save (Toggle and persist to localStorage)
  const toggleSaved = (id: number) => {
    setSavedServiceIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem('occusync_saved_services', JSON.stringify(Array.from(next)));
      return next;
    });
  };

  // Handle Compare
  const toggleCompare = (service: ServiceListing) => {
    setCompareList(prev => {
      const isComparing = prev.some(s => s.id === service.id);
      if (isComparing) return prev.filter(s => s.id !== service.id);
      if (prev.length >= 3) {
        alert('You can only compare up to 3 services at a time.');
        return prev;
      }
      return [...prev, service];
    });
  };

// In hooks/useServicesData.ts
  const handleInitiateBooking = (service: ServiceListing) => {
    setSelectedService(service);
    setPendingPayload({
      service_id: service.id,
      date: '', 
      time_slot: ''
      // removed "notes" completely
    });
  };

  const handleConfirmBooking = async () => {
    if (!pendingPayload) return;
    
    setIsSubmitting(true);
    try {
      await createOrder(pendingPayload);
      if (selectedService) {
        setSuccessData({ 
          serviceName: selectedService.name, 
          businessName: selectedService.business_name 
        });
      }
      setSelectedService(null);
      setPendingPayload(null);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to book service.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelConfirmation = () => {
    setPendingPayload(null);
    setSelectedService(null);
  };

  return {
    filteredServices,
    industries,
    searchQuery,
    setSearchQuery,
    selectedIndustry,
    setSelectedIndustry,
    isLoading,
    error,
    selectedService,
    isSubmitting,
    successData,
    setSuccessData,
    pendingPayload,
    handleInitiateBooking,
    handleConfirmBooking,
    handleCancelConfirmation,
    savedServiceIds,
    toggleSaved,
    compareList,
    setCompareList,
    toggleCompare,
    showCompareModal,
    setShowCompareModal
  };
}