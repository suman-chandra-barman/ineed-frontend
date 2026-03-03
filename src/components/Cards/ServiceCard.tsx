/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Service as StaticService } from "../Home/Services";
import { Service as ApiService } from "@/types/service.type";
import { Star, Heart, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useCreateBookingMutation } from "@/redux/features/booking/bookingApi";
import { useToggleFavoriteMutation } from "@/redux/features/service/serviceApi";
import { toast } from "sonner";
import placeholderImage from "@/assets/service-1.jpg";

interface ServiceCardProps {
  service: StaticService | ApiService;
  priority?: boolean;
  isFavorite?: boolean;
}

// Type guard to check if service is from API
const isApiService = (
  service: StaticService | ApiService,
): service is ApiService => {
  return "category_id" in service;
};

const ServiceCard = memo(
  ({ service, priority = false, isFavorite = false }: ServiceCardProps) => {
    const router = useRouter();
    const [createBooking, { isLoading }] = useCreateBookingMutation();
    const [toggleFavorite, { isLoading: isFavoriteLoading }] =
      useToggleFavoriteMutation();

    // Extract data based on service type
    const serviceData = isApiService(service)
      ? {
          id: service.id,
          title: service.name,
          description: service.description,
          image: service.image
            ? `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${service.image}`
            : placeholderImage,
          price: `$${service.offer_price}`,
          originalPrice:
            service.man_price !== service.offer_price
              ? `$${service.man_price}`
              : null,
          rating: 4.5, // Default rating since API doesn't provide it yet
          isFavorited: service.is_favorite ?? isFavorite,
        }
      : {
          id: service.id,
          title: service.title,
          description: service.description,
          image: service.image,
          price: service.price,
          originalPrice: null,
          rating: service.rating,
          isFavorited: isFavorite,
        };

    const handleBookNow = async (e: React.MouseEvent) => {
      e.preventDefault();
      try {
        const result = await createBooking({
          service_id: serviceData.id,
        }).unwrap();

        // Navigate to booking page with booking ID
        router.push(`/booking/${result.id}`);
      } catch (error: any) {
        console.error("Failed to create booking:", error);
        toast.error(
          error?.data?.message ||
            error?.data?.detail ||
            "Failed to create booking. Please try again.",
        );
      }
    };

    const handleFavoriteClick = async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      try {
        const result = await toggleFavorite(serviceData.id).unwrap();
        toast.success(
          result.data.is_favorite
            ? "Added to favorites"
            : "Removed from favorites",
        );
      } catch (error: any) {
        console.error("Failed to toggle favorite:", error);
        toast.error(
          error?.data?.message ||
            error?.data?.detail ||
            "Failed to update favorite. Please try again.",
        );
      }
    };

    return (
      <article className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group">
        {/* Image */}
        <Link
          href={`/services/${serviceData.id}`}
          className="relative h-48 sm:h-56 bg-gray-200 overflow-hidden block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label={`View ${serviceData.title} service details`}
        >
          <Image
            src={serviceData.image}
            alt={`${serviceData.title} service thumbnail`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority={priority}
            loading={priority ? undefined : "lazy"}
          />

          {/* Favorite Icon */}
          <button
            onClick={handleFavoriteClick}
            disabled={isFavoriteLoading}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 z-10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={
              serviceData.isFavorited
                ? "Remove from favorites"
                : "Add to favorites"
            }
          >
            {isFavoriteLoading ? (
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
            ) : (
              <Heart
                className={`w-5 h-5 transition-colors duration-200 ${
                  serviceData.isFavorited
                    ? "fill-red-500 text-red-500"
                    : "text-gray-400 hover:text-red-500"
                }`}
              />
            )}
          </button>
        </Link>

        {/* Content */}
        <div className="p-5 sm:p-6 flex flex-col flex-1">
          <Link
            href={`/services/${serviceData.id}`}
            className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
          >
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {serviceData.title}
            </h3>
          </Link>
          <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-2 grow">
            {serviceData.description}
          </p>

          {/* Price and Rating */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs sm:text-sm text-gray-600">Price: </span>
              {serviceData.originalPrice && (
                <span className="text-xs sm:text-sm text-gray-400 line-through mr-2">
                  {serviceData.originalPrice}
                </span>
              )}
              <span className="text-sm sm:text-base font-bold text-gray-900">
                {serviceData.price}
              </span>
            </div>
            <div
              className="flex items-center gap-1"
              aria-label={`Rated ${serviceData.rating} out of 5 stars`}
            >
              <Star
                className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400"
                aria-hidden="true"
              />
              <span className="text-sm sm:text-base font-semibold text-gray-900">
                {serviceData.rating}
              </span>
            </div>
          </div>

          {/* Book Now Button */}
          <Button
            onClick={handleBookNow}
            disabled={isLoading}
            className="w-full py-2.5 sm:py-3 text-sm sm:text-base"
            aria-label={`Book ${serviceData.title} now`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              "Book Now"
            )}
          </Button>
        </div>
      </article>
    );
  },
);

ServiceCard.displayName = "ServiceCard";

export default ServiceCard;
