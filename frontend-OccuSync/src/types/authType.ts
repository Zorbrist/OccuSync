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

export interface CustomerRegistrationPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  postcode: string;
  password: string;
}

export interface LoginPayload {

    email : string;
    password : string;

}

export interface AuthResponse {
  message: string;
  user?: {
    id: number;
    email: string;
    role: string;
  };
  business?: any;
}

export interface LoginResponse {

  message: string;
  user: {
    id: number;
    email: string;
    role: string;
    created_at: string;
    updated_at: string;
  };
  token: any;
}