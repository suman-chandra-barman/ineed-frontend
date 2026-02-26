import { StaticImageData } from "next/image";

export interface AdditionalService {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  image: StaticImageData | string;
}

export type ServiceImage = StaticImageData | string;

export interface BookingData {
  // Step 1: Additional Features
  additionalServices: string[];

  // Step 2: Servicing Information
  fullName: string;
  email: string;
  contactNumber: string;
  state: string;
  zipCode: string;
  notes: string;
  numberOfBedrooms: string;
  approximateSquareFootage: string;

  // Step 3: Date & Time
  selectedDate: Date | null;
  selectedTime: string;
  isRecurring: boolean;
  recurringType: "weekly" | "bi-weekly" | "monthly" | null;

  // Step 4: Payment
  paymentMethod: string;
}

export interface BookingState extends BookingData {
  currentStep: number;
  totalSteps: number;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  serviceImage: ServiceImage;
}

export interface TimeSlot {
  label: string;
  value: string;
  startTime: string;
  endTime: string;
}

export interface RecurringOption {
  label: string;
  value: "weekly" | "bi-weekly" | "monthly";
}

// API Types
export interface BookingAddon {
  id: number;
  title: string;
  price: number;
}

export interface BookingItem {
  id: number;
  service: number;
  service_name: string;
  quantity: number;
  unit_price: string;
  addons_total: string;
  total_price: string;
  title_snapshot: string;
  addons: BookingAddon[];
  created_at: string;
}

export interface BookingStatusHistory {
  id: number;
  from_status: string | null;
  to_status: string;
  changed_by: string;
  changed_by_email: string;
  note: string;
  created_at: string;
}

export interface BookingResponse {
  id: number;
  booking_code: string;
  customer: string;
  customer_email: string;
  provider: string | null;
  address: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  contact_number: string | null;
  notes: string | null;
  service_address: string | null;
  state: string | null;
  zip_code: string | null;
  bedrooms: number | null;
  square_footage: number | null;
  service_date: string | null;
  time_slot: string | null;
  is_recurring: boolean;
  recurring_type: string | null;
  status: string;
  sub_total: string;
  tax_amount: string;
  total_amount: string;
  payment: string | null;
  items: BookingItem[];
  images: string[];
  status_history: BookingStatusHistory[];
  created_at: string;
  updated_at: string;
}

export interface AvailableAddon {
  id: number;
  title: string;
  subtitle: string;
  image: string | null;
  price: string;
  estimate_time: string;
  estimate_time_unit: string;
}

export interface BookingServiceInfo {
  id: number;
  name: string;
  base_price: string;
  description: string;
  image: string;
}

export interface BookingAddonsResponse {
  booking_id: number;
  booking_code: string;
  service: BookingServiceInfo;
  available_addons: AvailableAddon[];
  selected_addon_ids: number[];
  pricing: {
    sub_total: string;
    tax_amount: string;
    total_amount: string;
    addons_total: string;
  };
}

export interface CreateBookingRequest {
  service_id: number;
}

export interface UpdateAddonsRequest {
  addon_ids: number[];
}

export interface UpdateServicingInfoRequest {
  full_name: string;
  email: string;
  contact_number: string;
  state: string;
  zip_code: string;
  notes: string;
  bedrooms: number;
  square_footage: number;
}

export interface UpdateScheduleRequest {
  service_date: string;
  time_slot: string;
  is_recurring: boolean;
  recurring_type: string | null;
}

export interface PaymentResponse {
  success: boolean;
  checkout_url: string;
  session_id: string;
}

export interface PaymentInfo {
  amount: string;
  currency: string;
  method: string;
  status: string;
  transaction_id: string;
  paid_at: string;
  created_at: string;
}

export interface BookingConfirmationResponse {
  id: number;
  booking_code: string;
  customer: string;
  customer_email: string;
  provider: string | null;
  address: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  contact_number: string | null;
  notes: string | null;
  service_address: string | null;
  state: string | null;
  zip_code: string | null;
  bedrooms: number | null;
  square_footage: number | null;
  service_date: string | null;
  time_slot: string | null;
  is_recurring: boolean;
  recurring_type: string | null;
  status: string;
  sub_total: string;
  tax_amount: string;
  total_amount: string;
  payment: PaymentInfo | null;
  items: BookingItem[];
  images: string[];
  status_history: BookingStatusHistory[];
  created_at: string;
  updated_at: string;
}
