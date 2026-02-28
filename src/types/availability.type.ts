export type SlotType = "morning" | "afternoon" | "evening";

export interface AvailabilityDay {
  id: number;
  day_of_week: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AvailabilitySlot {
  id: number;
  day_of_week: number;
  slot_type: SlotType;
  from_time: string;
  to_time: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AvailabilityResponseData {
  days: AvailabilityDay[];
  slots: AvailabilitySlot[];
  image: string;
}

export interface AvailabilityResponse {
  success: boolean;
  message: string;
  data: AvailabilityResponseData;
}

export interface UpdateAvailabilityDayRequest {
  day_of_week: number;
  is_active: boolean;
}

export interface UpdateAvailabilitySlotRequest {
  day_of_week: number;
  slot_type: SlotType;
  from_time: string;
  to_time: string;
  is_active: boolean;
}

export interface UpdateAvailabilityRequest {
  days: UpdateAvailabilityDayRequest[];
  slots: UpdateAvailabilitySlotRequest[];
}

export interface TimeSlot {
  id: string;
  label: string;
  time: string;
}

export interface Day {
  id: string;
  label: string;
}
