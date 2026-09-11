import axiosInstance from "../api/axiosInstance";
import type { BusinessDashboardResponse } from "../types/businessTypes";
import type { BusinessListingsResponse } from "../types/businessTypes";

//dashboard 

export const getBusinessDashboard = async (): Promise<BusinessDashboardResponse> => {
  try {
    const token = window.localStorage.getItem('token');

    const response = await axiosInstance.get('/business/dashboard', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data: BusinessDashboardResponse = response.data;

    console.log("Business dashboard response:", data);

    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
      'Failed to fetch business dashboard. Please try again.'
    );
  }
};


/* ========================= */
/* BUSINESS LISTINGS */
/* ========================= */

export const getBusinessListings = async (): Promise<BusinessListingsResponse> => {
  const response = await axiosInstance.get('/business/listings');

  return response.data;
};

// ============================================================
// LISTING - VIEW SERVICE DETAILS
// ============================================================
// Get details of one specific service using its ID.
//
// Example:
// GET /business/listings/1
// ============================================================

export const getBusinessListingDetails = async (id: number) => {
  const response = await axiosInstance.get(
    `/business/listings/${id}`
  );

  return response.data;
};