"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { AdditionalService, BookingState } from "@/types/booking.type";
import AdditionalFeaturesStep from "@/components/Booking/AdditionalFeaturesStep";
import ServicingInformationStep from "@/components/Booking/ServicingInformationStep";
import DateTimeStep from "@/components/Booking/DateTimeStep";
import PaymentStep from "@/components/Booking/PaymentStep";
import ConfirmationStep from "@/components/Booking/ConfirmationStep";
import BookingHeader from "@/components/Booking/BookingHeader";
import BookingSidebar from "@/components/Booking/BookingSidebar";
import sercice1 from "@/assets/service-1.jpg";
import sercice2 from "@/assets/service-2.jpg";
import sercice3 from "@/assets/service-3.jpg";
import sercice4 from "@/assets/service-4.jpg";

const STEPS = [
  { id: 1, label: "Additional Features" },
  { id: 2, label: "Servicing Information" },
  { id: 3, label: "Date & Time" },
  { id: 4, label: "Payment" },
  { id: 5, label: "Confirmation" },
];

// Mock data - in real app, fetch based on serviceId
const additionalServices: AdditionalService[] = [
  {
    id: "1",
    name: "Inside Refrigerator Cleaning",
    description:
      "A reliable repair service for everyday maintenance needs, managed and verified by our platform.",
    price: 30,
    duration: 30,
    image: sercice1,
  },
  {
    id: "2",
    name: "Laundry (Wash & Fold)",
    description:
      "A reliable repair service for everyday maintenance needs, managed and verified by our platform.",
    price: 30,
    duration: 30,
    image: sercice2,
  },
  {
    id: "3",
    name: "Extra Bathroom Cleaning",
    description:
      "A reliable repair service for everyday maintenance needs, managed and verified by our platform.",
    price: 30,
    duration: 30,
    image: sercice3,
  },
  {
    id: "4",
    name: "Garage Cleaning (light)",
    description:
      "A reliable repair service for everyday maintenance needs, managed and verified by our platform.",
    price: 30,
    duration: 30,
    image: sercice4,
  },
];

export default function BookingPage() {
  const router = useRouter();
  const params = useParams();
  const serviceId = params.serviceId as string;

  // Mock service data - in real app, fetch based on serviceId
  const serviceName = "Inside Refrigerator Cleaning";
  const servicePrice = 30;
  const serviceImage = sercice1;

  const [bookingState, setBookingState] = useState<BookingState>({
    currentStep: 1,
    totalSteps: 5,
    serviceId,
    serviceName,
    servicePrice,
    serviceImage,
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
  });

  const [transactionId, setTransactionId] = useState("");

  const handleNext = () => {
    setBookingState((prev) => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, prev.totalSteps),
    }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setBookingState((prev) => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 1),
    }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleComplete = () => {
    router.push("/services");
  };

  const handlePaymentNext = () => {
    // Generate a random transaction ID
    const randomId = Math.floor(10000 + Math.random() * 90000);
    setTransactionId(randomId.toString());
    handleNext();
  };

  const handleStepClick = (stepId: number) => {
    setBookingState((prev) => ({
      ...prev,
      currentStep: stepId,
    }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
            serviceName={serviceName}
            servicePrice={servicePrice}
            serviceImage={serviceImage}
            currentStep={bookingState.currentStep}
            steps={STEPS}
            onStepClick={handleStepClick}
          />

          {/* Right Content Area */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
            {bookingState.currentStep === 1 && (
              <AdditionalFeaturesStep
                services={additionalServices}
                selectedServices={bookingState.additionalServices}
                onServicesChange={(serviceIds) =>
                  setBookingState((prev) => ({
                    ...prev,
                    additionalServices: serviceIds,
                  }))
                }
                onNext={handleNext}
              />
            )}

            {bookingState.currentStep === 2 && (
              <ServicingInformationStep
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

            {bookingState.currentStep === 3 && (
              <DateTimeStep
                selectedDate={bookingState.selectedDate}
                selectedTime={bookingState.selectedTime}
                isRecurring={bookingState.isRecurring}
                recurringType={bookingState.recurringType}
                onDateChange={(date) =>
                  setBookingState((prev) => ({ ...prev, selectedDate: date }))
                }
                onTimeChange={(time) =>
                  setBookingState((prev) => ({ ...prev, selectedTime: time }))
                }
                onRecurringChange={(isRecurring, type) =>
                  setBookingState((prev) => ({
                    ...prev,
                    isRecurring,
                    recurringType: type,
                  }))
                }
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {bookingState.currentStep === 4 && (
              <PaymentStep
                serviceName={serviceName}
                servicePrice={servicePrice}
                serviceImage={serviceImage}
                additionalServices={additionalServices}
                selectedServiceIds={bookingState.additionalServices}
                onNext={handlePaymentNext}
                onBack={handleBack}
              />
            )}

            {bookingState.currentStep === 5 && (
              <ConfirmationStep
                transactionId={transactionId}
                serviceName={serviceName}
                servicePrice={servicePrice}
                serviceImage={serviceImage}
                additionalServices={additionalServices}
                selectedServiceIds={bookingState.additionalServices}
                onComplete={handleComplete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
