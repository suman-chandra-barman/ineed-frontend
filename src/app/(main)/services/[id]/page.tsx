"use client";

import { useParams } from "next/navigation";
import { useGetServiceDetailQuery } from "@/redux/features/service/serviceApi";
import { ServiceHour } from "@/types/service.type";
import { ErrorDisplay } from "@/components/Shared/ErrorDisplay";
import Reviews from "@/components/ServiceDetails/Reviews";
import ServiceBooking from "@/components/ServiceDetails/ServiceBooking";
import ServiceGallery from "@/components/ServiceDetails/ServiceGallery";
import ServiceInfo from "@/components/ServiceDetails/ServiceInfo";
import { ChevronRight, Heart, Home, Star, Loader2 } from "lucide-react";

// Helper function to format service hours
const formatServiceHours = (serviceHours: ServiceHour[]) => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return days.map((day, index) => {
    const hour = serviceHours.find((h) => h.day_of_week === index);

    if (!hour || hour.is_closed) {
      return { day, hours: "", closed: true };
    }

    // Convert 24-hour format to 12-hour format
    const formatTime = (time: string) => {
      const [hours, minutes] = time.split(":");
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? "PM" : "AM";
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      return `${displayHour}:${minutes} ${ampm}`;
    };

    return {
      day,
      hours: `${formatTime(hour.from_time)} - ${formatTime(hour.to_time)}`,
      closed: false,
    };
  });
};

export default function ServiceDetailsPage() {
  const params = useParams();
  const serviceId = params.id as string;

  const { data, isLoading, error } = useGetServiceDetailQuery(
    parseInt(serviceId),
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (error || !data?.success) {
    return (
      <ErrorDisplay
        title="Service Not Found"
        message="We couldn't load the service details. The service may not exist or there was an error loading it."
        onRetry={() => window.location.reload()}
        fullPage={true}
      />
    );
  }

  const serviceDetail = data.data;
  const service = serviceDetail.service;

  console.log("serviceDetail", serviceDetail.additional_features);

  // Prepare images array
  const images = service.images.map(
    (img) => `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${img.image}`,
  );
  if (service.image && images.length === 0) {
    images.push(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${service.image}`);
  }

  // Format service hours
  const serviceHours = formatServiceHours(serviceDetail.service_hours);

  // Calculate discount percentage
  const discount =
    service.man_price && service.offer_price
      ? Math.round(
          ((parseFloat(service.man_price) - parseFloat(service.offer_price)) /
            parseFloat(service.man_price)) *
            100,
        )
      : 0;

  // Mock reviews data (since API doesn't provide it yet)
  const reviews = {
    total: 235,
    average: 4.9,
    totalReviews: 2650,
    breakdown: [
      { stars: 5, count: 156 },
      { stars: 4, count: 156 },
      { stars: 3, count: 156 },
      { stars: 2, count: 156 },
      { stars: 1, count: 156 },
    ],
    items: [
      {
        id: "1",
        author: "Adrian Hendriques",
        avatar:
          "https://ui-avatars.com/api/?name=Adrian+Hendriques&background=3b82f6&color=fff&size=96",
        date: "2 days ago",
        serviceType: "Excellences Service!",
        rating: 4.9,
        comment:
          "The quality of work was exceptional, and they left the site clean and tidy. I was impressed by their attention to detail and commitment to safety standards. Highly recommend their services!",
        likes: 26,
        dislikes: 6,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-4 py-8 sm:py-12 lg:py-16 bg-primary/5">
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-center font-bold">
          Services
        </h1>
        <div className="flex items-center justify-center gap-2">
          <Home size={20} />
          <ChevronRight size={20} />
          <span>Category</span>
          <ChevronRight size={20} />
          <span>Service Details</span>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {service.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-gray-700">
                    302+ Bookings
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-gray-700">
                    4.9/5
                  </span>
                  <span className="text-sm text-gray-500">(123 reviews)</span>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Content - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            <ServiceGallery images={images} />
            <ServiceInfo
              overview={{
                title: "Service Overview",
                description: service.description,
              }}
              additionalServices={serviceDetail.additional_features.map(
                (feature) => ({
                  id: feature.id.toString(),
                  name: feature.name,
                  description: feature.description,
                  price: parseFloat(feature.price),
                  duration: feature.duration,
                  image: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${feature.image}`,
                }),
              )}
            />
            <Reviews reviews={reviews} />
          </div>

          {/* Right Sidebar - 1 column */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <ServiceBooking
                serviceId={serviceId}
                price={parseFloat(service.offer_price)}
                originalPrice={parseFloat(service.man_price)}
                discount={discount}
                serviceHours={serviceHours}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
