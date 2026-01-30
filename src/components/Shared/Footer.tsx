"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.svg"

export default function Footer() {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
  };

  return (
    <footer className="w-full bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <div className="relative w-25 h-12">
                <Image
                  src={logo}
                  alt="iNeed Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <div className="space-y-2 mb-6">
              <p className="text-gray-700 font-medium">
                Your Needs, Our Service
              </p>
              <p className="text-gray-600 text-sm">
                Where cleaning feels easier and more reliable
              </p>
            </div>

            {/* Newsletter Subscription */}
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white border-gray-300"
                required
              />
              <Button
                type="submit"
                className="bg-[#0077CC] hover:bg-[#005FA3] text-white px-6"
              >
                Join
              </Button>
            </form>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-gray-900 font-semibold text-lg mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-[#0077CC] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-600 hover:text-[#0077CC] transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-gray-600 hover:text-[#0077CC] transition-colors"
                >
                  How it work
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-[#0077CC] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-[#0077CC] transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div>
            <h3 className="text-gray-900 font-semibold text-lg mb-4">
              Legal & Policies
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/customer-policy"
                  className="text-gray-600 hover:text-[#0077CC] transition-colors"
                >
                  Customer Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/provider-policy"
                  className="text-gray-600 hover:text-[#0077CC] transition-colors"
                >
                  Provider Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-[#0077CC] transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h3 className="text-gray-900 font-semibold text-lg mb-4">
              Get in Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-600 mt-1 shrink-0" />
                <span className="text-gray-600">Seattle, WA 98119</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-600 shrink-0" />
                <a
                  href="tel:+919876543254"
                  className="text-gray-600 hover:text-[#0077CC] transition-colors"
                >
                  (91) 98765 4321 54
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-600 shrink-0" />
                <a
                  href="mailto:info@eateryiq.com"
                  className="text-gray-600 hover:text-[#0077CC] transition-colors"
                >
                  info@eateryiq.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section - Social Icons and Copyright */}
        <div className="pt-8 border-t border-gray-300">
          <p className="text-gray-600 text-sm text-center">
            © 2026 iNeed. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
