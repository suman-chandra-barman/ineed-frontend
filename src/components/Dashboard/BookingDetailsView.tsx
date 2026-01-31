"use client";

import { ArrowLeft, MessageCircle, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";

interface BookingDetailsPageProps {
  bookingId: string;
  bookingDate: string;
  location: string;
  serviceImage: string | StaticImageData;
  serviceTitle: string;
  serviceDescription: string;
  amount: number;
  bookingDateTime: string;
  mainService: number;
  additionalService: number;
  tax: number;
  total: number;
  providerName: string;
  providerEmail: string;
  providerContact: string;
  providerAddress: string;
  providerImage?: string | StaticImageData;
  beforeImage?: string | StaticImageData;
  afterImage?: string | StaticImageData;
  status: "pending" | "assign" | "in-progress" | "complete";
}

export default function BookingDetailsPage({
  bookingId,
  bookingDate,
  location,
  serviceImage,
  serviceTitle,
  serviceDescription,
  amount,
  bookingDateTime,
  mainService,
  additionalService,
  tax,
  total,
  providerName,
  providerEmail,
  providerContact,
  providerAddress,
  providerImage,
  beforeImage,
  afterImage,
  status,
}: BookingDetailsPageProps) {
  const router = useRouter();

  const getStatusBadge = () => {
    const statusConfig = {
      pending: { label: "Reschedule", bg: "bg-amber-500", text: "text-white" },
      assign: { label: "Reschedule", bg: "bg-amber-500", text: "text-white" },
      "in-progress": {
        label: "In progress",
        bg: "bg-primary",
        text: "text-white",
      },
      complete: { label: "In progress", bg: "bg-primary", text: "text-white" },
    };

    return statusConfig[status] || statusConfig.pending;
  };

  const statusBadge = getStatusBadge();
  const currentStep =
    status === "pending"
      ? 1
      : status === "assign"
        ? 2
        : status === "in-progress"
          ? 3
          : 4;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 ">
      <div className="bg-white p-4 sm:p-6 lg:p-8 space-y-6 rounded-2xl">
        {/* Header */}
        <div>
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Service Details
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                className={`${statusBadge.bg} ${statusBadge.text} hover:opacity-90`}
              >
                {statusBadge.label}
              </Button>
              <div className="px-4 py-2 bg-primary/20 text-primary rounded-lg text-sm font-medium">
                {status === "in-progress" ? "In progress" : "In progress"}
              </div>
            </div>
          </div>
          <div className="px-4 pb-3 space-y-2">
            <p className="font-bold text-xl md:text-2xl">
              Booking ID: #{bookingId}
            </p>
            <div className="text-sm text-gray-600">
              <span>Booking Date: {bookingDate}</span>
              <span className="mx-2">•</span>
              <span>Location: {location}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column - Booking Details */}
          <div className="space-y-6">
            {/* Booking Details Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Booking Details :
              </h2>

              {/* Service Info */}
              <div className="flex gap-3 mb-4 pb-4 border-b">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={serviceImage}
                    alt={serviceTitle}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{serviceTitle}</h3>
                  <p className="text-sm text-gray-500">{serviceDescription}</p>
                  <div className="mt-1">
                    <span className="text-lg font-semibold text-primary">
                      ${amount}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">
                      Starting From
                    </span>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking Date & Time</span>
                  <span className="text-gray-900 font-medium">
                    {bookingDateTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Main Service</span>
                  <span className="text-gray-900 font-medium">
                    ${mainService}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Additional Service</span>
                  <span className="text-gray-900 font-medium">
                    ${additionalService}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900 font-medium">${tax}</span>
                </div>
                <div className="flex justify-between pt-3 border-t">
                  <span className="text-gray-900 font-semibold">Total</span>
                  <span className="text-gray-900 font-semibold">${total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Provider Details */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Provider Details :
              </h2>

              {/* Provider Avatar */}
              <div className="flex justify-center mb-4">
                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                  {providerImage ? (
                    <Image
                      src={providerImage}
                      alt={providerName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary text-white text-3xl font-bold">
                      {providerName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              {/* Provider Info */}
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Provider Name</span>
                  <span className="text-gray-900 font-medium">
                    {providerName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email</span>
                  <span className="text-gray-900 font-medium">
                    {providerEmail}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Contact Number</span>
                  <span className="text-gray-900 font-medium">
                    {providerContact}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Address</span>
                  <span className="text-gray-900 font-medium text-right">
                    {providerAddress}
                  </span>
                </div>
              </div>

              {/* Chat Button */}
              <Button className="w-full">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat
              </Button>
            </div>
          </div>
        </div>

        {/* Service Images */}
        {(beforeImage || afterImage) && (
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Service Images :
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {beforeImage && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Before Image</p>
                  <div className="relative w-full h-40 sm:h-80 rounded-lg overflow-hidden">
                    <Image
                      src={beforeImage}
                      alt="Before"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
              {afterImage && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">After Image</p>
                  <div className="relative w-full h-40 sm:h-80 rounded-lg overflow-hidden">
                    <Image
                      src={afterImage}
                      alt="After"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Booking Track */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 text-center">
            Booking Track
          </h2>

          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              />
            </div>

            {/* Steps */}
            <div className="relative grid grid-cols-4 gap-4">
              {[
                { num: 1, label: "Booked" },
                { num: 2, label: "provider Assign" },
                { num: 3, label: "Progress" },
                { num: 4, label: "Complete & Review" },
              ].map((step) => (
                <div key={step.num} className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold z-10 ${
                      currentStep >= step.num
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {currentStep > step.num ? "✓" : step.num}
                  </div>
                  <span className="mt-2 text-xs text-center text-gray-700">
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center pb-8">
          <Button variant="outline" className="px-8">
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
            }}
            disabled={status !== "complete"}
            className=" bg-amber-400 hover:bg-amber-500"
          >
            <Star className="w-4 h-4" />
            <span>Review</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
