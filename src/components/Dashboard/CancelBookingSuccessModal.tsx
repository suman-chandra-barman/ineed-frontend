"use client";

import { CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CancelBookingResponse } from "@/types/booking.type";

interface CancelBookingSuccessModalProps {
  open: boolean;
  data: CancelBookingResponse | null;
  customerReason: string;
  onOpenChange: (open: boolean) => void;
}

export default function CancelBookingSuccessModal({
  open,
  data,
  customerReason,
  onOpenChange,
}: CancelBookingSuccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            </div>
            <DialogTitle>Booking cancelled successfully</DialogTitle>
          </div>
          <DialogDescription>
            Your booking has been cancelled. Refund and notification details are
            shown below.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Refund amount</span>
            <span className="font-semibold text-gray-900">
              ${data?.refund ?? "0.00"}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Cancellation fee</span>
            <span className="font-semibold text-gray-900">
              ${data?.fee ?? "0.00"}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Fee reason</span>
            <span className="font-medium text-gray-800">
              {data?.reason ?? "N/A"}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Your reason</span>
            <span className="font-medium text-gray-800 text-right">
              {customerReason || "N/A"}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Refund ID</span>
            <span className="font-medium text-gray-800 text-right break-all">
              {data?.stripe_refund_id ?? "N/A"}
            </span>
          </div>
          <div className="pt-2 border-t border-gray-200 space-y-1 text-gray-600">
            <p>Provider assigned: {data?.provider_assigned ? "Yes" : "No"}</p>
            <p>Provider chat sent: {data?.provider_chat_sent ? "Yes" : "No"}</p>
            <p>
              Provider email sent: {data?.provider_email_sent ? "Yes" : "No"}
            </p>
          </div>
          {data?.provider_message ? (
            <p className="pt-2 text-gray-700">{data.provider_message}</p>
          ) : null}
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
