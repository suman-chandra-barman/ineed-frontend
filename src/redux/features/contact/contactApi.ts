import { baseApi } from "@/redux/api/baseApi";

export interface ContactRequest {
  full_name: string;
  email_address: string;
  message: string;
  is_agreed: boolean;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    full_name: string;
    email_address: string;
    message: string;
    is_agreed: boolean;
    created_at: string;
  };
}

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendContactMessage: builder.mutation<ContactResponse, ContactRequest>({
      query: (body) => ({
        url: "/services/contact/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSendContactMessageMutation } = contactApi;

export default contactApi;
