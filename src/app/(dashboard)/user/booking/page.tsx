"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/Dashboard/PageHeader";
import BookingCard, { BookingCardProps } from "@/components/Cards/BookingCard";
import ReviewModal from "@/components/Dashboard/ReviewModal";
import cleanningServiceImage from "@/assets/service-1.jpg";

// Sample booking data - Replace with actual data from your API
const bookings: BookingCardProps[] = [
  {
    id: "1",
    serviceImage: cleanningServiceImage,
    serviceTitle: "Inside Refrigerator Cleaning",
    bookingDate: "27 Sep",
    bookingTime: "Afternoon- 12:00 PM - 4:00 PM",
    amount: 265,
    location: "Alabama, USA",
    providerName: "Rahim Hossain",
    providerContact: "+10 321236 212",
    status: "pending",
  },
  {
    id: "2",
    serviceImage: cleanningServiceImage,
    serviceTitle: "Inside Refrigerator Cleaning",
    bookingDate: "27 Sep",
    bookingTime: "Afternoon- 12:00 PM - 4:00 PM",
    amount: 265,
    location: "Alabama, USA",
    providerName: "Rahim Hossain",
    providerContact: "+10 321236 212",
    status: "assign",
  },
  {
    id: "3",
    serviceImage: cleanningServiceImage,
    serviceTitle: "Inside Refrigerator Cleaning",
    bookingDate: "27 Sep",
    bookingTime: "Afternoon- 12:00 PM - 4:00 PM",
    amount: 265,
    location: "Alabama, USA",
    providerName: "Rahim Hossain",
    providerContact: "+10 321236 212",
    status: "in-progress",
  },
  {
    id: "4",
    serviceImage: cleanningServiceImage,
    serviceTitle: "Inside Refrigerator Cleaning",
    bookingDate: "27 Sep",
    bookingTime: "Afternoon- 12:00 PM - 4:00 PM",
    amount: 265,
    location: "Alabama, USA",
    providerName: "Rahim Hossain",
    providerContact: "+10 321236 212",
    status: "complete",
  },
];

function BookingPage() {
  const router = useRouter();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] =
    useState<BookingCardProps | null>(null);

  const handleBookingClick = (bookingId: string) => {
    router.push(`/user/booking/${bookingId}`);
  };

  const handleChatClick = (bookingId: string) => {
    console.log("Chat clicked for booking:", bookingId);
    // Navigate to chat or open chat modal
  };

  const handleReviewClick = (booking: BookingCardProps) => {
    setSelectedBooking(booking);
    setIsReviewModalOpen(true);
  };

  const handleSubmitReview = (rating: number, review: string) => {
    console.log("Review submitted:", {
      bookingId: selectedBooking?.id,
      rating,
      review,
    });
    // Submit review to your API
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8">
      {/* Page Header */}
      <PageHeader title="Bookings" />

      {/* Booking Cards */}
      <div className="space-y-4 mt-6">
        {bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            {...booking}
            onClick={() => handleBookingClick(booking.id)}
            onChatClick={() => handleChatClick(booking.id)}
            onReviewClick={() => handleReviewClick(booking)}
          />
        ))}
      </div>

      {/* Review Modal */}
      {selectedBooking && (
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          serviceImage={selectedBooking.serviceImage}
          serviceTitle={selectedBooking.serviceTitle}
          serviceDescription="A minute repair service..."
          amount={selectedBooking.amount}
          onSubmit={handleSubmitReview}
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
