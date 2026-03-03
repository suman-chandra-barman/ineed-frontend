"use client";

import ServiceCard from "@/components/Cards/ServiceCard";
import PageHeader from "@/components/Dashboard/PageHeader";
import { ErrorDisplay, LoadingSpinner } from "@/components/Shared";
import { useGetFavoritesQuery } from "@/redux/features/service/serviceApi";

function FavoritePage() {
  const { data, isLoading, isError } = useGetFavoritesQuery({});

  // loadin and error states
  if (isLoading) {
    return <LoadingSpinner message="Loading favorites..." fullPage />;
  }

  if (isError) {
    return (
      <ErrorDisplay
        message="Failed to load favorites"
        onRetry={() => window.location.reload()}
        fullPage
      />
    );
  }

  const favorites = data?.data || [];

  return (
    <div className="p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8">
      <PageHeader title="Favorite" />

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-gray-600 text-center text-lg">
            No favorite services yet.
          </p>
          <p className="text-gray-500 text-center text-sm mt-2">
            Browse services and add them to your favorites!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          {favorites.map((favorite) => {
            // Transform favorite data to match Service type
            const service = {
              id: favorite.service_id,
              category_id: favorite.category_id,
              name: favorite.service_name,
              description: favorite.service_description,
              man_price: favorite.man_price,
              offer_price: favorite.offer_price,
              discount: favorite.discount,
              image: favorite.service_image,
              images: [],
              is_active: true,
              created_at: "",
              updated_at: "",
            };
            return (
              <ServiceCard
                key={favorite.favorite_id}
                service={service}
                isFavorite={favorite.is_favorite}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FavoritePage;
