import {
  loginformSchema,
  signupformSchema,
  otpVerificationSchema,
} from "@/schemas/auth.schema";
import * as z from "zod";

export const TUserRole = "user" | "provider";
export type LoginFormValues = z.infer<typeof loginformSchema>;
export type SignupFormValues = z.infer<typeof signupformSchema>;
export type OtpVerificationValues = z.infer<typeof otpVerificationSchema>;

// API Request Types
export interface SignupRequest {
  full_name: string;
  email_address: string;
  user_role: "user" | "provider";
  password: string;
  confirm_password: string;
}

export interface VerifyEmailRequest {
  email_address: string;
  otp_code: string;
}

export interface ResendOtpRequest {
  email_address: string;
}

// API Response Types
export interface SignupResponse {
  success: boolean;
  message: string;
  data: {
    email_address: string;
    user_role: string;
    otp_expires_at: string;
  };
}

export interface VerifyEmailResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      full_name: string;
      email_address: string;
      role: string;
    };
    tokens: {
      access: string;
      refresh: string;
    };
  };
}

export interface ResendOtpResponse {
  success: boolean;
  message: string;
  data: {
    email_address: string;
    otp_expires_at: string;
  };
}
