"use client";

import { CategoryCard } from "@/components/Cards/CategoryCard";
import { ChevronRight, Home } from "lucide-react";

function CategoriesPage() {
  const categories = [
    {
      title: "Residential Services",
      description:
        "From regular housekeeping to deep cleaning, we ensure your home is always welcoming and pristine.",
    },
    {
      title: "Commercial Services",
      description:
        "Keep your workplace clean and pristine with our comprehensive commercial cleaning services.",
    },
    {
      title: "Specialize Cleaning",
      description:
        "We Offer specialized services, including carpet cleaning, window washing, and address specific cleaning needs.",
    },
    {
      title: "Commercial Services",
      description:
        "Keep your workplace clean and pristine with our comprehensive commercial cleaning services.",
    },
    {
      title: "Specialize Cleaning",
      description:
        "We Offer specialized services, including carpet cleaning, window washing, and address specific cleaning needs.",
    },
    {
      title: "Office Cleaning",
      description:
        "Keep your workplace clean and pristine with our comprehensive commercial cleaning services.",
    },
    {
      title: "Commercial Services",
      description:
        "Keep your workplace clean and pristine with our comprehensive commercial cleaning services.",
    },
    {
      title: "Residential Services",
      description:
        "From regular housekeeping to deep cleaning, we ensure your home is always welcoming and pristine.",
    },
  ];

  return (
    <main className="bg-[#FBFBFB]">
      <div className="space-y-4 py-8 sm:py-12 lg:py-16 bg-primary/5">
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-center font-bold">
          Services
        </h1>
        <div className="flex items-center justify-center gap-2">
          <Home size={20} />
          <ChevronRight size={20} />
          <span>Services</span>
        </div>
      </div>
      <div className="mx-auto container px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <div key={index} className="flex justify-center">
              <CategoryCard
                title={category.title}
                description={category.description}
                onClick={() => console.log(`Clicked: ${category.title}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
export default CategoriesPage;
