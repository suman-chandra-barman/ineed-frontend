"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/Dashboard/PageHeader";
import BookingCard from "@/components/Cards/BookingCard";
import { BookingStatus } from "@/components/Cards/BookingCard";
import ReviewModal from "@/components/Dashboard/ReviewModal";
import { useGetUserBookingsQuery } from "@/redux/features/booking/bookingApi";
import { UserBookingListItem } from "@/types/booking.type";
import { ErrorDisplay, LoadingSpinner } from "@/components/Shared";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? "";

function BookingPage() {
  const router = useRouter();
  const { data, isLoading, isError } = useGetUserBookingsQuery();

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] =
    useState<UserBookingListItem | null>(null);

  const bookings = data?.data ?? [];

  const handleNavigate = (bookingId: number) => {
    router.push(`/user/booking/${bookingId}`);
  };

  const handleChatClick = (bookingId: number) => {
    router.push(`/user/chat?booking=${bookingId}`);
  };

  const handleReviewClick = (booking: UserBookingListItem) => {
    setSelectedBooking(booking);
    setIsReviewModalOpen(true);
  };

  // loadin and error states
  if (isLoading) {
    return <LoadingSpinner message="Loading Bookings..." fullPage />;
  }

  if (isError) {
    return (
      <ErrorDisplay
        message="Failed to load bookings"
        onRetry={() => window.location.reload()}
        fullPage
      />
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8">
      <PageHeader title="Bookings" />

      {/* Booking Cards */}
      <div className="space-y-4 mt-6">
        {bookings.map((booking) => (
          <BookingCard
            key={booking.booking_id}
            id={String(booking.booking_id)}
            serviceImage={
              booking.service_image
                ? `${BASE_URL}/media/${booking.service_image}`
                : "/placeholder-service.jpg"
            }
            serviceTitle={booking.service_name}
            bookingDate={booking.booking_date ?? "—"}
            bookingTime={booking.time_slot ?? "—"}
            amount={booking.amount}
            location={booking.location || "—"}
            providerName={booking.provider_name ?? "Not assigned"}
            providerContact={booking.provider_phone ?? "—"}
            status={booking.status as BookingStatus}
            onNavigate={() => handleNavigate(booking.booking_id)}
            onChatClick={() => handleChatClick(booking.booking_id)}
            onReviewClick={() => handleReviewClick(booking)}
          />
        ))}
      </div>

      {/* Review Modal */}
      {selectedBooking && (
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          bookingId={selectedBooking.booking_id}
          serviceImage={
            selectedBooking.service_image
              ? `${BASE_URL}/media/${selectedBooking.service_image}`
              : "/placeholder-service.jpg"
          }
          serviceTitle={selectedBooking.service_name}
          amount={Number(selectedBooking.amount)}
        />
      )}

      {/* Empty State */}
      {bookings.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
          <p className="text-gray-600">No bookings yet.</p>
        </div>
      )}
    </div>
  );
}

export default BookingPage;
