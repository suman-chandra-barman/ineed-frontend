"use client";

import {
  useState,
  useCallback,
  useSyncExternalStore,
} from "react";
import { useRouter, useParams } from "next/navigation";
import { BookingState } from "@/types/booking.type";
import { useGetBookingAddonsQuery } from "@/redux/features/booking/bookingApi";
import AdditionalFeaturesStep from "@/components/Booking/AdditionalFeaturesStep";
import ServicingInformationStep from "@/components/Booking/ServicingInformationStep";
import DateTimeStep from "@/components/Booking/DateTimeStep";
import PaymentStep from "@/components/Booking/PaymentStep";
import ConfirmationStep from "@/components/Booking/ConfirmationStep";
import BookingHeader from "@/components/Booking/BookingHeader";
import BookingSidebar from "@/components/Booking/BookingSidebar";

const STEPS = [
  { id: 1, label: "Additional Features" },
  { id: 2, label: "Servicing Information" },
  { id: 3, label: "Date & Time" },
  { id: 4, label: "Payment" },
  { id: 5, label: "Confirmation" },
];

// Helper functions for step persistence
const getStorageKey = (serviceId: number) => `booking_step_${serviceId}`;

const getSavedStep = (serviceId: number): number => {
  if (typeof window === "undefined") return 1;
  const saved = sessionStorage.getItem(getStorageKey(serviceId));
  if (saved) {
    const step = parseInt(saved, 10);
    if (step >= 1 && step <= 5) return step;
  }
  return 1;
};

const saveStep = (serviceId: number, step: number) => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(getStorageKey(serviceId), step.toString());
};

const clearSavedStep = (serviceId: number) => {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(getStorageKey(serviceId));
};

// For detecting client-side rendering
const emptySubscribe = () => () => {};

export default function BookingPage() {
  const router = useRouter();
  const params = useParams();
  const bookingId = parseInt(params.serviceId as string);

  // Use useSyncExternalStore to safely detect client-side mounting without causing re-renders
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  // Initialize with saved step using lazy initialization
  const [bookingState, setBookingState] = useState<BookingState>(() => ({
    currentStep: mounted ? getSavedStep(bookingId) : 1,
    totalSteps: 5,
    serviceId: bookingId.toString(),
    serviceName: "",
    servicePrice: 0,
    serviceImage: "",
    additionalServices: [],
    fullName: "",
    email: "",
    contactNumber: "",
    state: "",
    zipCode: "",
    notes: "",
    numberOfBedrooms: "",
    approximateSquareFootage: "",
    selectedDate: null,
    selectedTime: "",
    isRecurring: false,
    recurringType: null,
    paymentMethod: "stripe",
  }));

  // Fetch booking data
  const {
    data: bookingData,
    isLoading,
    error,
  } = useGetBookingAddonsQuery(bookingId, {
    skip: !mounted,
  });

  const handleNext = useCallback(() => {
    setBookingState((prev) => {
      const newStep = Math.min(prev.currentStep + 1, prev.totalSteps);
      // Save the new step to sessionStorage
      saveStep(bookingId, newStep);
      return {
        ...prev,
        currentStep: newStep,
      };
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [bookingId]);

  const handleBack = () => {
    setBookingState((prev) => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 1),
    }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleComplete = () => {
    // Clear saved step when booking is completed
    clearSavedStep(bookingId);
    router.push("/services");
  };

  const handleStepClick = (stepId: number) => {
    // Only allow clicking on completed steps (steps before current)
    if (stepId <= bookingState.currentStep) {
      setBookingState((prev) => ({
        ...prev,
        currentStep: stepId,
      }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-primary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading booking...</p>
        </div>
      </div>
    );
  }

  if (error || !bookingData) {
    return (
      <div className="min-h-screen bg-primary/5 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Failed to load booking</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary/5">
      <BookingHeader
        currentStep={bookingState.currentStep}
        totalSteps={bookingState.totalSteps}
        onBack={() => router.back()}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <BookingSidebar
            serviceName={bookingData.service.name}
            serviceDescription={bookingData.service.description}
            servicePrice={parseFloat(bookingData.service.base_price)}
            serviceImage={bookingData.service.image}
            currentStep={bookingState.currentStep}
            steps={STEPS}
            onStepClick={handleStepClick}
          />

          {/* Right Content Area */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
            {/* Step 1: Additional Features */}
            {bookingState.currentStep === 1 && (
              <AdditionalFeaturesStep
                bookingId={bookingId}
                onNext={handleNext}
              />
            )}

            {/* Step 2: Servicing Information */}
            {bookingState.currentStep === 2 && (
              <ServicingInformationStep
                bookingId={bookingId}
                data={{
                  fullName: bookingState.fullName,
                  email: bookingState.email,
                  contactNumber: bookingState.contactNumber,
                  state: bookingState.state,
                  zipCode: bookingState.zipCode,
                  notes: bookingState.notes,
                  numberOfBedrooms: bookingState.numberOfBedrooms,
                  approximateSquareFootage:
                    bookingState.approximateSquareFootage,
                }}
                onNext={(data) => {
                  setBookingState((prev) => ({ ...prev, ...data }));
                  handleNext();
                }}
                onBack={handleBack}
              />
            )}

            {/* Step 3: Date & Time */}
            {bookingState.currentStep === 3 && (
              <DateTimeStep
                bookingId={bookingId}
                selectedDate={bookingState.selectedDate}
                selectedTime={bookingState.selectedTime}
                isRecurring={bookingState.isRecurring}
                recurringType={bookingState.recurringType}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {/* Step 4: Payment */}
            {bookingState.currentStep === 4 && (
              <PaymentStep
                bookingId={bookingId}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {/* Step 5: Confirmation  */}
            {bookingState.currentStep === 5 && (
              <ConfirmationStep
                bookingId={bookingId}
                onComplete={handleComplete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
