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

// Provider Dashboard Overview Types

export interface DashboardCardStat {
  count: number;
  percent: number;
  direction: "up" | "down";
  text: string;
}

export interface DashboardCards {
  todays_jobs: DashboardCardStat;
  completed_work: DashboardCardStat;
  pending_jobs: DashboardCardStat;
  total_jobs: DashboardCardStat;
}

export interface DashboardRecentJobResult {
  booking_id: number;
  job_id: string;
  job_category: string;
  client_name: string;
  contact_number: string | null;
  booking_by_time: string;
  status: string;
}

export interface DashboardRecentJobsMeta {
  count: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface DashboardRecentJobs {
  meta: DashboardRecentJobsMeta;
  results: DashboardRecentJobResult[];
}

export interface DashboardOverviewData {
  cards: DashboardCards;
  recent_jobs: DashboardRecentJobs;
}

export interface GetProviderDashboardOverviewResponse {
  success: boolean;
  message: string;
  data: DashboardOverviewData;
}

export interface GetTodaysJobsResponse {
  success: boolean;
  message: string;
  data: DashboardRecentJobs;
}

export interface GetAllJobsResponse {
  success: boolean;
  message: string;
  data: DashboardRecentJobs;
}

// Provider Earnings Types

export interface EarningResult {
  job_id: string;
  booking_date: string;
  complete_date: string | null;
  amount: number;
  status: string;
}

export interface EarningsData {
  meta: DashboardRecentJobsMeta;
  results: EarningResult[];
}

export interface GetEarningsResponse {
  success: boolean;
  message: string;
  data: EarningsData;
}

// Provider Job Details Types

export interface JobInformation {
  job_id: string;
  job_category: string;
  booking_date: string;
}

export interface JobScheduleLocations {
  customer_name: string;
  contact_number: string;
  date: string;
  time: string;
  city_state: string;
  zip_code: string;
}

export interface JobNotes {
  text: string;
}

export interface JobAdditionalFeature {
  id: number;
  name: string;
  duration: string;
  price: number;
}

export interface JobService {
  service_id: number;
  service_name: string;
  service_image: string;
  starting_from: number;
  quantity: number;
  additional_features: JobAdditionalFeature[];
}

export interface JobServiceInformation {
  services: JobService[];
}

export interface JobImage {
  id: number;
  image: string;
}

export interface JobImageUploadSection {
  before_images: JobImage[];
  after_images: JobImage[];
}

export interface JobDetailsData {
  job_information: JobInformation;
  job_schedule_locations: JobScheduleLocations;
  job_notes: JobNotes;
  service_information: JobServiceInformation;
  image_upload_section: JobImageUploadSection;
}

export interface GetJobDetailsResponse {
  success: boolean;
  message: string;
  data: JobDetailsData;
}

export interface StartJobResponse {
  success: boolean;
  message: string;
  data: {
    booking_id: number;
    status: string;
  };
}

export interface CompleteJobResponse {
  success: boolean;
  message: string;
  data: {
    booking_id: number;
    status: string;
  };
}

export interface UploadedJobImage {
  id: number;
  image_type: string;
  image: string;
}

export interface UploadJobImagesResponse {
  success: boolean;
  message: string;
  data: {
    items: UploadedJobImage[];
  };
}
