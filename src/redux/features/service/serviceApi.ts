import { baseApi } from "@/redux/api/baseApi";
import { ServicesResponse, ServiceDetailResponse } from "@/types/service.type";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query<
      ServicesResponse,
      { category_id?: number; page?: number; limit?: number }
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params.category_id) {
          searchParams.append("category_id", params.category_id.toString());
        }
        if (params.page) {
          searchParams.append("page", params.page.toString());
        }
        if (params.limit) {
          searchParams.append("limit", params.limit.toString());
        }
        return `/services/?${searchParams.toString()}`;
      },
      providesTags: ["Service"],
    }),
    getServiceDetail: builder.query<ServiceDetailResponse, number>({
      query: (id) => `/services/${id}/`,
      providesTags: ["Service"],
    }),
  }),
});

export const { useGetServicesQuery, useGetServiceDetailQuery } = serviceApi;
