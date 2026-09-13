import axiosInstance from '../api/axiosInstance';

import type {
  BusinessRegistrationPayload,
  CustomerRegistrationPayload,
  LoginPayload,
  AuthResponse,
  LoginResponse,
  StaffInvitationRequest,
  StaffInvitationResponse,
  StaffRegistrationRequest,
  StaffRegistrationResponse
} from '../types/authType';

export const registerBusiness = async (
  payload: BusinessRegistrationPayload
): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post(
      '/auth/register/business',
      payload
    );

    return response.data;

  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
      'An error occurred during business registration'
    );
  }
};

export const registerCustomer = async (
  payload: CustomerRegistrationPayload
): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post(
      '/auth/register/customer',
      payload
    );

    return response.data;

  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
      'An error occurred during customer registration'
    );
  }
};

export const registerStaff = async (
  payload: StaffRegistrationRequest
): Promise<StaffRegistrationResponse> => {
  try {
    const response = await axiosInstance.post(
      '/auth/register/staff',
      payload
    );

    return response.data;

  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
      'An error occurred during staff registration'
    );
  }
};

export const inviteStaff = async (
  payload: StaffInvitationRequest
): Promise<StaffInvitationResponse> => {
  try {
    const response = await axiosInstance.post(
      '/business/staff/invite',
      payload
    );

    return response.data;

  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
      'An error occurred while sending the staff invitation'
    );
  }
};

export const login = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post('/auth/login', payload);

    const data: LoginResponse = response.data;

    console.log("Login response:", data);

    window.localStorage.setItem('token', data.token);
    window.localStorage.setItem('user', JSON.stringify(data.user));

    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
      'Login failed. Please try again.'
    );
  }
};