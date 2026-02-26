/**
 * ServiceCardSkeleton Component
 *
 * Loading skeleton for service cards
 * Matches the structure and styling of the actual ServiceCard component
 */
export function ServiceCardSkeleton() {
  return (
    <article className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
      {/* Image Skeleton */}
      <div className="relative h-48 sm:h-56 bg-gray-200" />

      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 space-y-4">
        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 rounded w-3/4" />
          <div className="h-5 bg-gray-200 rounded w-1/2" />
        </div>

        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>

        {/* Price and Rating skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-6 bg-gray-200 rounded w-20" />
          <div className="h-6 bg-gray-200 rounded w-12" />
        </div>

        {/* Button skeleton */}
        <div className="h-10 bg-gray-200 rounded w-full" />
      </div>
    </article>
  );
}
