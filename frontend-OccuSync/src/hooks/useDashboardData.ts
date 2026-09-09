import { useState, useEffect } from 'react';

// Define Types matching your backend SQL tables
export interface CustomerProfile {
  id: string;
  first_name: string;
  last_name: string;
}

export interface Business {
  id: string;
  name: string;
  industry: string;
  area_of_service: string;
}

export function useDashboardData() {
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [services, setServices] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // ---------------------------------------------------------
        // PLACEHOLDER: Replace these with your actual backend API calls
        // Example: const profileRes = await axios.get('/api/profile');
        // Example: const businessRes = await axios.get('/api/businesses');
        // ---------------------------------------------------------
        
        // Simulating data fetched from the customer_profiles table
        setProfile({
          id: 'CUST001',
          first_name: 'Haziq',
          last_name: 'Amani'
        });

        // Simulating data fetched from the businesses table
        setServices([
          { id: 'BUS001', name: 'CoolPro Services', industry: 'Aircond Repair', area_of_service: 'Klang, Selangor' },
          { id: 'BUS002', name: 'Anak Cerdik', industry: 'Mathematic Class', area_of_service: 'Online' }
        ]);

      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return { profile, services, isLoading };
}