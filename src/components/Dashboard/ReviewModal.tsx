"use client";

import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { X, Star, Loader2, CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
  useGetUserBookingReviewQuery,
  useCreateUserBookingReviewMutation,
} from "@/redux/features/booking/bookingApi";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: number;
  serviceImage: string | StaticImageData;
  serviceTitle: string;
  amount: number;
}

export default function ReviewModal({
  isOpen,
  onClose,
  bookingId,
  serviceImage,
  serviceTitle,
  amount,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  /* Fetch existing review */
  const { data: existingReview, isLoading: reviewLoading } =
    useGetUserBookingReviewQuery(bookingId, { skip: !isOpen });

  /* Populate form when existing review loads */
  useEffect(() => {
    if (existingReview?.data) {
      setRating(existingReview.data.rating);
      setComment(existingReview.data.comment);
    }
  }, [existingReview]);

  const [createReview, { isLoading: submitting }] =
    useCreateUserBookingReviewMutation();

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (rating === 0) return;
    try {
      await createReview({ bookingId, rating, comment }).unwrap();
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 1500);
    } catch {
      /* error handled silently â€“ could add toast here */
    }
  };

  const handleCancel = () => {
    setRating(existingReview?.data?.rating ?? 0);
    setComment(existingReview?.data?.comment ?? "");
    setSubmitted(false);
    onClose();
  };

  const isExisting = Boolean(existingReview?.data);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative animate-in fade-in zoom-in duration-200">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          {isExisting ? "Your Review" : "Write a Review"}
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
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-primary">${amount}</div>
            <div className="text-xs text-gray-500">Starting From</div>
          </div>
        </div>

        {reviewLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : submitted ? (
          <div className="flex flex-col items-center gap-3 py-8">
            <CheckCircle className="w-12 h-12 text-emerald-500" />
            <p className="text-gray-700 font-medium">Review submitted!</p>
          </div>
        ) : (
          <>
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

            {/* Comment */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Write your review
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Please write your review"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleCancel}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={rating === 0 || submitting}
                className="flex-1"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                {isExisting ? "Update" : "Send"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
