import { baseApi } from "@/redux/api/baseApi";
import { RootState } from "@/redux/store";
import type {
  GetProviderPersonalInformationResponse,
  UpdateProviderPersonalInformationRequest,
  UpdateProviderPersonalInformationResponse,
  GetProviderServiceInformationResponse,
  UpdateProviderServiceInformationRequest,
  UpdateProviderServiceInformationResponse,
} from "@/types/provider.type";

export const providerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProviderPersonalInformation: builder.query<
      GetProviderPersonalInformationResponse,
      void
    >({
      query: () => ({
        url: "/provider/settings/personal-information/",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    updateProviderPersonalInformation: builder.mutation<
      UpdateProviderPersonalInformationResponse,
      UpdateProviderPersonalInformationRequest
    >({
      queryFn: async (data, { getState }) => {
        try {
          const formData = new FormData();

          // Append all fields to FormData
          if (data.full_name !== undefined && data.full_name !== null) {
            formData.append("full_name", data.full_name);
          }
          if (
            data.contact_number !== undefined &&
            data.contact_number !== null
          ) {
            formData.append("contact_number", data.contact_number);
          }
          if (
            data.street_address !== undefined &&
            data.street_address !== null
          ) {
            formData.append("street_address", data.street_address);
          }
          if (data.city !== undefined && data.city !== null) {
            formData.append("city", data.city);
          }
          if (data.state !== undefined && data.state !== null) {
            formData.append("state", data.state);
          }
          if (data.zip_code !== undefined && data.zip_code !== null) {
            formData.append("zip_code", data.zip_code);
          }

          // Handle image file
          if (data.image && data.image instanceof File) {
            formData.append("image", data.image, data.image.name);
          }

          // Get auth token
          const state = getState() as RootState;
          const token = state.auth.token;
          const headers: HeadersInit = {};

          if (token) {
            const headerValue = token.startsWith("Bearer ")
              ? token
              : `Bearer ${token}`;
            headers["Authorization"] = headerValue;
          }
          // Note: Do NOT set Content-Type header - browser will set it with proper boundary for multipart/form-data

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/provider/settings/personal-information/`,
            {
              method: "PUT",
              body: formData,
              headers,
              credentials: "include",
            },
          );

          const responseData = await response.json();

          if (!response.ok) {
            return { error: { status: response.status, data: responseData } };
          }

          return {
            data: responseData as UpdateProviderPersonalInformationResponse,
          };
        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              data: error,
              error: String(error),
            },
          };
        }
      },
      invalidatesTags: ["Profile"],
    }),
    getProviderServiceInformation: builder.query<
      GetProviderServiceInformationResponse,
      void
    >({
      query: () => ({
        url: "/provider/settings/service-information/",
        method: "GET",
      }),
      providesTags: ["Service"],
    }),
    updateProviderServiceInformation: builder.mutation<
      UpdateProviderServiceInformationResponse,
      UpdateProviderServiceInformationRequest
    >({
      query: (data) => ({
        url: "/provider/settings/service-information/",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Service"],
    }),
  }),
});

export const {
  useGetProviderPersonalInformationQuery,
  useUpdateProviderPersonalInformationMutation,
  useGetProviderServiceInformationQuery,
  useUpdateProviderServiceInformationMutation,
} = providerApi;
