"use client";

import { useState } from "react";
import { ArrowLeft, MessageCircle, Star, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BookingTrackStep } from "@/types/booking.type";
import ReviewModal from "@/components/Dashboard/ReviewModal";
import { useLazyGetBookingChatRoomQuery } from "@/redux/features/chat/chatApi";

interface BookingDetailsViewProps {
  numericId: number;
  bookingId: string;
  bookingDate: string;
  location: string;
  canReschedule: boolean;
  rawStatus: string;
  serviceImage: string;
  serviceTitle: string;
  bookingDateTime: string;
  mainService: number;
  additionalService: number;
  tax: number;
  total: number;
  providerName: string;
  providerEmail: string;
  providerContact: string;
  providerAddress: string;
  providerImage?: string;
  chatEnabled: boolean;
  beforeImages: string[];
  afterImages: string[];
  bookingTrack: BookingTrackStep[];
}

export default function BookingDetailsView({
  numericId,
  bookingId,
  bookingDate,
  location,
  canReschedule,
  rawStatus,
  serviceImage,
  serviceTitle,
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
  chatEnabled,
  beforeImages,
  afterImages,
  bookingTrack,
}: BookingDetailsViewProps) {
  const router = useRouter();
  const [reviewOpen, setReviewOpen] = useState(false);

  const [getBookingChatRoom, { isLoading: openingChat }] =
    useLazyGetBookingChatRoomQuery();

  const isCompleted = rawStatus === "completed" || rawStatus === "complete";

  const handleOpenChat = async () => {
    try {
      const res = await getBookingChatRoom({ bookingId: numericId }).unwrap();
      const roomId = res.data.id;
      router.push(`/user/chat?roomId=${roomId}`);
    } catch (error) {
      console.error("Failed to open chat room", error);
    }
  };

  const activeStep =
    bookingTrack.find((s) => s.active)?.step ??
    bookingTrack.filter((s) => s.done).length;

  const totalSteps = bookingTrack.length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
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
              <h1 className="text-xl font-semibold text-gray-900">
                Service Details
              </h1>
            </div>

            <div className="flex items-center gap-2">
              {canReschedule && (
                <Button variant="outline" size="sm" className="gap-1">
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reschedule
                </Button>
              )}
              <div className="px-3 py-1.5 bg-primary/15 text-primary rounded-lg text-sm font-medium capitalize">
                {rawStatus.replace("-", " ")}
              </div>
            </div>
          </div>

          <div className="px-4 pb-3 space-y-1">
            <p className="font-bold text-xl md:text-2xl">
              Booking ID: {bookingId}
            </p>
            <p className="text-sm text-gray-600">
              Booking Date: {bookingDate}
              <span className="mx-2">â€¢</span>
              Location: {location}
            </p>
          </div>
        </div>

        {/*  Main Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Booking Details */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Booking Details :
            </h2>

            {/* Service row */}
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
                <div className="mt-1">
                  <span className="text-lg font-semibold text-primary">
                    ${mainService}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">
                    Starting From
                  </span>
                </div>
              </div>
            </div>

            {/* Pricing breakdown */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Booking Date &amp; Time</span>
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
                <span className="text-gray-600">Service Charge</span>
                <span className="text-gray-900 font-medium">${tax}</span>
              </div>
              <div className="flex justify-between pt-3 border-t">
                <span className="text-gray-900 font-semibold">Total</span>
                <span className="text-gray-900 font-semibold">${total}</span>
              </div>
            </div>
          </div>

          {/* Right â€“ Provider Details */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Provider Details :
            </h2>

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
                    {providerName?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>

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

            {chatEnabled && (
              <Button
                className="w-full"
                onClick={() => handleOpenChat()}
                disabled={openingChat}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {openingChat ? "Opening..." : "Chat"}
              </Button>
            )}
          </div>
        </div>

        {/*  Service Images  */}
        {(beforeImages.length > 0 || afterImages.length > 0) && (
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Service Images :
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {beforeImages.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Before Image</p>
                  <div className="grid gap-2">
                    {beforeImages.map((img, i) => (
                      <div
                        key={i}
                        className="relative w-full h-40 sm:h-64 rounded-lg overflow-hidden"
                      >
                        <Image
                          src={img}
                          alt={`Before ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {afterImages.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">After Image</p>
                  <div className="grid gap-2">
                    {afterImages.map((img, i) => (
                      <div
                        key={i}
                        className="relative w-full h-40 sm:h-64 rounded-lg overflow-hidden"
                      >
                        <Image
                          src={img}
                          alt={`After ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/*  Booking Track */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 text-center">
            Booking Track
          </h2>

          <div className="relative">
            {/* Background line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{
                  width: `${((activeStep - 1) / Math.max(totalSteps - 1, 1)) * 100}%`,
                }}
              />
            </div>

            {/* Steps */}
            <div
              className="relative grid gap-4"
              style={{ gridTemplateColumns: `repeat(${totalSteps}, 1fr)` }}
            >
              {bookingTrack.map((step) => {
                return (
                  <div key={step.step} className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold z-10 ${
                        step.done
                          ? "bg-primary text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step.done && !step.active ? step.step : step.step}
                    </div>
                    <span className="mt-2 text-xs text-center text-gray-700">
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/*  Action Buttons  */}
        <div className="flex gap-4 justify-center pb-8">
          <Button
            variant="outline"
            className="px-8"
            onClick={() => router.back()}
          >
            Back
          </Button>
          {isCompleted && (
            <Button
              className="bg-amber-400 hover:bg-amber-500"
              onClick={() => setReviewOpen(true)}
            >
              <Star className="w-4 h-4" />
              <span>Review</span>
            </Button>
          )}
        </div>
      </div>

      {/* Review Modal */}
      {isCompleted && (
        <ReviewModal
          isOpen={reviewOpen}
          onClose={() => setReviewOpen(false)}
          bookingId={numericId}
        />
      )}
    </div>
  );
}
