"use client";

import PageHeader from "@/components/Dashboard/PageHeader";
import BookingCard, { BookingCardProps } from "@/components/Cards/BookingCard";
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
  const handleChatClick = (bookingId: string) => {
    console.log("Chat clicked for booking:", bookingId);
    // Navigate to chat or open chat modal
  };

  const handleReviewClick = (bookingId: string) => {
    console.log("Review clicked for booking:", bookingId);
    // Open review modal or navigate to review page
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
            onChatClick={() => handleChatClick(booking.id)}
            onReviewClick={() => handleReviewClick(booking.id)}
          />
        ))}
      </div>

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
