import { baseApi } from "@/redux/api/baseApi";
import type {
  ChatRoomResponse,
  ChatRoomsResponse,
  ChatMessagesResponse,
  SendChatMessageRequest,
  SendChatMessageResponse,
  MarkReadResponse,
} from "@/types/chat.type";

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChatRooms: builder.query<ChatRoomsResponse, void>({
      query: () => ({
        url: "/bookings/chat/rooms/",
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),

    getBookingChatRoom: builder.query<ChatRoomResponse, number>({
      query: (bookingId) => ({
        url: `/bookings/chat/booking/${bookingId}/room/`,
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),

    getRoomMessages: builder.query<ChatMessagesResponse, number>({
      query: (roomId) => ({
        url: `/bookings/chat/rooms/${roomId}/messages/`,
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),

    sendChatMessage: builder.mutation<
      SendChatMessageResponse,
      SendChatMessageRequest
    >({
      query: (body) => ({
        url: "/bookings/chat/messages/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Booking"],
    }),

    markRoomRead: builder.mutation<MarkReadResponse, number>({
      query: (roomId) => ({
        url: `/bookings/chat/rooms/${roomId}/read/`,
        method: "POST",
      }),
      invalidatesTags: ["Booking"],
    }),
  }),
});

export const {
  useGetChatRoomsQuery,
  useGetBookingChatRoomQuery,
  useLazyGetBookingChatRoomQuery,
  useGetRoomMessagesQuery,
  useLazyGetRoomMessagesQuery,
  useSendChatMessageMutation,
  useMarkRoomReadMutation,
} = chatApi;
