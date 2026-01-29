"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Search } from "lucide-react";
import Image from "next/image";
import womenCleaner from "@/assets/women-cleaner.png";

export default function Hero() {
  return (
    <section className="relative lg:h-[90vh] bg-primary/5 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-8 z-10">
            <div className="space-y-4">
              <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold leading-tight">
                Where{" "}
                <span className="text-primary rounded-l-full bg-linear-to-r from-blue-200 to-blue-50">
                  Cleaning feels easier
                </span>{" "}
                and more reliable.
              </h1>
              <p className="text-base sm:text-lg text-gray-600 max-w-xl">
                iNeed connects you with trusted local cleaning service providers
                so you can book with confidence and know you&apos;re in good
                hands from start to finish.
              </p>
            </div>

            {/* Search Box */}
            <div className="rounded-2xl space-y-4">
              <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 sm:gap-3 md:gap-0 border border-primary p-2 rounded-2xl">
                {/* Service Select */}
                <Select>
                  <SelectTrigger className="border-0 bg-white h-14">
                    <SelectValue placeholder="Select your service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">
                      Residential cleaning
                    </SelectItem>
                    <SelectItem value="commercial">
                      Commercial cleaning
                    </SelectItem>
                    <SelectItem value="deep">Deep cleaning</SelectItem>
                    <SelectItem value="move">Move in/out cleaning</SelectItem>
                    <SelectItem value="carpet">Carpet cleaning</SelectItem>
                  </SelectContent>
                </Select>

                {/* Location Input */}
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Enter your locations"
                    className="pl-10 border-0 bg-white h-14"
                  />
                </div>

                {/* Search Button */}
                <Button className="bg-primary h-14 text-base sm:text-lg font-semibold sm:col-span-2 md:col-span-1 w-full">
                  <Search className="mr-2 h-5 w-5" />
                  Search
                </Button>
              </div>

              {/* Popular Searches */}
              <div className="flex items-center gap-2 flex-wrap text-xs sm:text-sm">
                <span className="text-gray-600 font-medium">
                  Popular Searches:
                </span>
                <button className="text-gray-600 hover:text-blue-500 underline underline-offset-2">
                  Residential cleaning
                </button>
                <span className="text-gray-400">•</span>
                <button className="text-gray-600 hover:text-blue-500 underline underline-offset-2">
                  Corporate and commercial cleaning
                </button>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative hidden lg:block">
            <div className="relative -bottom-30 hidden md:block mt-8 md:mt-0">
              {/* Circular Backgrounds - Layered */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {/* Outer lightest circle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px] bg-primary/20 rounded-full" />
                {/* Middle circle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px] bg-primary/40 rounded-full" />
                {/* Inner darker circle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] xl:w-[400px] xl:h-[400px] bg-primary/60 rounded-full" />
              </div>

              {/* Main Image */}
              <div className="relative z-10 flex items-center justify-center h-full">
                <div className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px] lg:w-150 lg:h-150">
                  <Image
                    src={womenCleaner}
                    alt="Professional Cleaning Service"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
