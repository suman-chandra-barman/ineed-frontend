"use client";

import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";

interface ServiceGalleryProps {
  images: StaticImageData[] | string[];
}

export default function ServiceGallery({ images }: ServiceGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
    axis: "y",
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaApi || !emblaThumbsApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaApi.selectedScrollSnap());
  }, [emblaApi, emblaThumbsApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[1fr,120px] gap-3 p-4">
        {/* Main Carousel */}
        <div className="relative overflow-hidden rounded-lg order-1 md:order-1">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {images.map((image, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0">
                  <div className="relative aspect-video bg-gray-200">
                    <Image
                      src={image}
                      alt={`Service image ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://placehold.co/800x500/e5e7eb/6b7280?text=Image+${index + 1}`;
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 text-gray-800" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 text-gray-800" />
          </button>
        </div>

        {/* Thumbnail Navigation - Hidden on mobile, vertical on desktop */}
        <div className="order-2 md:order-2">
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-96 scrollbar-hide">
            <div className="flex md:flex-col gap-2" ref={emblaThumbsRef}>
              <div className="flex gap-2  pl-1">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => onThumbClick(index)}
                    className={`relative shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
                      index === selectedIndex
                        ? "ring-2 ring-primary opacity-100"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://placehold.co/120x120/e5e7eb/6b7280?text=${index + 1}`;
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll indicator for mobile */}
          <div className="flex md:hidden justify-center mt-2 gap-1">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all ${
                  index === selectedIndex
                    ? "w-6 bg-blue-500"
                    : "w-1 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
