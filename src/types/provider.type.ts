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

// Provider Service Information Types

export interface ServiceInformation {
  id: number;
  service: {
    id: number;
    name: string;
    category_id: number;
  };
  experience_level: string;
  short_description: string;
  created_at: string;
  updated_at: string;
  image: string;
}

export interface GetProviderServiceInformationResponse {
  success: boolean;
  message: string;
  data: ServiceInformation;
}

export interface UpdateProviderServiceInformationRequest {
  experience_level: string;
  short_description: string;
}

export interface UpdateProviderServiceInformationResponse {
  success: boolean;
  message: string;
  data: ServiceInformation;
}

// Provider Legal W9 Information Types

export interface LegalW9Information {
  id: number;
  legal_name: string;
  business_name: string;
  tax_type: string;
  ssn_or_ein: string;
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
  created_at: string;
  updated_at: string;
  image: string;
}

export interface GetLegalW9InformationResponse {
  success: boolean;
  message: string;
  data: LegalW9Information;
}
