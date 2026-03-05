"use client";

import { memo, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Loader2, Star } from "lucide-react";
import { toast } from "sonner";

import type { Service } from "@/types/service.type";
import { useCreateBookingMutation } from "@/redux/features/booking/bookingApi";
import { useToggleFavoriteMutation } from "@/redux/features/service/serviceApi";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import placeholderImage from "@/assets/service-1.jpg";

// Types
interface ServiceCardProps {
  service: Service;
  priority?: boolean;
  isFavorite?: boolean;
}

interface ApiError {
  data?: {
    message?: string;
    detail?: string;
  };
}

// Utils
const getImageUrl = (
  imagePath: string | null,
): string | typeof placeholderImage => {
  if (!imagePath) return placeholderImage;
  return `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${imagePath}`;
};

const getErrorMessage = (error: unknown, fallback: string): string => {
  const apiError = error as ApiError;
  return apiError?.data?.message || apiError?.data?.detail || fallback;
};

const ServiceCard = memo(function ServiceCard({
  service,
  priority = false,
  isFavorite = false,
}: ServiceCardProps) {
  const router = useRouter();
  const [createBooking, { isLoading: isBookingLoading }] =
    useCreateBookingMutation();
  const [toggleFavorite, { isLoading: isFavoriteLoading }] =
    useToggleFavoriteMutation();

  // Memoized derived data
  const serviceData = useMemo(() => {
    const hasDiscount = service.man_price !== service.offer_price;

    return {
      id: service.id,
      title: service.name,
      description: service.description,
      image: getImageUrl(service.image),
      price: `$${service.offer_price}`,
      originalPrice: hasDiscount ? `$${service.man_price}` : null,
      rating: service.rating,
      isFavorited: service.is_favorite ?? isFavorite,
    };
  }, [service, isFavorite]);

  const serviceUrl = `/services/${serviceData.id}`;

  const handleBookNow = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();

      try {
        const result = await createBooking({
          service_id: serviceData.id,
        }).unwrap();
        router.push(`/booking/${result.id}`);
      } catch (error) {
        console.error("Failed to create booking:", error);
        toast.error(
          getErrorMessage(error, "Failed to create booking. Please try again."),
        );
      }
    },
    [createBooking, serviceData.id, router],
  );

  const handleFavoriteClick = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      try {
        const result = await toggleFavorite(serviceData.id).unwrap();
        const message = result.data.is_favorite
          ? "Added to favorites"
          : "Removed from favorites";
        toast.success(message);
      } catch (error) {
        console.error("Failed to toggle favorite:", error);
        toast.error(
          getErrorMessage(
            error,
            "Failed to update favorite. Please try again.",
          ),
        );
      }
    },
    [toggleFavorite, serviceData.id],
  );

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
      {/* Image Section */}
      <Link
        href={serviceUrl}
        className="relative block h-48 overflow-hidden bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:h-56"
        aria-label={`View ${serviceData.title} service details`}
      >
        <Image
          src={serviceData.image}
          alt={`${serviceData.title} service thumbnail`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={priority}
          loading={priority ? undefined : "lazy"}
        />

        {/* Favorite Button */}
        <button
          type="button"
          onClick={handleFavoriteClick}
          disabled={isFavoriteLoading}
          className="absolute right-3 top-3 z-10 rounded-full bg-white p-2 shadow-md transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={
            serviceData.isFavorited
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          {isFavoriteLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          ) : (
            <Heart
              className={cn(
                "h-5 w-5 transition-colors duration-200",
                serviceData.isFavorited
                  ? "fill-red-500 text-red-500"
                  : "text-gray-400 hover:text-red-500",
              )}
            />
          )}
        </button>
      </Link>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <Link
          href={serviceUrl}
          className="rounded focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <h3 className="mb-2 line-clamp-2 text-base font-semibold text-gray-900 sm:text-lg">
            {serviceData.title}
          </h3>
        </Link>

        <p className="mb-4 line-clamp-2 grow text-xs text-gray-600 sm:text-sm">
          {serviceData.description}
        </p>

        {/* Price and Rating */}
        <div className="mb-4 flex items-center justify-between">
          <PriceDisplay
            price={serviceData.price}
            originalPrice={serviceData.originalPrice}
          />
          {serviceData.rating > 0 && (
            <RatingDisplay rating={serviceData.rating} />
          )}
        </div>

        {/* Book Now Button */}
        <Button
          onClick={handleBookNow}
          disabled={isBookingLoading}
          className="w-full py-2.5 text-sm sm:py-3 sm:text-base"
          aria-label={`Book ${serviceData.title} now`}
        >
          {isBookingLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Book Now"
          )}
        </Button>
      </div>
    </article>
  );
});

// Sub-components
interface PriceDisplayProps {
  price: string;
  originalPrice: string | null;
}

function PriceDisplay({ price, originalPrice }: PriceDisplayProps) {
  return (
    <div>
      <span className="text-xs text-gray-600 sm:text-sm">Price: </span>
      {originalPrice && (
        <span className="mr-2 text-xs text-gray-400 line-through sm:text-sm">
          {originalPrice}
        </span>
      )}
      <span className="text-sm font-bold text-gray-900 sm:text-base">
        {price}
      </span>
    </div>
  );
}

interface RatingDisplayProps {
  rating: number;
}

function RatingDisplay({ rating }: RatingDisplayProps) {
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`Rated ${rating} out of 5 stars`}
    >
      <Star
        className="h-4 w-4 fill-amber-400 text-amber-400 sm:h-5 sm:w-5"
        aria-hidden="true"
      />
      <span className="text-sm font-semibold text-gray-900 sm:text-base">
        {rating}
      </span>
    </div>
  );
}

export default ServiceCard;
