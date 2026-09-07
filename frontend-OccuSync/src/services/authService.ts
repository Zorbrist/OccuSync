import axiosInstance from '../api/axiosInstance';
import type {
  BusinessRegistrationPayload,
  CustomerRegistrationPayload,
  LoginPayload,
  AuthResponse,
  LoginResponse
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

export const login = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post('/auth/login', payload);

    const data: LoginResponse = response.data;

    console.log("Login response:", data);

    // Store authentication data
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