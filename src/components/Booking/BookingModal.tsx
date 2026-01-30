"use client";

import { useState } from "react";
import {
  AdditionalService,
  BookingState,
  ServiceImage,
} from "@/types/booking.type";
import { X, Check } from "lucide-react";
import AdditionalFeaturesStep from "./AdditionalFeaturesStep";
import ServicingInformationStep from "./ServicingInformationStep";
import DateTimeStep from "./DateTimeStep";
import PaymentStep from "./PaymentStep";
import ConfirmationStep from "./ConfirmationStep";
import Image from "next/image";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  serviceImage: ServiceImage;
  additionalServices: AdditionalService[];
}

const STEPS = [
  { id: 1, label: "Additional Features", icon: "🎯" },
  { id: 2, label: "Servicing Information", icon: "📋" },
  { id: 3, label: "Date & Time", icon: "📅" },
  { id: 4, label: "Payment", icon: "💳" },
  { id: 5, label: "Confirmation", icon: "✅" },
];

export default function BookingModal({
  isOpen,
  onClose,
  serviceId,
  serviceName,
  servicePrice,
  serviceImage,
  additionalServices,
}: BookingModalProps) {
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

  if (!isOpen) return null;

  const handleNext = () => {
    setBookingState((prev) => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, prev.totalSteps),
    }));
  };

  const handleBack = () => {
    setBookingState((prev) => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 1),
    }));
  };

  const handleComplete = () => {
    onClose();
    // Reset state
    setBookingState({
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
  };

  const handlePaymentNext = () => {
    // Generate a random transaction ID
    const randomId = Math.floor(10000 + Math.random() * 90000);
    setTransactionId(randomId.toString());
    handleNext();
  };

  const progress = (bookingState.currentStep / bookingState.totalSteps) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      {/* Modal Container */}
      <div className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex">
        {/* Left Sidebar - Progress Section */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 p-6 flex flex-col">
          {/* Service Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-3 mb-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                <Image
                  src={serviceImage}
                  alt={serviceName}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-semibold text-gray-900 line-clamp-2 leading-tight">
                  {serviceName}
                </h3>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  A reliable repair servic...
                </p>
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-blue-600">
                ${servicePrice}
              </span>
              <span className="text-[10px] text-gray-500">Starting From</span>
            </div>
          </div>

          {/* Booking Checklist */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-900 mb-3">
              Booking Checklist
            </h3>
            <div className="space-y-2">
              {STEPS.map((step) => {
                const isCompleted = step.id < bookingState.currentStep;
                const isCurrent = step.id === bookingState.currentStep;
                const isLocked = step.id > bookingState.currentStep;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => {
                      if (step.id <= bookingState.currentStep) {
                        setBookingState((prev) => ({
                          ...prev,
                          currentStep: step.id,
                        }));
                      }
                    }}
                    disabled={isLocked}
                    className={`
                      w-full flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-all text-left
                      ${
                        isCurrent
                          ? "border-blue-500 bg-blue-50"
                          : isCompleted
                            ? "border-gray-300 bg-white hover:bg-gray-50 cursor-pointer"
                            : "border-gray-200 bg-white cursor-not-allowed"
                      }
                    `}
                  >
                    <div
                      className={`
                        w-4 h-4 rounded border flex items-center justify-center shrink-0
                        ${
                          isCompleted || isCurrent
                            ? "bg-blue-600 border-blue-600"
                            : "border-gray-300 bg-white"
                        }
                      `}
                    >
                      {isCompleted && (
                        <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                      )}
                    </div>
                    <span
                      className={`text-xs font-medium flex-1 ${
                        isLocked ? "text-gray-400" : "text-gray-900"
                      }`}
                    >
                      {step.label}
                    </span>
                    {isLocked && (
                      <svg
                        className="w-4 h-4 text-yellow-500 shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Booking Access Info */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-auto">
            <h4 className="text-xs font-semibold text-gray-900 mb-1">
              Booking Access
            </h4>
            <p className="text-[10px] text-gray-600 leading-relaxed">
              Enter your service location and cleaning details to continue with
              booking.
            </p>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 bg-white overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          {/* Content */}
          <div className="p-8">
            {/* Step Content */}
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
