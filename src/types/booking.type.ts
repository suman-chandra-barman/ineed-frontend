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
