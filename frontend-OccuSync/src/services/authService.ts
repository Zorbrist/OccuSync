import axiosInstance from '../api/axiosInstance';
import type {
  BusinessRegistrationPayload,
  AuthResponse
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
      'An error occurred during registration'
    );
  }
};