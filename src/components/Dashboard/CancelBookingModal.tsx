"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CancelBookingModalProps {
  open: boolean;
  reason: string;
  isSubmitting: boolean;
  onReasonChange: (value: string) => void;
  onConfirm: () => void;
  onOpenChange: (open: boolean) => void;
}

export default function CancelBookingModal({
  open,
  reason,
  isSubmitting,
  onReasonChange,
  onConfirm,
  onOpenChange,
}: CancelBookingModalProps) {
  const isReasonValid = reason.trim().length > 2;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Cancel booking</DialogTitle>
          <DialogDescription>
            Please tell us why you want to cancel this booking. This reason will
            be recorded with your cancellation.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <label
            htmlFor="cancel-reason"
            className="text-sm font-medium text-gray-700"
          >
            Cancel reason
          </label>
          <Textarea
            id="cancel-reason"
            value={reason}
            onChange={(e) => onReasonChange(e.target.value)}
            placeholder="Example: Plan changed"
            rows={4}
            maxLength={300}
          />
          <p className="text-xs text-gray-500">
            {reason.length}/300 characters
          </p>
        </div>

        <DialogFooter className="gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Back
          </Button>
          <Button onClick={onConfirm} disabled={!isReasonValid || isSubmitting}>
            {isSubmitting ? "Cancelling..." : "Confirm cancel"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
