"use client";

import{ useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import StartJobConfirmModal from "./StartJobConfirmModal";

interface JobActionsProps {
  jobId: string;
  status: string;
}

export default function JobActions({ jobId, status }: JobActionsProps) {
  const router = useRouter();
  const [isStartJobModalOpen, setIsStartJobModalOpen] = useState(false);

  const handleCancelJob = () => {
    // Handle cancel job logic
    if (confirm("Are you sure you want to cancel this job?")) {
      console.log("Cancel job:", jobId);
      // Add your cancel job API call here
    }
  };

  const handleStartJob = () => {
    // Handle start job logic
    console.log("Start job:", jobId);
    // Add your start job API call here
    setIsStartJobModalOpen(false);
  };

  return (
    <>
      <div className="mt-6 flex items-center justify-center gap-4">
        <Button variant="outline" onClick={handleCancelJob} size="lg">
          Cancel Job
        </Button>

        <Button onClick={() => setIsStartJobModalOpen(true)} size="lg">
          Start Job
        </Button>
      </div>

      <StartJobConfirmModal
        isOpen={isStartJobModalOpen}
        onClose={() => setIsStartJobModalOpen(false)}
        onConfirm={handleStartJob}
      />
    </>
  );
}
