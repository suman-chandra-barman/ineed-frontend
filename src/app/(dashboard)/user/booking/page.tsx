"use client";

import { useState } from "react";
import PageHeader from "@/components/Dashboard/PageHeader";
import BookingCard from "@/components/Cards/BookingCard";
import ReviewModal from "@/components/Dashboard/ReviewModal";
import { useGetUserBookingsQuery } from "@/redux/features/booking/bookingApi";
import { UserBookingListItem } from "@/types/booking.type";
import { ErrorDisplay, LoadingSpinner } from "@/components/Shared";

function BookingPage() {
  const { data, isLoading, isError } = useGetUserBookingsQuery();

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] =
    useState<UserBookingListItem | null>(null);

  const bookings = data?.data ?? [];

  const handleReviewClick = (booking: UserBookingListItem) => {
    setSelectedBooking(booking);
    setIsReviewModalOpen(true);
  };

  // loading and error states
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
            booking={booking}
            onReviewClick={handleReviewClick}
          />
        ))}
      </div>

      {/* Review Modal */}
      {selectedBooking && (
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          bookingId={selectedBooking.booking_id}
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
