import { useState } from 'react';
import { getBusinessDashboard } from '../services/businessService';
import type { BusinessDashboardResponse } from '../types/businessTypes';
import { getBusinessListings } from '../services/businessService';
import type { BusinessListingsResponse } from '../types/businessTypes';
import { getBusinessListingDetails } from '../services/businessService';

export const useBusinessDashboard = () => {
  const [data, setData] = useState<BusinessDashboardResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

/* ========================= */
/* BUSINESS LISTINGS */
/* ========================= */

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
// LISTING - VIEW SERVICE DETAILS
// ============================================================
export const useBusinessListingDetails = () => {
  const [data, setData] = useState<
    Awaited<ReturnType<typeof getBusinessListingDetails>> | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchBusinessListingDetails = async (id: number) => {
    setError('');
    setLoading(true);

    try {
      const data = await getBusinessListingDetails(id);

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