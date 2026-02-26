"use client";

import { Button } from "@/components/ui/button";
import { useGetBookingConfirmationQuery } from "@/redux/features/booking/bookingApi";
import { CheckCircle2, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface ConfirmationStepProps {
  bookingId: number;
  onComplete: () => void;
}

export default function ConfirmationStep({
  bookingId,
  onComplete,
}: ConfirmationStepProps) {
  const {
    data: bookingData,
    isLoading,
    error,
  } = useGetBookingConfirmationQuery(bookingId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !bookingData) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load booking confirmation</p>
      </div>
    );
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not set";
    try {
      return format(new Date(dateString), "MMMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  const formatTime = (timeSlot: string | null) => {
    if (!timeSlot) return "Not set";
    return timeSlot.charAt(0).toUpperCase() + timeSlot.slice(1);
  };

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <div className="text-center py-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Booking Confirmed!
        </h2>
        <p className="text-gray-600">
          Your service has been successfully booked.
        </p>
      </div>

      {/* Booking Code & Transaction ID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-700 mb-1">Booking Code</p>
          <p className="text-lg font-bold text-gray-900">
            {bookingData.booking_code}
          </p>
        </div>
        {bookingData.payment && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-700 mb-1">
              Transaction ID
            </p>
            <p className="text-base font-bold text-gray-900 break-all">
              {bookingData.payment.transaction_id}
            </p>
          </div>
        )}
      </div>

      {/* Service Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-lg mb-4">Service Details</h3>

        <div className="space-y-3 mb-4 pb-4 border-b">
          <div className="flex justify-between">
            <span className="text-gray-600">Service Date:</span>
            <span className="font-medium">
              {formatDate(bookingData.service_date)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Time Slot:</span>
            <span className="font-medium">
              {formatTime(bookingData.time_slot)}
            </span>
          </div>
          {bookingData.is_recurring && (
            <div className="flex justify-between">
              <span className="text-gray-600">Recurring:</span>
              <span className="font-medium capitalize">
                {bookingData.recurring_type}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <span className="font-medium capitalize text-green-600">
              {bookingData.status}
            </span>
          </div>
        </div>

        {/* Items */}
        {bookingData.items.map((item) => (
          <div key={item.id} className="mb-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-gray-900">
                  {item.service_name}
                </h4>
                <p className="text-sm text-gray-500">Base Price</p>
              </div>
              <p className="font-bold text-yellow-600">${item.unit_price}</p>
            </div>

            {/* Addons */}
            {item.addons.length > 0 && (
              <div className="space-y-2 ml-4 mb-4">
                {item.addons.map((addon) => (
                  <div key={addon.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">+ {addon.title}</span>
                    <span className="font-medium text-gray-900">
                      ${addon.price}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Price Breakdown */}
        <div className="space-y-3 pb-4 mb-4 border-t pt-4">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span className="font-semibold">${bookingData.sub_total}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Tax</span>
            <span className="font-semibold">${bookingData.tax_amount}</span>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center text-lg font-bold border-t pt-4">
          <span className="text-gray-900">Total Paid</span>
          <span className="text-green-600">${bookingData.total_amount}</span>
        </div>

        {/* Payment Info */}
        {bookingData.payment && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-medium capitalize">
                {bookingData.payment.method}
              </span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-600">Payment Status:</span>
              <span className="font-medium capitalize text-green-600">
                {bookingData.payment.status}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="text-center pt-4">
        <Button onClick={onComplete} size="lg" className="px-8">
          Go to Services
        </Button>
      </div>
    </div>
  );
}
