"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import StartJobConfirmModal from "./StartJobConfirmModal";
import CompleteJobConfirmModal from "./CompleteJobConfirmModal";
import {
  useStartJobMutation,
  useCompleteJobMutation,
} from "@/redux/features/provider/providerApi";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface JobActionsProps {
  bookingId: number;
  status: string;
  onStatusChange: (status: string) => void;
}

export default function JobActions({
  bookingId,
  status,
  onStatusChange,
}: JobActionsProps) {
  const [isStartJobModalOpen, setIsStartJobModalOpen] = useState(false);
  const [isCompleteJobModalOpen, setIsCompleteJobModalOpen] = useState(false);
  const [startJob, { isLoading: isStarting }] = useStartJobMutation();
  const [completeJob, { isLoading: isCompleting }] = useCompleteJobMutation();

  const handleStartJob = async () => {
    try {
      const res = await startJob(bookingId).unwrap();
      if (res.success) {
        toast.success("Job started successfully!");
        onStatusChange(res.data.status);
      }
    } catch {
      toast.error("Failed to start job.");
    } finally {
      setIsStartJobModalOpen(false);
    }
  };

  const handleCompleteJob = async () => {
    try {
      const res = await completeJob(bookingId).unwrap();
      if (res.success) {
        toast.success("Job completed successfully!");
        onStatusChange(res.data.status);
      }
    } catch {
      toast.error("Failed to complete job.");
    } finally {
      setIsCompleteJobModalOpen(false);
    }
  };

  // Hide actions when job is completed
  if (status === "completed") {
    return null;
  }

  return (
    <>
      <div className="mt-6 flex items-center justify-center gap-4">
        {status === "pending" && (
          <Button
            onClick={() => setIsStartJobModalOpen(true)}
            size="lg"
            disabled={isStarting}
          >
            {isStarting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Starting...
              </>
            ) : (
              "Start Job"
            )}
          </Button>
        )}

        {status === "in_progress" && (
          <Button
            onClick={() => setIsCompleteJobModalOpen(true)}
            size="lg"
            disabled={isCompleting}
          >
            {isCompleting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Completing...
              </>
            ) : (
              "Complete"
            )}
          </Button>
        )}
      </div>

      <StartJobConfirmModal
        isOpen={isStartJobModalOpen}
        onClose={() => setIsStartJobModalOpen(false)}
        onConfirm={handleStartJob}
      />

      <CompleteJobConfirmModal
        isOpen={isCompleteJobModalOpen}
        onClose={() => setIsCompleteJobModalOpen(false)}
        onConfirm={handleCompleteJob}
      />
    </>
  );
}
