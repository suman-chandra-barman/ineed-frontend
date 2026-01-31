"use client";

import BookingDetailsView from "@/components/Dashboard/BookingDetailsView";
import cleanningServiceImage from "@/assets/service-1.jpg";

// This would typically come from your API based on the booking ID
// For now, using sample data
const bookingData = {
  bookingId: "56525",
  bookingDate: "27 April, 2026",
  location: "27 April, 2026",
  serviceImage: cleanningServiceImage,
  serviceTitle: "Inside Refrigerator Cleaning",
  serviceDescription: "A minute repair service...",
  amount: 30,
  bookingDateTime: "27 Jan, 2026 • 4:00 AM-7:00 PM",
  mainService: 59.0,
  additionalService: 59.0,
  tax: 60.0,
  total: 75.05,
  providerName: "Jhon Smith",
  providerEmail: "Name@gmail.com",
  providerContact: "+1 8888 8888",
  providerAddress: "United State",
  beforeImage: cleanningServiceImage,
  afterImage: cleanningServiceImage,
  status: "in-progress" as const,
};

export default function BookingDetailsPage() {
  return <BookingDetailsView {...bookingData} />;
}
