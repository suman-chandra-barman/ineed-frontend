"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ProfileDropdown } from "./ProfileDropdown";
import { useAppSelector } from "@/redux/hooks";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useAppSelector((state) => state.auth.user);

  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#why-choose-us", label: "Why people choose iNeed" },
    { href: "/services", label: "Services" },
    { href: "/#about", label: "About" },
    { href: "/#contact", label: "Contact Us" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="w-full bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-25 h-12">
              <Image
                src={logo}
                alt="iNeed Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium hover:text-primary transition-colors ${
                  isActive(link.href) ? "text-primary" : "text-gray-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user && user.role === "provider" && (
              <Link
                href="/onbording"
                className={`font-medium hover:text-primary transition-colors ${
                  isActive("/onbording") ? "text-primary" : "text-gray-700"
                }`}
              >
                Onboarding
              </Link>
            )}
          </div>

          {/* Right Section - Desktop Buttons */}
          <div className="hidden lg:flex items-center space-x-2">
            {!user ? (
              <>
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  asChild
                >
                  <Link href="/signin">Sign In</Link>
                </Button>
                <Button className="bg-primary text-white" asChild>
                  <Link href="/signup">Join Us</Link>
                </Button>
              </>
            ) : (
              <ProfileDropdown user={user} />
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium hover:text-primary transition-colors px-2 py-2 ${
                    isActive(link.href) ? "text-primary" : "text-gray-700"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {user && user.role === "provider" && (
                <Link
                  href="/onbording"
                  className="font-medium hover:text-primary transition-colors"
                >
                  Onboarding
                </Link>
              )}
              <div className="flex flex-col space-y-3 pt-4 border-t">
                {!user ? (
                  <>
                    <Button
                      variant="outline"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                      asChild
                    >
                      <Link href="/signin">Sign In</Link>
                    </Button>
                    <Button className="bg-primary text-white" asChild>
                      <Link href="/signup">Join Us</Link>
                    </Button>
                  </>
                ) : (
                  <ProfileDropdown user={user} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
