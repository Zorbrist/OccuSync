import type { BusinessRegistrationPayload, AuthResponse } from '../types/authType';

const API_BASE_URL = '/api/auth';

export const registerBusiness = async (
  payload: BusinessRegistrationPayload
): Promise<AuthResponse> => {
  
  const response = await fetch(`${API_BASE_URL}/register-business`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'An error occurred during registration');
  }

  return data;
};