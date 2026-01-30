"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown, Star } from "lucide-react";
import Image from "next/image";

interface ReviewItem {
  id: string;
  author: string;
  avatar: string;
  date: string;
  serviceType: string;
  rating: number;
  comment: string;
  likes: number;
  dislikes: number;
}

interface ReviewsData {
  total: number;
  average: number;
  totalReviews: number;
  breakdown: {
    stars: number;
    count: number;
  }[];
  items: ReviewItem[];
}

interface ReviewsProps {
  reviews: ReviewsData;
}

export default function Reviews({ reviews }: ReviewsProps) {
  const [visibleReviews, setVisibleReviews] = useState(3);

  const loadMoreReviews = () => {
    setVisibleReviews((prev) => prev + 3);
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
    const percentage = (count / reviews.totalReviews) * 100;
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
          Reviews ({reviews.total})
        </h2>

        {/* Reviews Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Customer Reviews & Ratings Card */}
          <div className="border border-gray-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Customer Reviews & Ratings
            </h3>
            <div className="flex items-center justify-center gap-1 mb-2">
              {renderStars(5)}
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              ({reviews.average} out of 5.0)
            </p>
            <p className="text-sm text-gray-600">
              Base On {reviews.totalReviews.toLocaleString()} Reviews
            </p>
          </div>

          {/* Rating Breakdown */}
          <div className="border border-gray-200 rounded-lg p-6 space-y-3">
            {reviews.breakdown.map((item) => (
              <div key={item.stars}>
                {renderRatingBars(item.stars, item.count)}
              </div>
            ))}
          </div>
        </div>

        {/* Individual Reviews */}
        <div className="space-y-6">
          {reviews.items.slice(0, visibleReviews).map((review) => (
            <div
              key={review.id}
              className="border-b border-gray-200 pb-6 last:border-b-0"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                    <Image
                      src={review.avatar}
                      alt={review.author}
                      className="w-full h-full object-cover"
                      width={48}
                      height={48}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          review.author,
                        )}&background=3b82f6&color=fff`;
                      }}
                    />
                  </div>
                </div>

                {/* Review Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {review.author}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {review.date} · {review.serviceType}
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

                  {/* Like/Dislike Buttons */}
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{review.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors">
                      <ThumbsDown className="w-4 h-4" />
                      <span>{review.dislikes}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleReviews < reviews.items.length && (
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
