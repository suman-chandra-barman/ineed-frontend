import { baseApi } from "@/redux/api/baseApi";
import {
  BookingResponse,
  BookingAddonsResponse,
  CreateBookingRequest,
  UpdateServicingInfoRequest,
  UpdateScheduleRequest,
  PaymentResponse,
  PaymentDetailsResponse,
  BookingConfirmationResponse,
} from "@/types/booking.type";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation<BookingResponse, CreateBookingRequest>({
      query: (body) => ({
        url: "/bookings/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Booking"],
    }),

    getBookingAddons: builder.query<BookingAddonsResponse, number>({
      query: (bookingId) => `/bookings/${bookingId}/addons/`,
      providesTags: ["Booking"],
    }),

    updateBookingAddons: builder.mutation<
      BookingResponse,
      { bookingId: number; addon_ids: number[] }
    >({
      query: ({ bookingId, ...body }) => ({
        url: `/bookings/${bookingId}/addons/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Booking"],
    }),

    updateServicingInfo: builder.mutation<
      BookingResponse,
      { bookingId: number } & UpdateServicingInfoRequest
    >({
      query: ({ bookingId, ...body }) => ({
        url: `/bookings/${bookingId}/servicing-info/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Booking"],
    }),

    updateSchedule: builder.mutation<
      BookingResponse,
      { bookingId: number } & UpdateScheduleRequest
    >({
      query: ({ bookingId, ...body }) => ({
        url: `/bookings/${bookingId}/schedule/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Booking"],
    }),

    getPaymentDetails: builder.query<PaymentDetailsResponse, number>({
      query: (bookingId) => `/bookings/${bookingId}/pay/`,
      providesTags: ["Booking"],
    }),

    createPayment: builder.mutation<PaymentResponse, number>({
      query: (bookingId) => ({
        url: `/bookings/${bookingId}/pay/`,
        method: "POST",
      }),
      invalidatesTags: ["Booking"],
    }),

    getBookingConfirmation: builder.query<BookingConfirmationResponse, number>({
      query: (bookingId) => `/bookings/${bookingId}/confirmation/`,
      providesTags: ["Booking"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetBookingAddonsQuery,
  useUpdateBookingAddonsMutation,
  useUpdateServicingInfoMutation,
  useUpdateScheduleMutation,
  useGetPaymentDetailsQuery,
  useCreatePaymentMutation,
  useGetBookingConfirmationQuery,
} = bookingApi;
