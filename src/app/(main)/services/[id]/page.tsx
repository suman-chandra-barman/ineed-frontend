"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetServiceDetailQuery } from "@/redux/features/service/serviceApi";
import { useToggleFavoriteMutation } from "@/redux/features/service/serviceApi";
import { formatServiceHours } from "@/lib/service/formatServiceHours";
import { ErrorDisplay } from "@/components/Shared/ErrorDisplay";
import Reviews from "@/components/ServiceDetails/Reviews";
import ServiceBooking from "@/components/ServiceDetails/ServiceBooking";
import ServiceGallery from "@/components/ServiceDetails/ServiceGallery";
import ServiceInfo from "@/components/ServiceDetails/ServiceInfo";
import { getErrorMessage, redirectToSigninOnAuthError } from "@/lib/api-error";
import { cn } from "@/lib/utils";
import { ChevronRight, Heart, Home, Star, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ServiceDetailsPage() {
  const params = useParams();
  const serviceId = params.id as string;
  const router = useRouter();

  const [isFavorited, setIsFavorited] = useState<boolean | null>(null);
  const [toggleFavorite, { isLoading: isFavoriteLoading }] =
    useToggleFavoriteMutation();

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
  const currentIsFavorited = isFavorited ?? service.is_favorite ?? false;

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

  const reviewSummary = serviceDetail.review_summary ?? {
    average_rating: 0,
    total_reviews: 0,
    rating_breakdown: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 },
  };

  const handleFavoriteClick = async () => {
    try {
      const result = await toggleFavorite(service.id).unwrap();
      const nextFavorited = result.data.is_favorite;
      setIsFavorited(nextFavorited);

      toast.success(
        nextFavorited ? "Added to favorites" : "Removed from favorites",
      );
    } catch (err) {
      const isAuthError = redirectToSigninOnAuthError(err, () =>
        router.push("/signin"),
      );

      if (!isAuthError) {
        toast.error(
          getErrorMessage(err, "Failed to update favorite. Please try again."),
        );
      }
    }
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
                    {serviceDetail.service.total_bookings} Bookings
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-gray-700">
                    {reviewSummary.average_rating.toFixed(1)}/5
                  </span>
                  <span className="text-sm text-gray-500">
                    ({reviewSummary.total_reviews} reviews)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleFavoriteClick}
                  disabled={isFavoriteLoading}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label={
                    currentIsFavorited
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  {isFavoriteLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  ) : (
                    <Heart
                      className={cn(
                        "w-5 h-5 transition-colors duration-200",
                        currentIsFavorited
                          ? "fill-red-500 text-red-500"
                          : "text-gray-600 hover:text-red-500",
                      )}
                    />
                  )}
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
              additionalServices={serviceDetail.additional_features}
            />
            <Reviews
              summary={reviewSummary}
              reviews={serviceDetail.reviews ?? []}
            />
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
