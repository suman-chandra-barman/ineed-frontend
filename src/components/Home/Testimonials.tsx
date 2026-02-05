"use client";

import { useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import useEmblaCarousel from "embla-carousel-react";

interface Testimonial {
  id: number;
  text: string;
  name: string;
  location: string;
  avatar: string;
}

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { align: "start" },
      "(min-width: 1024px)": { align: "start" },
    },
  });

  const testimonials: Testimonial[] = [
    {
      id: 1,
      text: "ineedllc feels different from other platforms. Everything is transparent, professional, and well-managed. I always know what's happening with my service.",
      name: "Jhon Marcel",
      location: "Miami, Florida",
      avatar: "/avatar-1.jpg",
    },
    {
      id: 2,
      text: "I loved how easy everything was. I didn't have to worry about finding the right person—they handled it for me. The before and after photos gave me complete confidence in the work.",
      name: "Jhon Marcel",
      location: "United State",
      avatar: "/avatar-2.jpg",
    },
    {
      id: 3,
      text: "What stood out most was the support. When I had a question, the admin stepped in immediately and solved it. This level of service is rare.",
      name: "Jhon Marcel",
      location: "Portugal",
      avatar: "/avatar-3.jpg",
    },
    {
      id: 4,
      text: "ineedllc feels different from other platforms. Everything is transparent, professional, and well-managed. I always know what's happening with my service.",
      name: "Jhon Marcel",
      location: "Miami, Florida",
      avatar: "/avatar-1.jpg",
    },
    {
      id: 5,
      text: "I loved how easy everything was. I didn't have to worry about finding the right person—they handled it for me. The before and after photos gave me complete confidence in the work.",
      name: "Jhon Marcel",
      location: "United State",
      avatar: "/avatar-2.jpg",
    },
    {
      id: 6,
      text: "What stood out most was the support. When I had a question, the admin stepped in immediately and solved it. This level of service is rare.",
      name: "Jhon Marcel",
      location: "Portugal",
      avatar: "/avatar-3.jpg",
    },
  ];

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
                      {testimonial.text}
                    </p>

                    {/* User Info */}
                    <div className="flex items-center gap-4">
                      <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {testimonial.location}
                        </p>
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

        {/* Share Your Thought Button */}
        <div className="text-center">
          <Button className="px-12 py-6 text-base font-semibold rounded-xl">
            Share Your Thought
          </Button>
        </div>
      </div>
    </section>
  );
}
