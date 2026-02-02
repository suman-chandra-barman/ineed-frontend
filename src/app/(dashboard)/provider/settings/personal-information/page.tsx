/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import EditProviderPersonalInfoModal from "@/components/Dashboard/EditProviderPersonalInfoModal";

function PersonalInformationPage() {
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Mock data - replace with actual user data from API/context
  const [userData, setUserData] = useState({
    fullName: "Suman Barman",
    email: "namexxx@gmail.com",
    contactNumber: "+01 0125 14254",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    avatar: "/placeholder-avatar.jpg",
    role: "Provider",
  });

  const handleSave = (updatedData: any) => {
    setUserData(updatedData);
    // Here you would typically make an API call to save the data
  };

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-full">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-semibold text-gray-900">
                Personal Information
              </h1>
            </div>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            {/* Profile Header */}
            <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                  <Image
                    src={userData.avatar}
                    alt={userData.fullName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {userData.fullName}
                  </h2>
                  <p className="text-sm text-gray-500">{userData.role}</p>
                </div>
              </div>
              <Button
                onClick={() => setIsEditModalOpen(true)}
              >
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <Label
                  htmlFor="fullName"
                  className="text-primary text-sm font-medium mb-2 block"
                >
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  value={userData.fullName}
                  disabled
                  className="bg-gray-50 border-gray-200 text-gray-900"
                />
              </div>

              {/* Email Address */}
              <div>
                <Label
                  htmlFor="email"
                  className="text-primary text-sm font-medium mb-2 block"
                >
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    value={userData.email}
                    disabled
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-gray-400"
                    >
                      <path
                        d="M12 7V5C12 3.89543 11.1046 3 10 3H6C4.89543 3 4 3.89543 4 5V7M8 10V12M5.5 14H10.5C11.6046 14 12.5 13.1046 12.5 12V9C12.5 7.89543 11.6046 7 10.5 7H5.5C4.39543 7 3.5 7.89543 3.5 9V12C3.5 13.1046 4.39543 14 5.5 14Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Contact Number */}
              <div>
                <Label
                  htmlFor="contactNumber"
                  className="text-primary text-sm font-medium mb-2 block"
                >
                  Contact Number
                </Label>
                <Input
                  id="contactNumber"
                  value={userData.contactNumber}
                  disabled
                  className="bg-gray-50 border-gray-200 text-gray-900"
                />
              </div>

              {/* Street Address */}
              <div>
                <Label
                  htmlFor="streetAddress"
                  className="text-primary text-sm font-medium mb-2 block"
                >
                  Street Address
                </Label>
                <Input
                  id="streetAddress"
                  value={userData.streetAddress}
                  placeholder="Enter street address"
                  disabled
                  className="bg-gray-50 border-gray-200 text-gray-500"
                />
              </div>

              {/* City */}
              <div>
                <Label
                  htmlFor="city"
                  className="text-primary text-sm font-medium mb-2 block"
                >
                  City
                </Label>
                <Input
                  id="city"
                  value={userData.city}
                  placeholder="Enter city"
                  disabled
                  className="bg-gray-50 border-gray-200 text-gray-500"
                />
              </div>

              {/* State */}
              <div>
                <Label
                  htmlFor="state"
                  className="text-primary text-sm font-medium mb-2 block"
                >
                  State
                </Label>
                <Input
                  id="state"
                  value={userData.state}
                  placeholder="Select state..."
                  disabled
                  className="bg-gray-50 border-gray-200 text-gray-500"
                />
              </div>

              {/* Zip Code */}
              <div>
                <Label
                  htmlFor="zipCode"
                  className="text-primary text-sm font-medium mb-2 block"
                >
                  Zip Code
                </Label>
                <Input
                  id="zipCode"
                  value={userData.zipCode}
                  placeholder="Enter ZIP code..."
                  disabled
                  className="bg-gray-50 border-gray-200 text-gray-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <EditProviderPersonalInfoModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userData={userData}
        onSave={handleSave}
      />
    </>
  );
}

export default PersonalInformationPage;
