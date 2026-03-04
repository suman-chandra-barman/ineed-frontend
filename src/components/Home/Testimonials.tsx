"use client";

import { useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import useEmblaCarousel from "embla-carousel-react";
import { useGetTestimonialsQuery } from "@/redux/features/booking/bookingApi";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? "";

export default function Testimonials() {
  const { data, isLoading } = useGetTestimonialsQuery();
  const testimonials = data?.data ?? [];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { align: "start" },
      "(min-width: 1024px)": { align: "start" },
    },
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="bg-[#FBFBFB]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 sm:mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              What Our <span className="text-primary">Customers Say</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mt-2">
              Real experiences from customers who trust iNeed
            </p>
          </div>

          {/* Navigation Arrows - Desktop */}
          <div className="hidden sm:flex gap-3">
            <Button
              onClick={scrollPrev}
              variant="outline"
              size="icon"
              className="w-12 h-12 rounded-full border-2 "
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              onClick={scrollNext}
              size="icon"
              variant="outline"
              className="w-12 h-12 rounded-full border-2"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Carousel Container */}
        {isLoading ? (
          <div className="flex gap-6 mb-10 sm:mb-12">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
              >
                <div className="bg-white rounded-3xl p-6 lg:p-8 border-2 border-gray-100 h-full animate-pulse">
                  <div className="w-10 h-10 bg-gray-200 rounded mb-6" />
                  <div className="space-y-2 mb-8">
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                    <div className="h-4 bg-gray-200 rounded w-4/6" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gray-200 rounded-full" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-24" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative mb-10 sm:mb-12">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
                  >
                    <div className="bg-white rounded-3xl p-6 lg:p-8 border-2 border-gray-100 hover:border-[#0071bc] hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                      {/* Quote Icon */}
                      <div className="mb-6">
                        <Quote className="w-10 h-10 text-gray-200" />
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-base sm:text-lg text-gray-700 mb-8 leading-relaxed flex-grow">
                        {testimonial.comment}
                      </p>

                      {/* User Info */}
                      <div className="flex items-center gap-4">
                        <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                          <Image
                            src={
                              testimonial.user_image
                                ? `${BASE_URL}${testimonial.user_image}`
                                : "/avatar-1.jpg"
                            }
                            alt={testimonial.user_name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">
                            {testimonial.user_name}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows - Mobile */}
            <div className="flex sm:hidden justify-center gap-3 mt-6">
              <Button
                onClick={scrollPrev}
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-full border-2 "
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                onClick={scrollNext}
                size="icon"
                className="w-12 h-12 rounded-full"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
