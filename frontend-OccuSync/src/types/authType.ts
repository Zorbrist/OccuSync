// authType.ts

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
  first_name: string;
  last_name: string;
  phone: string;
}

export interface BusinessRegistrationPayload {
  business: BusinessPayload;
  owner: OwnerPayload;
  email: string;
  password: string;
}

// ... (keep the rest of your types exactly the same)

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
    business_role: string;
    created_at: string;
    updated_at: string;
  };
  token: any;
}

export interface StaffRegistrationResponse {
  message: string;
  user: {
    id: number;
    email: string;
    role: 'BUSINESS_PROVIDER';
  };
  token: string;
}


export interface StaffRegistrationRequest {
  token: string;
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
}

export interface StaffInvitationRequest {
  email: string;
}

export interface StaffInvitation {
  email: string;
  expires_at: string;
  invitation_url: string;
}

export interface StaffInvitationResponse {
  message: string;
  invitation: StaffInvitation;
}