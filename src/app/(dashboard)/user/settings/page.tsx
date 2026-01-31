"use client";

import { useState } from "react";
import PageHeader from "@/components/Dashboard/PageHeader";
import EditProfileModal from "@/components/Dashboard/EditProfileModal";
import ChangePasswordModal from "@/components/Dashboard/ChangePasswordModal";
import { Button } from "@/components/ui/button";
import { Lock, Pencil } from "lucide-react";
import Image from "next/image";

function AccountSettingsPage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Mock user data - replace with actual data from your auth system
  const [userData, setUserData] = useState({
    fullName: "Suman Barman",
    email: "name@gmail.com",
    contactNumber: "+1 345 824 9384",
    address: "24 New Street, Los Angeles",
    avatar: "", // Add user avatar URL here
  });

  const handleSaveProfile = (data: {
    fullName: string;
    contactNumber: string;
    address: string;
    avatar?: string;
  }) => {
    setUserData({ ...userData, ...data });
    // TODO: Add API call to update user profile
    console.log("Profile updated:", data);
  };

  const handleChangePassword = (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    // TODO: Add API call to change password
    console.log("Password change requested:", data);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8">
      <PageHeader title="Account Settings" />

      {/* Content */}
      <div className="rounded-lg shadow-sm border overflow-hidden">
        {/* Header Section with Avatar */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-md">
                {userData.avatar ? (
                  <Image
                    src={userData.avatar}
                    alt={userData.fullName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center ">
                    <span className="text-2xl font-semibold">
                      {userData.fullName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {userData.fullName}
                </h2>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setIsEditModalOpen(true)}
                variant="default"
                className="gap-2"
              >
                <Pencil className="w-4 h-4" />
                Edit
              </Button>
              <Button
                onClick={() => setIsPasswordModalOpen(true)}
                variant="outline"
               
              >
                Change Password
              </Button>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                {userData.fullName}
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 flex items-center justify-between">
                <span>{userData.email}</span>
                <Lock className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Number
              </label>
              <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                {userData.contactNumber}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                {userData.address}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userData={userData}
        onSave={handleSaveProfile}
      />

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSave={handleChangePassword}
      />
    </div>
  );
}

export default AccountSettingsPage;
