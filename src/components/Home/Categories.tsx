"use client";

import Image from "next/image";
import { CategoryCard } from "../Cards/CategoryCard";
import clening from "@/assets/women-cleaning.png";
import { Button } from "../ui/button";
import Link from "next/link";
import { useGetCategoriesQuery } from "@/redux/features/category/categoryApi";
import { Category } from "@/types/category";

export default function Categories() {
  const {data: categoriesData, isLoading: isCategoriesLoading} = useGetCategoriesQuery({});

  // const categories = [
  //   {
  //     title: "Residential Services",
  //     description:
  //       "From regular housekeeping to deep cleaning, we ensure your home is always welcoming and pristine.",
  //   },
  //   {
  //     title: "Commercial Services",
  //     description:
  //       "Keep your workplace clean and pristine with our comprehensive commercial cleaning services.",
  //   },
  //   {
  //     title: "Specialize Cleaning",
  //     description:
  //       "We Offer specialized services, including carpet cleaning, window washing, and address specific cleaning needs.",
  //   },
  //   {
  //     title: "Office Cleaning",
  //     description:
  //       "Keep your workplace clean and pristine with our comprehensive commercial cleaning services.",
  //   },
  // ];

  return (
    <section className="bg-[#FBFBFB]">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 pb-8">
          <Image src={clening} alt="Woman Cleaning" />
          <div className="max-w-xl">
            <h2 className="text-xl md:text-2xl lg:text-4xl font-semibold">
              Reliable <span className="text-primary">Cleaning for</span> Every
              Space
            </h2>
            <p className="text-sm md:text-base text-gray-700 mt-4">
              Our services make cleaning easier and more dependable by
              connecting you with experienced professionals who take pride in
              their work and use safe, eco-friendly products to care for your
              space.
            </p>
          </div>
        </div>
        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {categoriesData?.data.slice(0, 4).map((category: Category) => (
            <div key={category.id} className="flex justify-center">
              <CategoryCard
                title={category.category_name}
                icon={category.category_icon_upload}
                description={category.subtitle}
                onClick={() => console.log(`Clicked: ${category.category_name}`)}
              />
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/categories">
            <Button className="px-12">See All</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
