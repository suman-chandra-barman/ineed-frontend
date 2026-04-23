"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import { ServiceReview, ServiceReviewSummary } from "@/types/service.type";

interface ReviewsProps {
  summary: ServiceReviewSummary;
  reviews: ServiceReview[];
}

export default function Reviews({ summary, reviews }: ReviewsProps) {
  const [visibleReviews, setVisibleReviews] = useState(3);

  const loadMoreReviews = () => {
    setVisibleReviews((prev) => prev + 3);
  };

  const ratingBreakdown = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count:
      summary.rating_breakdown[String(stars) as "1" | "2" | "3" | "4" | "5"],
  }));

  const formatReviewDate = (dateString: string) => {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
      return "";
    }
    return date.toLocaleDateString();
  };

  const getReviewImage = (imagePath: string | null) => {
    if (!imagePath) {
      return "";
    }
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }
    return `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${imagePath}`;
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const renderRatingBars = (stars: number, count: number) => {
    const percentage = summary.total_reviews
      ? (count / summary.total_reviews) * 100
      : 0;

    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600 w-24">{stars} star rating</span>
        <div className="flex items-center gap-2 flex-1">
          {renderStars(stars)}
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-400 transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        <span className="text-sm text-gray-400 w-12 text-right">({count})</span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
          Reviews ({summary.total_reviews})
        </h2>

        {/* Reviews Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Customer Reviews & Ratings Card */}
          <div className="border border-gray-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Customer Reviews & Ratings
            </h3>
            <div className="flex items-center justify-center gap-1 mb-2">
              {renderStars(summary.average_rating)}
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              ({summary.average_rating.toFixed(1)} out of 5.0)
            </p>
            <p className="text-sm text-gray-600">
              Base On {summary.total_reviews.toLocaleString()} Reviews
            </p>
          </div>

          {/* Rating Breakdown */}
          <div className="border border-gray-200 rounded-lg p-6 space-y-3">
            {ratingBreakdown.map((item) => (
              <div key={item.stars}>
                {renderRatingBars(item.stars, item.count)}
              </div>
            ))}
          </div>
        </div>

        {/* Individual Reviews */}
        <div className="space-y-6">
          {reviews.slice(0, visibleReviews).map((review) => (
            <div
              key={review.id}
              className="border-b border-gray-200 pb-6 last:border-b-0"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                    {review.user_image ? (
                      <Image
                        src={getReviewImage(review.user_image)}
                        alt={review.user_name}
                        className="w-full h-full object-cover"
                        width={48}
                        height={48}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm font-semibold text-gray-600">
                        {review.user_name.slice(0, 1).toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Review Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {review.user_name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {formatReviewDate(review.created_at)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-full w-fit">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-gray-900">
                        {review.rating}/5
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-4">
                    {review.comment}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {reviews.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No reviews yet. Be the first to share feedback.
            </p>
          )}
        </div>

        {/* Load More Button */}
        {visibleReviews < reviews.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMoreReviews}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-md"
            >
              load more
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
