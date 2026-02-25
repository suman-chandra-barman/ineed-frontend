import { baseApi } from "./baseApi";

// Types based on API responses
interface Profile {
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
}

interface Category {
  id: number;
  name: string;
  is_active: boolean;
}

interface Service {
  id: number;
  name: string;
  is_active: boolean;
}

interface CategoryWithServices {
  category: Category;
  services: Service[];
}

interface AvailabilityDay {
  id?: number;
  day_of_week: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

interface AvailabilitySlot {
  id?: number;
  day_of_week: number;
  slot_type: string;
  from_time: string;
  to_time: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

interface Availability {
  days: AvailabilityDay[];
  slots: AvailabilitySlot[];
}

interface OnboardingStatus {
  id: number;
  current_step: number;
  is_agreed: boolean;
  status: string;
  submitted_at: string;
  created_at: string;
  updated_at: string;
}

// Request bodies
interface UpdateProfileRequest {
  full_name: string;
  contact_number: string;
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
}

interface ServiceInfoRequest {
  services: {
    service_id: number;
    experience_level: string;
    short_description?: string;
  }[];
}

interface AvailabilityRequest {
  days: {
    day_of_week: number;
    is_active: boolean;
  }[];
  slots: {
    day_of_week: number;
    slot_type: string;
    from_time: string;
    to_time: string;
    is_active: boolean;
  }[];
}

interface ServiceInfoResponse {
  services: {
    id: number;
    service_id: number;
    experience_level: string;
    short_description: string;
  }[];
}

interface W9Response {
  id: number;
  legal_name: string;
  business_name: string;
  tax_type: string;
  ssn_or_ein: string;
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
}

interface W9Request {
  legal_name: string;
  business_name?: string;
  tax_type: string;
  ssn_or_ein: string;
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
}

interface OnboardingSubmitRequest {
  is_agreed: boolean;
}

// API Response wrappers
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface ServiceOptionsResponse {
  success: boolean;
  message: string;
  meta: {
    category_total: number;
    service_total: number;
    category_active: number;
    service_active: number;
  };
  data: CategoryWithServices[];
}

export const onboardingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Step 1: Get profile
    getProfile: builder.query<ApiResponse<Profile>, void>({
      query: () => "/provider/onboarding/profile/",
      providesTags: ["Profile"],
    }),

    // Step 1: Update profile
    updateProfile: builder.mutation<ApiResponse<Profile>, UpdateProfileRequest>(
      {
        query: (body) => ({
          url: "/provider/onboarding/profile/",
          method: "PUT",
          body,
        }),
        invalidatesTags: ["Profile"],
      },
    ),

    // Step 2: Get service options (categories with services)
    getServiceOptions: builder.query<ServiceOptionsResponse, void>({
      query: () => "/provider/services/options/",
    }),

    // Step 2: Create service information
    createServiceInfo: builder.mutation<
      ApiResponse<ServiceInfoResponse>,
      ServiceInfoRequest
    >({
      query: (body) => ({
        url: "/provider/onboarding/services/",
        method: "POST",
        body,
      }),
    }),

    // Step 3: Get availability
    getAvailability: builder.query<ApiResponse<Availability>, void>({
      query: () => "/provider/onboarding/availability/",
      providesTags: ["Availability"],
    }),

    // Step 3: Create/Update availability
    createAvailability: builder.mutation<
      ApiResponse<Availability>,
      AvailabilityRequest
    >({
      query: (body) => ({
        url: "/provider/onboarding/availability/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Availability"],
    }),

    // Step 4: Create/Update W-9 information
    createW9Info: builder.mutation<ApiResponse<W9Response>, W9Request>({
      query: (body) => ({
        url: "/provider/onboarding/w9/",
        method: "PUT",
        body,
      }),
    }),

    // Step 5: Submit onboarding
    submitOnboarding: builder.mutation<
      ApiResponse<{ onboarding: OnboardingStatus }>,
      OnboardingSubmitRequest
    >({
      query: (body) => ({
        url: "/provider/onboarding/submit/",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetServiceOptionsQuery,
  useCreateServiceInfoMutation,
  useGetAvailabilityQuery,
  useCreateAvailabilityMutation,
  useCreateW9InfoMutation,
  useSubmitOnboardingMutation,
} = onboardingApi;
