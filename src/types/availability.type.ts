export interface AvailabilityDays {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

export interface AvailabilityTimeSlots {
  morning: boolean;
  afternoon: boolean;
  evening: boolean;
}

export interface AvailabilityData {
  days: AvailabilityDays;
  timeSlots: AvailabilityTimeSlots;
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
