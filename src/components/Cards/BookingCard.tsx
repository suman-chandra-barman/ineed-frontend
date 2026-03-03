import Image, { StaticImageData } from "next/image";
import { MessageCircle, Star } from "lucide-react";
import { Button } from "../ui/button";

export type BookingStatus =
  | "pending"
  | "assign"
  | "assigned"
  | "in-progress"
  | "in_progress"
  | "complete"
  | "completed"
  | "cancelled"
  | "draft";

export interface BookingCardProps {
  id: string;
  serviceImage: string | StaticImageData;
  serviceTitle: string;
  bookingDate: string;
  bookingTime: string;
  amount: string | number;
  location: string;
  providerName: string;
  providerContact: string;
  status: BookingStatus;
  onNavigate?: () => void;
  onChatClick?: () => void;
  onReviewClick?: () => void;
}

const statusConfig: Record<
  BookingStatus,
  { label: string; bgColor: string; textColor: string }
> = {
  pending: {
    label: "Pending",
    bgColor: "bg-amber-100",
    textColor: "text-amber-700",
  },
  assign: {
    label: "Assigned",
    bgColor: "bg-purple-100",
    textColor: "text-purple-700",
  },
  assigned: {
    label: "Assigned",
    bgColor: "bg-purple-100",
    textColor: "text-purple-700",
  },
  "in-progress": {
    label: "In Progress",
    bgColor: "bg-blue-100",
    textColor: "text-blue-700",
  },
  in_progress: {
    label: "In Progress",
    bgColor: "bg-blue-100",
    textColor: "text-blue-700",
  },
  complete: {
    label: "Complete",
    bgColor: "bg-emerald-100",
    textColor: "text-emerald-700",
  },
  completed: {
    label: "Completed",
    bgColor: "bg-emerald-100",
    textColor: "text-emerald-700",
  },
  cancelled: {
    label: "Cancelled",
    bgColor: "bg-red-100",
    textColor: "text-red-700",
  },
  draft: {
    label: "Draft",
    bgColor: "bg-gray-100",
    textColor: "text-gray-600",
  },
};

export default function BookingCard({
  serviceImage,
  serviceTitle,
  bookingDate,
  bookingTime,
  amount,
  location,
  providerName,
  providerContact,
  status,
  onNavigate,
  onChatClick,
  onReviewClick,
}: BookingCardProps) {
  const statusStyle = statusConfig[status];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-2 sm:p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Service Image — clickable */}
        <div
          onClick={onNavigate}
          className="relative w-full sm:w-28 h-40 sm:h-28 rounded-xl overflow-hidden shrink-0 cursor-pointer"
        >
          <Image
            src={serviceImage}
            alt={serviceTitle}
            fill
            className="object-cover hover:scale-105 transition-transform duration-200"
          />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3">
          {/* Title — clickable */}
          <h3
            onClick={onNavigate}
            className="text-lg sm:text-xl font-semibold text-gray-900 cursor-pointer hover:text-primary hover:underline transition-colors"
          >
            {serviceTitle}
          </h3>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-gray-500 font-medium whitespace-nowrap">
                Booking date
              </span>
              <span className="text-gray-500">:</span>
              <span className="text-gray-700">
                {bookingDate}, {bookingTime}
              </span>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-gray-500 font-medium whitespace-nowrap">
                Amount
              </span>
              <span className="text-gray-500">:</span>
              <span className="text-gray-700 font-semibold">
                ${Number(amount).toLocaleString()}
              </span>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-gray-500 font-medium whitespace-nowrap">
                Location
              </span>
              <span className="text-gray-500">:</span>
              <span className="text-gray-700">{location}</span>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-gray-500 font-medium whitespace-nowrap">
                Provider
              </span>
              <span className="text-gray-500">:</span>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold">
                  {providerName.charAt(0).toUpperCase()}
                </div>
                <span className="text-gray-700">{providerName}</span>
                <span className="text-gray-400">› {providerContact}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex sm:flex-col gap-2 justify-end sm:justify-start">
          {/* Chat Button */}
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onChatClick?.();
            }}
            size="sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat</span>
          </Button>

          {/* Status Badge */}
          <div
            className={`px-4 py-1.5 rounded-lg text-sm font-medium text-center ${statusStyle.bgColor} ${statusStyle.textColor}`}
          >
            {statusStyle.label}
          </div>

          {/* Review Button - Only show for completed bookings */}
          {(status === "complete" || status === "completed") && (
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onReviewClick?.();
              }}
              className=" bg-amber-400 hover:bg-amber-500"
            >
              <Star className="w-4 h-4" />
              <span>Review</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
