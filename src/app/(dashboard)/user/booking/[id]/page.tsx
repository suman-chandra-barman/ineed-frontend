"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft } from "lucide-react";
import BookingDetailsView from "@/components/Dashboard/BookingDetailsView";
import { useGetUserBookingDetailsQuery } from "@/redux/features/booking/bookingApi";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? "";

export default function BookingDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const { data, isLoading, isError } = useGetUserBookingDetailsQuery(
    Number(id),
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-gray-500">Loading booking details…</p>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <p className="text-red-500 text-lg">Failed to load booking details.</p>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Go back
        </button>
      </div>
    );
  }

  const {
    header,
    booking_details,
    service_images,
    provider_details,
    booking_track,
  } = data.data;

  return (
    <BookingDetailsView
      bookingId={header.booking_id}
      bookingDate={header.booking_date}
      location={header.location}
      canReschedule={header.can_reschedule}
      serviceImage={`${BASE_URL}${booking_details.service_image}`}
      serviceTitle={booking_details.service_name}
      bookingDateTime={booking_details.booking_date_time}
      mainService={booking_details.pricing.main_service}
      additionalService={booking_details.pricing.additional_service}
      tax={booking_details.pricing.tax}
      total={booking_details.pricing.total}
      providerName={provider_details.provider_name}
      providerEmail={provider_details.email}
      providerContact={provider_details.contact_number}
      providerAddress={provider_details.address}
      providerImage={
        provider_details.image
          ? `${BASE_URL}${provider_details.image}`
          : undefined
      }
      chatEnabled={provider_details.chat_enabled}
      beforeImages={service_images.before.map((img) => `${BASE_URL}${img}`)}
      afterImages={service_images.after.map((img) => `${BASE_URL}${img}`)}
      bookingTrack={booking_track}
      rawStatus={header.status}
      numericId={Number(id)}
    />
  );
}
