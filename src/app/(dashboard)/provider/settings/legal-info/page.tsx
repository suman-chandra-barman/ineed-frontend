"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LegalInfoData {
  legalName: string;
  businessName: string;
  taxType: string;
  taxId: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}

function LegalInfoPage() {
  const router = useRouter();

  // Mock data - replace with actual data from API/context
  const [legalData] = useState<LegalInfoData>({
    legalName: "Rahman Hossain",
    businessName: "Rahman Hossain",
    taxType: "Individual",
    taxId: "123-45-6789",
    streetAddress: "245 Maple Street",
    city: "Brooklyn",
    state: "United States",
    zipCode: "11215",
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">Legal Info</h1>
        </div>
      </div>

      {/* Legal Info Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        {/* Card Header */}
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <Lock className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            Business & Tax Information
          </h2>
        </div>

        {/* Form Fields Grid */}
        <div className="space-y-6">
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Legal Name */}
            <div>
              <Label
                htmlFor="legalName"
                className="text-gray-700 text-sm font-medium block mb-2"
              >
                Legal Name
              </Label>
              <div className="relative">
                <Input
                  id="legalName"
                  value={legalData.legalName}
                  disabled
                  className="bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed"
                  placeholder="Enter your legal name"
                />
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Business Name */}
            <div>
              <Label
                htmlFor="businessName"
                className="text-gray-700 text-sm font-medium block mb-2"
              >
                Business Name
              </Label>
              <div className="relative">
                <Input
                  id="businessName"
                  value={legalData.businessName}
                  disabled
                  className="bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed"
                  placeholder="Enter your business name"
                />
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tax Type */}
            <div>
              <Label
                htmlFor="taxType"
                className="text-gray-700 text-sm font-medium block mb-2"
              >
                Tax Type
              </Label>
              <div className="relative">
                <Input
                  id="taxType"
                  value={legalData.taxType}
                  disabled
                  className="bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed"
                  placeholder="Select tax type"
                />
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Tax ID */}
            <div>
              <Label
                htmlFor="taxId"
                className="text-gray-700 text-sm font-medium block mb-2"
              >
                Tax ID (SSN / EIN)
              </Label>
              <div className="relative">
                <Input
                  id="taxId"
                  value={legalData.taxId}
                  disabled
                  className="bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed"
                  placeholder="Enter tax ID"
                />
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Street Address */}
            <div>
              <Label
                htmlFor="streetAddress"
                className="text-gray-700 text-sm font-medium block mb-2"
              >
                Street Address
              </Label>
              <div className="relative">
                <Input
                  id="streetAddress"
                  value={legalData.streetAddress}
                  disabled
                  className="bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed"
                  placeholder="Enter street address"
                />
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* City */}
            <div>
              <Label
                htmlFor="city"
                className="text-gray-700 text-sm font-medium block mb-2"
              >
                City
              </Label>
              <div className="relative">
                <Input
                  id="city"
                  value={legalData.city}
                  disabled
                  className="bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed"
                  placeholder="Enter city"
                />
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Fourth Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* State */}
            <div>
              <Label
                htmlFor="state"
                className="text-gray-700 text-sm font-medium block mb-2"
              >
                State
              </Label>
              <div className="relative">
                <Input
                  id="state"
                  value={legalData.state}
                  disabled
                  className="bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed"
                  placeholder="Select state"
                />
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Zip Code */}
            <div>
              <Label
                htmlFor="zipCode"
                className="text-gray-700 text-sm font-medium block mb-2"
              >
                Zip Code
              </Label>
              <div className="relative">
                <Input
                  id="zipCode"
                  value={legalData.zipCode}
                  disabled
                  className="bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed"
                  placeholder="Enter zip code"
                />
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm text-primary">
          <span className="font-semibold">Important:</span> Legal information is
          sensitive and verified. Changes to this information may require
          verification.
        </p>
      </div>
    </div>
  );
}

export default LegalInfoPage;
