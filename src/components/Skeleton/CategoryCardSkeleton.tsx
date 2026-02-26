/**
 * CategoryCardSkeleton Component
 *
 * Loading skeleton for category cards
 * Matches the structure and styling of the actual CategoryCard component
 */
export function CategoryCardSkeleton() {
  return (
    <article className="relative w-full h-full animate-pulse">
      {/* Main Card */}
      <div className="border border-gray-200 h-full shadow relative flex flex-col rounded-3xl bg-white p-4">
        {/* Icon Circle */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200" />

        {/* Content */}
        <div className="mt-4 flex flex-1 flex-col space-y-3">
          {/* Title skeleton */}
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="h-6 bg-gray-200 rounded w-1/2" />
          </div>

          {/* Description skeleton */}
          <div className="space-y-2 mt-4">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>
        </div>
      </div>

      {/* Arrow Button Skeleton */}
      <div className="absolute bottom-3 right-3 translate-x-6 translate-y-6 flex h-18 w-18 items-center justify-center rounded-full bg-gray-200">
        <div className="rounded-full w-14 h-14 bg-gray-300" />
      </div>
    </article>
  );
}
