"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg"

export default function Navbar() {
  return (
    <nav className="w-full bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-40 h-12">
              <Image
                src={logo}
                alt="iNeed Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-[#0077CC] font-medium hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/why-choose-ineed"
              className="text-gray-700 font-medium hover:text-primary transition-colors"
            >
              Why people choose iNeed
            </Link>
            <Link
              href="/services"
              className="text-gray-700 font-medium hover:text-primary transition-colors"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="text-gray-700 font-medium hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 font-medium hover:text-primary transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Right Section - User Icon and Buttons */}
          <div className="flex items-center space-x-4">
            {/* Sign In Button */}
            <Button
              variant="outline"
              className="hidden sm:inline-flex border-gray-300 text-gray-700 hover:bg-gray-50"
              asChild
            >
              <Link href="/signin">Sign In</Link>
            </Button>

            {/* Join Us Button */}
            <Button
              className="hidden sm:inline-flex bg-pri text-white"
              asChild
            >
              <Link href="/signup">Join Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
