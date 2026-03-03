import { baseApi } from "@/redux/api/baseApi";
import type { GetUserDashboardResponse } from "@/types/user.type";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserDashboard: builder.query<GetUserDashboardResponse, void>({
      query: () => ({
        url: "/bookings/user/dashboard/",
        method: "GET",
      }),
      providesTags: ["UserDashboard"],
    }),
  }),
});

export const { useGetUserDashboardQuery } = userApi;
