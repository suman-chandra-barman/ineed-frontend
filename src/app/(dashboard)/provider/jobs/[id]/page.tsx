"use client";

import JobActions from "@/components/Dashboard/JobActions";
import JobDetailsInfo from "@/components/Dashboard/JobDetailsInfo";
import JobImageUpload from "@/components/Dashboard/JobImageUpload";
import JobNote from "@/components/Dashboard/JobNote";
import JobScheduleLocation from "@/components/Dashboard/JobScheduleLocation";
import JobServiceInfo from "@/components/Dashboard/JobServiceInfo";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;

  // Mock data - replace with actual API call
  const jobData = {
    jobId: "#CD002",
    category: "Home Cleaning",
    bookingDate: "March 12, 2025",
    description:
      "Please focus on kitchen and bathroom areas. Cleaning supplies are available under the sink.",
    customer: {
      name: "John Doe",
      contact: "+1 345 823 9384",
    },
    schedule: {
      date: "March 12, 2025",
      time: "10:00 AM - 1:00 PM",
      location: {
        city: "Brooklyn, NY",
        zipCode: "11215",
      },
    },
    services: [
      {
        id: "1",
        name: "Inside Refrigerator Cleaning",
        description: "A reliable repair servic...",
        duration: "30 min",
        price: 30,
        image: "/service-placeholder.jpg",
        sub: [],
      },
    ],
    status: "Pending",
  };

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
          <Button className="ml-4 bg-amber-100 text-black hover:bg-amber-100">
            Pending
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <JobDetailsInfo
              jobId={jobData.jobId}
              category={jobData.category}
              bookingDate={jobData.bookingDate}
            />

            <JobScheduleLocation
              customer={jobData.customer}
              schedule={jobData.schedule}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <JobNote description={jobData.description} />
            <JobServiceInfo services={jobData.services} />
            <JobImageUpload />
          </div>
        </div>

        {/* Action Buttons */}
        <JobActions jobId={jobId} status={jobData.status} />
      </div>
    </div>
  );
}
