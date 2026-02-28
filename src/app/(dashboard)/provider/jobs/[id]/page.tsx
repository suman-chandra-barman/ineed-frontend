"use client";

import JobActions from "@/components/Dashboard/JobActions";
import JobDetailsInfo from "@/components/Dashboard/JobDetailsInfo";
import JobImageUpload from "@/components/Dashboard/JobImageUpload";
import JobNote from "@/components/Dashboard/JobNote";
import JobScheduleLocation from "@/components/Dashboard/JobScheduleLocation";
import JobServiceInfo from "@/components/Dashboard/JobServiceInfo";
import { ErrorDisplay } from "@/components/Shared/ErrorDisplay";
import { LoadingSpinner } from "@/components/Shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { useGetJobDetailsQuery } from "@/redux/features/provider/providerApi";
import { MoveLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const getStatusStyle = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-amber-100 text-black hover:bg-amber-100";
    case "in_progress":
      return "bg-blue-100 text-blue-700 hover:bg-blue-100";
    case "completed":
      return "bg-green-100 text-green-700 hover:bg-green-100";
    default:
      return "bg-gray-100 text-gray-700 hover:bg-gray-100";
  }
};

const formatStatus = (status: string) => {
  switch (status) {
    case "pending":
      return "Pending";
    case "in_progress":
      return "In Progress";
    case "completed":
      return "Completed";
    default:
      return status;
  }
};

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = Number(params.id);

  const [jobStatus, setJobStatus] = useState<string>("pending");

  const { data, isLoading, isError } = useGetJobDetailsQuery(bookingId, {
    skip: !bookingId,
  });

  const jobData = data?.data;

  if (isLoading)
    return <LoadingSpinner message="Loading job details..." fullPage />;

  if (isError || !jobData) {
    return (
      <ErrorDisplay
        message="Failed to load job details"
        onRetry={() => window.location.reload()}
        fullPage
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-xl font-bold hover:opacity-70 transition-opacity cursor-pointer"
          >
            <MoveLeft /> Job Details
          </button>
          <Button className={`ml-4 ${getStatusStyle(jobStatus)}`}>
            {formatStatus(jobStatus)}
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <JobDetailsInfo
              jobId={jobData.job_information.job_id}
              category={jobData.job_information.job_category}
              bookingDate={jobData.job_information.booking_date}
            />

            <JobScheduleLocation
              customer={{
                name: jobData.job_schedule_locations.customer_name,
                contact: jobData.job_schedule_locations.contact_number,
              }}
              schedule={{
                date: jobData.job_schedule_locations.date,
                time: jobData.job_schedule_locations.time,
                location: {
                  city: jobData.job_schedule_locations.city_state,
                  zipCode: jobData.job_schedule_locations.zip_code,
                },
              }}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <JobNote description={jobData.job_notes.text} />
            <JobServiceInfo services={jobData.service_information.services} />
            <JobImageUpload
              bookingId={bookingId}
              isUploadable={jobStatus === "in_progress"}
              existingBeforeImages={jobData.image_upload_section.before_images}
              existingAfterImages={jobData.image_upload_section.after_images}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <JobActions
          bookingId={bookingId}
          status={jobStatus}
          onStatusChange={setJobStatus}
        />
      </div>
    </div>
  );
}
