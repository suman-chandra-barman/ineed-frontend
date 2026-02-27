// Provider Personal Information Types

export interface ProviderPersonalInformation {
  id: number;
  full_name: string;
  first_name: string;
  last_name: string;
  email_address: string;
  contact_number: string;
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
  created_at: string;
  updated_at: string;
  image: string;
}

export interface GetProviderPersonalInformationResponse {
  success: boolean;
  message: string;
  data: ProviderPersonalInformation;
}

export interface UpdateProviderPersonalInformationRequest {
  full_name?: string;
  contact_number?: string;
  street_address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  image?: File | string;
}

export interface UpdateProviderPersonalInformationResponse {
  success: boolean;
  message: string;
  data: ProviderPersonalInformation;
}
