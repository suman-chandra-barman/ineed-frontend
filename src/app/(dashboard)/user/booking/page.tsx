"use client";

import { useState } from "react";
import PageHeader from "@/components/Dashboard/PageHeader";
import BookingCard from "@/components/Cards/BookingCard";
import ReviewModal from "@/components/Dashboard/ReviewModal";
import CancelBookingModal from "@/components/Dashboard/CancelBookingModal";
import CancelBookingSuccessModal from "@/components/Dashboard/CancelBookingSuccessModal";
import {
  useCancelBookingMutation,
  useGetUserBookingsQuery,
} from "@/redux/features/booking/bookingApi";
import {
  CancelBookingResponse,
  UserBookingListItem,
} from "@/types/booking.type";
import { ErrorDisplay, LoadingSpinner } from "@/components/Shared";
import { toast } from "sonner";

function BookingPage() {
  const { data, isLoading, isError } = useGetUserBookingsQuery();

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] =
    useState<UserBookingListItem | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelResponse, setCancelResponse] =
    useState<CancelBookingResponse | null>(null);
  const [cancelReasonSnapshot, setCancelReasonSnapshot] = useState("");
  const [isCancelSuccessOpen, setIsCancelSuccessOpen] = useState(false);

  const [cancelBooking, { isLoading: isCancelling }] =
    useCancelBookingMutation();

  const bookings = data?.data ?? [];

  const handleReviewClick = (booking: UserBookingListItem) => {
    setSelectedBooking(booking);
    setIsReviewModalOpen(true);
  };

  const handleCancelClick = (booking: UserBookingListItem) => {
    setSelectedBooking(booking);
    setCancelReason("");
    setIsCancelModalOpen(true);
  };

  const handleCancelConfirm = async () => {
    if (!selectedBooking || !cancelReason.trim()) {
      return;
    }

    try {
      const res = await cancelBooking({
        bookingId: selectedBooking.booking_id,
        reason: cancelReason.trim(),
      }).unwrap();

      setCancelResponse(res);
      setCancelReasonSnapshot(cancelReason.trim());
      setIsCancelModalOpen(false);
      setIsCancelSuccessOpen(true);
      toast.success("Booking cancelled successfully");
    } catch {
      toast.error("Failed to cancel booking. Please try again.");
    }
  };

  const handleCancelModalOpenChange = (open: boolean) => {
    setIsCancelModalOpen(open);
    if (!open) {
      setCancelReason("");
    }
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
            onCancelClick={handleCancelClick}
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

      <CancelBookingModal
        open={isCancelModalOpen}
        reason={cancelReason}
        isSubmitting={isCancelling}
        onReasonChange={setCancelReason}
        onConfirm={handleCancelConfirm}
        onOpenChange={handleCancelModalOpenChange}
      />

      <CancelBookingSuccessModal
        open={isCancelSuccessOpen}
        data={cancelResponse}
        customerReason={cancelReasonSnapshot}
        onOpenChange={setIsCancelSuccessOpen}
      />

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
