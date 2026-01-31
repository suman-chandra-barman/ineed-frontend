"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { X, Star } from "lucide-react";
import { Button } from "../ui/button";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceImage: string | StaticImageData;
  serviceTitle: string;
  serviceDescription: string;
  amount: number;
  onSubmit: (rating: number, review: string) => void;
}

export default function ReviewModal({
  isOpen,
  onClose,
  serviceImage,
  serviceTitle,
  serviceDescription,
  amount,
  onSubmit,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating, review);
      // Reset form
      setRating(0);
      setReview("");
      onClose();
    }
  };

  const handleCancel = () => {
    setRating(0);
    setReview("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          Write a Review
        </h2>

        {/* Service Info */}
        <div className="flex items-start gap-3 mb-6">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
            <Image
              src={serviceImage}
              alt={serviceTitle}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{serviceTitle}</h3>
            <p className="text-xs text-gray-500">{serviceDescription}</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-primary">${amount}</div>
            <div className="text-xs text-gray-500">Starting From</div>
          </div>
        </div>

        {/* Rating */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Rate this service
          </label>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hoveredRating || rating)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Review Text */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Write your review
          </label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="please write your review"
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button onClick={handleCancel} variant="outline" className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="flex-1"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
