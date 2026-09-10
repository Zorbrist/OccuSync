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
  
  // NEW: State to hold the booking payload temporarily while asking for confirmation
  const [pendingPayload, setPendingPayload] = useState<OrderPayload | null>(null);

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

  // Step 1: Form triggers this to open the small confirmation modal
  const handleInitiateBooking = async (payload: OrderPayload) => {
    setPendingPayload(payload);
  };

  // Step 2: User clicks "Confirm" on the small modal, which runs the actual API call
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

  // Step 3: User clicks "Cancel" on the small modal
  const handleCancelConfirmation = () => {
    setPendingPayload(null);
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
    setSelectedService,
    isSubmitting,
    successData,
    setSuccessData,
    pendingPayload,
    handleInitiateBooking,
    handleConfirmBooking,
    handleCancelConfirmation
  };
}