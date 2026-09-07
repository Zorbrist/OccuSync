export interface BusinessPayload {
  name: string;
  registration_no: string;
  industry: string;
  area_of_service?: string;
  state: string;
  postcode: string;
  country: string;
  phone: string;
  email: string;
}

export interface OwnerPayload {
  full_name: string;
  phone: string;
}

export interface BusinessRegistrationPayload {
  business: BusinessPayload;
  owner: OwnerPayload;
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user?: any;
  business?: any;
}