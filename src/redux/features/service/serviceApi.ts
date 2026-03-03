import { baseApi } from "@/redux/api/baseApi";
import {
  ServicesResponse,
  ServiceDetailResponse,
  FavoriteServicesResponse,
  ToggleFavoriteResponse,
} from "@/types/service.type";

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
    getFavorites: builder.query<
      FavoriteServicesResponse,
      { page?: number; limit?: number }
    >({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        if (params.page) {
          searchParams.append("page", params.page.toString());
        }
        if (params.limit) {
          searchParams.append("limit", params.limit.toString());
        }
        const query = searchParams.toString();
        return `/services/user/favorites/${query ? `?${query}` : ""}`;
      },
      providesTags: ["Service"],
    }),
    toggleFavorite: builder.mutation<ToggleFavoriteResponse, number>({
      query: (serviceId) => ({
        url: `/services/user/favorites/toggle/${serviceId}/`,
        method: "POST",
      }),
      invalidatesTags: ["Service"],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServiceDetailQuery,
  useGetFavoritesQuery,
  useToggleFavoriteMutation,
} = serviceApi;
